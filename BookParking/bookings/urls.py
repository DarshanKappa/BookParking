from rest_framework.routers import DefaultRouter
from bookings.apis import ParkingSlotViewSet, UserBookingViewSet


router = DefaultRouter()
router.register(r"parking-slots", ParkingSlotViewSet, basename="slots")
router.register(r"slot-booking", UserBookingViewSet, basename="bookings")

urlpatterns = [ ] + router.urls
