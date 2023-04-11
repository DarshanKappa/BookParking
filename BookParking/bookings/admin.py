from django.contrib import admin
from bookings.models import UsersBookings, ParkingSlots, AppConfigurations
from lib.utils import change_datetime_in_timezone

# Register your models here.



class UsersBookingsAdmin(admin.ModelAdmin):
    fields = ("created", "user", "status", "vehicle_no", "slot", "slot_opening", "slot_expiry")
    list_display = ("user", "status", "slot_no", "opening", "expiry")
    list_filter = ("slot_opening", "slot_expiry", "status")
    readonly_fields = ("created", )
    
    def slot_no(self, obj):
        return obj.slot.slot_no
    
    def opening(self, obj):
        return change_datetime_in_timezone(obj.slot_opening, "Asia/Kolkata").strftime("%d-%m-%Y %-I:%M %p")
    
    def expiry(self, obj):
        return change_datetime_in_timezone(obj.slot_expiry, "Asia/Kolkata").strftime("%d-%m-%Y %-I:%M %p")

admin.site.register(UsersBookings, UsersBookingsAdmin)
admin.site.register(ParkingSlots)
admin.site.register(AppConfigurations)
