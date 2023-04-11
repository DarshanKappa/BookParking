import json
from pydantic import ValidationError
from rest_framework.authtoken.models import Token
from rest_framework_simplejwt.tokens import RefreshToken
from django.conf import settings

def pydantic_validation(Model, data):
    try:
        Model.parse_obj(data)
        return True, ''
    except ValidationError as e:
        list = json.loads(e.json())
        for error in list:
            for loc in (error.get('loc')):
                return False, {str(loc) : str(error.get('msg'))}

def generate_token(user):
    token = RefreshToken.for_user(user)
    token = str(token.access_token)
    res = {
        "access_token": token,
        "token_type": "Bearer",
        "access_token_lifetime": settings.SIMPLE_JWT.get("ACCESS_TOKEN_LIFETIME")
    }
    return res
