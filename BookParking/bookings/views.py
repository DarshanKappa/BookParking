from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
import datetime
import pytz
from bookings.models import ParkingSlots
from rest_framework import serializers


# Create your views here.

class Serializer(serializers.ModelSerializer):

    class Meta:
        model = ParkingSlots
        fields = "__all__"


class Test(APIView):
    
    def get(self, request, *args, **kwargs):
        print(datetime.datetime.now())      
        timezone = pytz.timezone("Asia/Kolkata")  
        
        
        
        s = ParkingSlots.objects.all()
        print(s[0].status)
        s = Serializer(s[0])

        return Response(data={"Time": str(datetime.datetime.now(tz=timezone)), 'data': s.data})        


from django.views import View
import requests
import json
from instamojo_wrapper import Instamojo

API_KEY = "test_7c4a54c77288baf2681c7470ff7"
AUTH_TOKEN = "test_baa930eefb8ac9e457fb9cb386e"

api = Instamojo(api_key=API_KEY, 
                auth_token=AUTH_TOKEN, 
                endpoint='https://test.instamojo.com/api/1.1/'
    );




class PaymentView(View):
    
    def get(self, request, *args, **kwargs):

        # Create a new Payment Request
        response = api.payment_request_create(
            amount='3499',
            purpose='FIFA 16',
            send_email=False,
            email="foo@example.com",
            redirect_url="http://localhost:8001/redirect"
            )
        
        print(response)

        return render(request, "payments.html", context=response)



# https://www.google.com/?payment_id=MOJO3220905A76570107&payment_status=Credit&payment_request_id=04e433417973485f9d215404f685d82d