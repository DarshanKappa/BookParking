from django.contrib import admin
from bookings.models import UsersBookings, ParkingSlots, AppConfigurations

# Register your models here.



class UsersBookingsAdmin(admin.ModelAdmin):
    fields = ("created", "user", "status", "vehicle_no", "slot", "slot_opening", "slot_expiry")
    readonly_fields = ("created", )

admin.site.register(UsersBookings, UsersBookingsAdmin)
admin.site.register(ParkingSlots)
admin.site.register(AppConfigurations)
