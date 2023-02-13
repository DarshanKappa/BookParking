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



    
    