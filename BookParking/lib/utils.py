import json
from pydantic import ValidationError
from rest_framework.authtoken.models import Token
from pytz import timezone
from django.utils.timezone import make_aware
from django.db import connection, reset_queries


RATE = {
    1: 30,
    3: 50,
    7: 100,
    13: 150
}


def make_aware_timezone(datetime_obj, zoneinfo="UTC"):
    return make_aware(datetime_obj, timezone=timezone(zoneinfo))

def change_datetime_in_timezone(datetime_obj, zoneinfo="UTC"):
    return datetime_obj.astimezone(tz=timezone(zoneinfo))

def pydantic_validation(Model, data):
    try:
        data = Model.parse_obj(data)
        return True, dict(data)
    except ValidationError as e:
        list = json.loads(e.json())
        for error in list:
            for loc in (error.get('loc')):
                return False, {'request_body': data, str(loc) : str(error.get('msg'))}

def generate_token(user):
    token, flag = Token.objects.get_or_create(user=user)
    return token.key


def caclulate_parking_rate(booking_objs):
    
    booking_objs = booking_objs if type(booking_objs)==list else [ booking_objs ]
    
    amount = 0
    for i in booking_objs:
        _amount = 0
        time_diff = i.slot_expiry - i.slot_opening
        time = 24 if time_diff.days==1 else time_diff.seconds/3600
        for t, r in RATE.items():
            if time >= t:
                _amount = r
        amount += _amount
        
    return amount