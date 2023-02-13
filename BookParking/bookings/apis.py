from rest_framework.viewsets import ViewSet, ModelViewSet
from bookings.models import ParkingSlots, UsersBookings, AppConfigurations
from bookings.serializers import ParkingSlotSerializer, UserBookingSerializer
from bookings.paginations import BasePagination
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework.response import Response
from rest_framework import status
from bookings.tasks import test_task, update_parking_slots


class ParkingSlotViewSet(ModelViewSet):
    serializer_class = ParkingSlotSerializer
    pagination_class = BasePagination
    queryset = ParkingSlots.objects.all()


class UserBookingViewSet(ModelViewSet):
    # permission_classes = (IsAuthenticated, )
    authentication_classes = (TokenAuthentication, )
    serializer_class = UserBookingSerializer
    pagination_class = BasePagination

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if not serializer.is_valid():
            return Response({"error": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        self.perform_create(serializer)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

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
