from django.db import models
from bookings.models import UsersBookings

# Create your models here.


class PaymentModel(models.Model):
    
    class Status(models.TextChoices):
        SUCCESS = "SUCCESS",
        FAILED = "FAILED",
        PENDING = "PENDING",
    
    created = models.DateTimeField("Request At", auto_now=False, auto_now_add=True)
    updated = models.DateTimeField("Updated At", auto_now=True)
    booking = models.ManyToManyField(UsersBookings, related_name="payments")
    request_id = models.CharField("Payment Request ID", max_length=100, null=True, blank=True)
    transaction_id = models.CharField("Transaction ID", max_length=100, null=True, blank=True)
    payment_url = models.URLField("Long URL", null=True, blank=True, max_length=500)
    status = models.CharField("Payment Status", choices=Status.choices, max_length=50)
    
    class Meta:
        verbose_name = "Payment"
        verbose_name_plural = "Payments"