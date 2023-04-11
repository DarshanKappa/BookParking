import datetime
from lib.utils import make_aware_timezone
from rest_framework import serializers
from bookings.models import ParkingSlots, UsersBookings, AppConfigurations
from lib.utils import generate_token, pydantic_validation
from .pydantics import CreateUserBooking
from collections import OrderedDict
from pytz import timezone



class ParkingSlotSerializer(serializers.ModelSerializer):
    class Meta:
        model = ParkingSlots
        fields = "__all__"


class UserBookingSerializer(serializers.ModelSerializer):
    
    created = serializers.SerializerMethodField()
    slot_opening = serializers.SerializerMethodField()
    slot_expiry = serializers.SerializerMethodField()
    slot = serializers.SerializerMethodField()

    class Meta:
        model = UsersBookings
        fields = (
            "id",
            "created",
            "slot",
            "slot_opening",
            "slot_expiry", 
            "vehicle_no",
            "status",
        )
        
    def get_created(self, obj):
        conf_timezone = self.context.get("configurations").get("timezone")
        return obj.created.astimezone(timezone(conf_timezone)).strftime("%Y-%m-%dT%H:%M")
    
    def get_slot_opening(self, obj):
        conf_timezone = self.context.get("configurations").get("timezone")
        return obj.slot_opening.astimezone(timezone(conf_timezone)).strftime("%Y-%m-%dT%H:%M")
    
    def get_slot_expiry(self, obj):
        conf_timezone = self.context.get("configurations").get("timezone")
        return obj.slot_expiry.astimezone(timezone(conf_timezone)).strftime("%Y-%m-%dT%H:%M")
    
    def get_slot(self, obj):
        return obj.slot.slot_no

    def to_internal_value(self, data):        

        is_valid, data = pydantic_validation(CreateUserBooking, data)
        if not is_valid:
            raise serializers.ValidationError(data)

        _data = dict()
        slot_obj = data.pop("slot_no")
        _data |= {"slot": slot_obj}

        slot_time = data.pop("slot_time")
        _data |= {"slot_opening": slot_time}

        duration = data.pop("slot_duration")
        _data |= {"slot_expiry": duration}

        user = self.context.get("request").user
        _data |= {"user": user}

        _data |= {"status": UsersBookings.Status.PENDING}
    
        _data |= {"vehicle_no": data.pop("vehicle_no")}
        
        return _data
    
    def to_representation(self, instance):
        instances = super().to_representation(instance)
        _instances = OrderedDict()
        for key, value in instances.items():
            if value is None:
                _instances[key] = ""
            else:
                _instances[key] = value
        return _instances


    def validate(self, attrs):
        return attrs
    
    # def save(self, **kwargs):
    #     data = self.validated_data
        
    #     if(type(data)==list):
    #         self.instance = self.bulk_create(data)
    #         return self.instance
    #     else:
    #         self.instance = self.create(data)
    #         return self.instance
    
    # def bulk_create(self, validated_data):
    #     bulk_data = []
    #     for i in validated_data:
    #         bulk_data.append(UsersBookings(**i))
    #     UsersBookings.objects.bulk_create
    #     objs = UsersBookings.objects.create(bulk_data)
    #     for i in objs:
    #         print('-========================')
    #         print(i, i.id)
    #     return objs
    
    
class SlotBoardSerializer(serializers.Serializer):
    
    
    
    class Meta:
        fields = (
            "slot_no",
            "date",
            "time_slots",
        )





