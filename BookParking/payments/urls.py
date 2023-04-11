from django.urls import path
from payments.apis import PaymentViewSet
from rest_framework.routers import DefaultRouter


router = DefaultRouter()
router.register(r"", PaymentViewSet, basename="payments")



urlpatterns = [
    # path("checkout", PaymentRequest.as_view(), name="checkout-page"),
    # path("request", PaymentRequest.as_view(), name="payment_request"),
    
    # path("redirect-response", RedirectsResponse.as_view(), name="redirect-response")
] + router.urls
