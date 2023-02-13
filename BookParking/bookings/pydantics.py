from pydantic import BaseModel, validator, conint, constr
from user.models import User
from django.core.validators import validate_email
from django.core.exceptions import ValidationError
from bookings.models import AppConfigurations, ParkingSlots, UsersBookings
from django.db.models import Q
from datetime import datetime, timedelta
from lib.utils import make_aware_timezone


class CreateUserBooking(BaseModel):
    slot_no: int
    slot_time: str
    slot_duration: conint(gt=0)
    vehicle_no: str

    @validator("slot_no", pre=False)
    def check_slot_no(cls, v):
        slot_limit = AppConfigurations.objects.filter().first().number_of_slots
        if v > slot_limit:
            raise ValueError(f"only {slot_limit} slots are available")
        v, flag = ParkingSlots.objects.get_or_create(slot_no=v)
        if not (flag or v.isAvailable):     
            raise ValueError(f"slot number '{v}' is not available")
        return v

    @validator("slot_time", pre=False)
    def check_slot_time(cls, v):
        conf_timezone = AppConfigurations.objects.filter().first().timezone
        try:
            v = datetime.strptime(v, "%Y-%m-%dT%H:%M")
        except ValueError:
            raise ValueError(f"wrong datetime pattern (ex. YYYY-MM-DDTHH:MM - 2020-01-14T17:30)")
        return make_aware_timezone(v, conf_timezone)
    
    @validator("slot_duration", pre=False)
    def check_duration_slot(cls, v, values):
        if v > 24:
            raise ValueError("can not book for more than 24 hours")

        slot_no = values.get("slot_no")
        slot_open = values.get("slot_time")
        expiry = slot_open + timedelta(hours=v)
        
        slot = UsersBookings.objects.filter(slot=slot_no, status__in=[UsersBookings.Status.USING, UsersBookings.Status.BOOKED]) \
                                    .filter(Q(slot_expiry__gt=slot_open) & Q(slot_opening__lt=expiry))
        if slot:
            raise ValueError("this entire slot is not Fee")
        return expiry

    @validator("vehicle_no", pre=False)
    def check_vehicle_no(cls, v):
        if not v:
            raise ValueError("vehicle_no field should not empty")
        return v
    
    class Config:
        extra = 'forbid'