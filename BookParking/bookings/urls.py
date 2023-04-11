from rest_framework.routers import DefaultRouter
from django.urls import path
from bookings.apis import ParkingSlotViewSet, UserBookingViewSet, SlotBoardViewSet


router = DefaultRouter()
router.register(r"parking-slots", ParkingSlotViewSet, basename="slots")
router.register(r"slot-booking", UserBookingViewSet, basename="bookings")
# router.register(r"slot-board", SlotBoardViewSet, basename="slot-board")

urlpatterns = [
       path("slot-board", SlotBoardViewSet.as_view(), name="slot-board")
    ] + router.urls
