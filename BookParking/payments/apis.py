from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from payments.views import Payment
from payments.models import PaymentModel
from rest_framework.decorators import action
from bookings.models import UsersBookings
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated


class PaymentViewSet(ModelViewSet):
    
    authentication_classes = (JWTAuthentication, )
    permission_classes = (IsAuthenticated, )
    
    lookup_field = 'request_id'

    
    @action(methods=['post'], detail=True)
    def status(self, request, request_id=None, *args, **kwargs):
        data = request.data
        payment_id = data.get("payment_id")

        payment_obj = PaymentModel.objects.filter(request_id=request_id).first()
        print(payment_obj, payment_id, request_id)
        if payment_obj:
            payment_obj.transaction_id = payment_id

            # call the API to get payment detail
            flag, data = Payment.get_detail(payment_id)
            if flag:
                status = PaymentModel.Status.SUCCESS if data.get("status") else PaymentModel.Status.FAILED
                payment_obj.status = status
                
                bookings = payment_obj.booking.all()
                book_str = []
                for booking in bookings:
                    booking.status = UsersBookings.Status.BOOKED if status==PaymentModel.Status.SUCCESS else UsersBookings.Status.FAILED
                    book_str.append(booking.id)
                booking.save()
                
                payment_obj.save()
                
                res_data = {
                    "status": payment_obj.status,
                    "created at": data.get("created_at"),
                    "slot date": data.get("slot_date"),
                    "booking id": str(book_str)[1:-2],
                    "slot timing": data.get("slot_timing"),
                    "amount": data.get("amount"),
                    "currency": data.get("currency"),
                    "total taxes": data.get("total_taxes"),
                    "fees": data.get("fees"),
                    "billing instrument": data.get("billing_instrument"),
                    "instrument type": data.get("instrument_type"),
                    "name": data.get("name"),
                    "email": data.get("email"),
                    "phone": data.get("phone"),
                    "transaction id": data.get("id"),
                    "payment type": data.get("payment_type"),
                    "failure": data.get("failure"),
                }
                
                return Response(res_data)
                
            else:
                payment_obj.save()
                return Response(data={"error": "something went wrong"})
        else:
            return Response(data={"error": "payment not found"})

        