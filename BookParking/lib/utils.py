import json
from pydantic import ValidationError
from rest_framework.authtoken.models import Token
from pytz import timezone
from django.utils.timezone import make_aware
from django.db import connection, reset_queries





def make_aware_timezone(datetime_obj, zoneinfo="UTC"):
    return make_aware(datetime_obj, timezone=timezone(zoneinfo))

def pydantic_validation(Model, data):
    try:
        data = Model.parse_obj(data)
        return True, dict(data)
    except ValidationError as e:
        list = json.loads(e.json())
        for error in list:
            for loc in (error.get('loc')):
                return False, {str(loc) : str(error.get('msg'))}

def generate_token(user):
    token, flag = Token.objects.get_or_create(user=user)
    return token.key
