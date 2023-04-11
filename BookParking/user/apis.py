from rest_framework.response import Response
from rest_framework.views import APIView
from .pydantics import CredentialValidation, RegistrationValidation
from .utils import generate_token, pydantic_validation
from user.models import User
from django.contrib import auth
from django.db.models import Q


class RegistrationAPIView(APIView):
    """
        Registration of new User and return a token
    """

    def post(self, request, *args, **kwargs):
        data = request.data

        is_valid, msg = pydantic_validation(RegistrationValidation, data)
        if not is_valid:
            return Response(msg, status=400)

        password = data.pop('password')
        user = User(**data)
        user.set_password(password)
        user.save()
        
        token = generate_token(user)
        return Response(token, status=201)

class SinginAPIView(APIView):
    """
    Signin and return a token
    """

    def post(self, request, *args, **kwargs):
        data = request.data
        print(data)
        is_valid, msg = pydantic_validation(CredentialValidation, data)
        if not is_valid:
            return Response(msg, status=400)

        user = User.objects.filter(Q(email=data.get("email")) | Q(username=data.get("username"))).first()
        if not user:
            if data.get("email") is not None:
                return Response("Wrong email or password", 401)
            else:
                return Response("Wrong username or password", 401)
                
                
        if not user.check_password(data.get("password")):
            if data.get("email") is not None:
                return Response("Wrong email or password", 401)
            else:
                return Response("Wrong username or password", 401)

        token = generate_token(user)
        return Response(token)
