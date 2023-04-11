from rest_framework.viewsets import ViewSet, ModelViewSet
from bookings.models import ParkingSlots, UsersBookings, AppConfigurations
from bookings.serializers import ParkingSlotSerializer, UserBookingSerializer
from bookings.paginations import BasePagination, SlotBoardPagination
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from bookings.tasks import test_task, update_parking_slots
from rest_framework.views import APIView
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.db.models import Q
from datetime import datetime, timedelta
from lib.utils import make_aware_timezone, change_datetime_in_timezone, caclulate_parking_rate
from rest_framework.generics import ListAPIView
from django.db import reset_queries, connection
from payments.views import Payment
from payments.models import PaymentModel





class ParkingSlotViewSet(ModelViewSet):
    
    authentication_classes = (JWTAuthentication, )
    permission_classes = ( IsAuthenticated, )
    serializer_class = ParkingSlotSerializer
    pagination_class = BasePagination
    queryset = ParkingSlots.objects.all()


class UserBookingViewSet(ModelViewSet):

    authentication_classes = (JWTAuthentication, )
    permission_classes = (IsAuthenticated, )
    serializer_class = UserBookingSerializer
    pagination_class = BasePagination

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data, many=True)
        if not serializer.is_valid():
            return Response({"error": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        obj = serializer.save()

        url = self.create_payment_request(obj)
        return Response(data={"url": url}, status=status.HTTP_201_CREATED)

    def get_queryset(self):
        user = self.request.user
        queryset = UsersBookings.objects.filter(user=user.id)
        return queryset
    
    def get_serializer_context(self):
        conf = AppConfigurations.objects.filter().first()

        return {
            'request': self.request,
            'configurations': {
                "number_of_slots": conf.number_of_slots,
                "timezone": conf.timezone
            }
        }

    def create_payment_request(self, objs):

        objs = objs if type(objs)==list else [ objs ]

        amount = caclulate_parking_rate(objs)

        data = {
            "user_name": f"{objs[0].user.first_name} {objs[0].user.last_name}",
            "amount": amount,
            "email": objs[0].user.email,
            "phone": objs[0].user.mobile,
            "redirect_url": f"http://localhost:3000/payment/response"
        }

        flag, res = Payment.request(data)

        if flag:

            payment = PaymentModel.objects.create(
                        request_id = res.get("id"),
                        payment_url = res.get("longurl"),
                        status = PaymentModel.Status.PENDING
                    )
            payment.save()

            payment.booking.set(objs)
            payment.save()

            return payment.payment_url

        return res
        


class SlotBoardViewSet(ListAPIView):

    authentication_classes = (JWTAuthentication, )
    permission_classes = (IsAuthenticated, )
    pagination_class = SlotBoardPagination
    
    def list(self, request, *args, **kwargs):
        res = self.get_board_slot_response()
        return res

    def get_board_slot_response(self):
        conf = AppConfigurations.objects.filter().first()

        # date = "2023-03-04"
        date = self.request.query_params.get("date")
        if not date: 
            date = change_datetime_in_timezone(datetime.now(), conf.timezone).strftime("%Y-%m-%d")

        date = date.split('-')
        opening = datetime(int(date[0]), int(date[1]), int(date[2]))
        opening = make_aware_timezone(opening, conf.timezone)

        closing = opening + timedelta(days=1)
        
        today_date = int(date[2])
        pre_date = (opening - timedelta(days=1)).day
        next_date = closing.day


        bookings_in_slots = list(ParkingSlots.objects.filter(Q(isAvailable=True) & Q(users_bookings__slot_expiry__gt=opening) & Q(users_bookings__slot_opening__lt=closing)).values("users_bookings", "slot_no"))
        total_no_of_slots = list(ParkingSlots.objects.filter(Q(isAvailable=True)).values_list("slot_no", flat=True))
        
        # print("bookings_in_slots : ", bookings_in_slots)
        # print("total_no_of_slots : ", total_no_of_slots)
        
        sd = {}
        # Map slot_no with number of booked slots ex. {1: 9}
        for i in bookings_in_slots:
            sn = i.get("slot_no")
            if sd.get(sn):
                c = sd.get(sn)
                sd[sn] = c + 1
            else:
                sd |= {sn: 1}
        # print("sd : ", sd)
        
        # In empty slots, map slot_no with 0 ex. {1: 9, 2: 0}
        for i in total_no_of_slots:
            if not sd.get(i):
                sd[i] = 0
        # print("sd : ", sd)


        sl = []
        # Convert in List
        for key, value in sd.items():
            sl.append({"slot_no": key, "value": value})
        # print("sl : ", sl)
        
        # Sort List according number of bookings
        sl = sorted(sl, key=lambda x: x["value"])
        # print("sl : ", sl)

        # Return paginated queryset
        paginated_queryset = self.paginate_queryset(sl)
        
        slot_dict = {}
        
        for i in paginated_queryset:
            slot_dict[str(i)] = []
            
        l = {str(i):[{"time_slot": s, "free": True} for s in range(1, 25)] for i in paginated_queryset}
        
        queryset = UsersBookings.objects.filter(Q(slot_expiry__gt=opening) & Q(slot_opening__lt=closing) \
                                        & Q(slot__slot_no__in=paginated_queryset)).values("slot__slot_no", "slot_opening", "slot_expiry")
        
        
        for i in queryset:
            o = change_datetime_in_timezone(i.get("slot_opening"), conf.timezone)
            c = change_datetime_in_timezone(i.get("slot_expiry"), conf.timezone)

            if o.day==pre_date:
                if slot_dict.get(str(i.get("slot__slot_no"))):
                    slot_dict[str(i.get("slot__slot_no"))].append((0, 24 if c.hour==0 else c.hour))
                else:                    
                    slot_dict[str(i.get("slot__slot_no"))] = [(0, 24 if c.hour==0 else c.hour)]
            elif c.day==next_date:
                if slot_dict.get(str(i.get("slot__slot_no"))):
                    slot_dict[str(i.get("slot__slot_no"))].append((o.hour, 24))
                else:                    
                    slot_dict[str(i.get("slot__slot_no"))] = [(o.hour, 24)]
            else:
                if slot_dict.get(str(i.get("slot__slot_no"))):
                    slot_dict[str(i.get("slot__slot_no"))].append((o.hour, 24 if c.hour==0 else c.hour))
                else:                    
                    slot_dict[str(i.get("slot__slot_no"))] = [(o.hour, 24 if c.hour==0 else c.hour)]

        
        for slot, bookings in slot_dict.items():
            for book in bookings:
                for i in range(book[0], book[1]):
                    l[slot][i]["free"] = False
        
        res = []
        for k, v in l.items():
            res.append({'id': k, 'slots': v})

        paginated_res = self.get_paginated_response(res)
        
        return paginated_res
        
        





class SlotBoardViewSet1(ViewSet):

    # authentication_classes = (JWTAuthentication, )
    # permission_classes = ( IsAuthenticated, )
    serializer_class = ParkingSlotSerializer
    pagination_class = BasePagination
    # queryset = ParkingSlots.objects.all()

    def list(self, request, *args, **kwargs):
        conf = AppConfigurations.objects.filter().first()
        date = "2023-03-04"

        date = date.split('-')
        opening = datetime(int(date[0]), int(date[1]), int(date[2]))
        opening = make_aware_timezone(opening, conf.timezone)

        closing = opening + timedelta(days=1)
        
        today_date = int(date[2])
        pre_date = (opening - timedelta(days=1)).day
        next_date = closing.day
        
        l = {str(i):[{"time_slot": s, "free": True} for s in range(1, 25)] for i in range(1, 9)}
            
        slot_dict = {}

        q = list(UsersBookings.objects.filter(Q(slot_expiry__gt=opening) & Q(slot_opening__lt=closing) \
                                        & Q(slot__slot_no__gte=1) & Q(slot__slot_no__lte=8)).values("slot__slot_no", "slot_opening", "slot_expiry"))
        for i in q:
            o = change_datetime_in_timezone(i.get("slot_opening"), conf.timezone)
            c = change_datetime_in_timezone(i.get("slot_expiry"), conf.timezone)

            if o.day==pre_date:
                if slot_dict.get(str(i.get("slot__slot_no"))):
                    slot_dict[str(i.get("slot__slot_no"))].append((1, 24 if c.hour==0 else c.hour))
                else:                    
                    slot_dict[str(i.get("slot__slot_no"))] = [(1, 24 if c.hour==0 else c.hour)]
            elif c.day==next_date:
                if slot_dict.get(str(i.get("slot__slot_no"))):
                    slot_dict[str(i.get("slot__slot_no"))].append((o.hour, 24))
                else:                    
                    slot_dict[str(i.get("slot__slot_no"))] = [(o.hour, 24)]
            else:
                if slot_dict.get(str(i.get("slot__slot_no"))):
                    slot_dict[str(i.get("slot__slot_no"))].append((o.hour, 24 if c.hour==0 else c.hour))
                else:                    
                    slot_dict[str(i.get("slot__slot_no"))] = [(o.hour, 24 if c.hour==0 else c.hour)]

        
        for slot, bookings in slot_dict.items():
            for book in bookings:
                for i in range(book[0], book[1]):
                    l[slot][i]["free"] = False

        
        res = []
        for k, v in l.items():
            res.append({'id': k, 'slots': v})

        return Response(data=res)



class PaymentTest(APIView):
    
    def post(self, request, *args, **kwargs):
        
        return Response("done")
    
    
    
    