from datetime import datetime
from BookParking.celery import app
from bookings.models import ParkingSlots, UsersBookings
from django.db import connection, connections, reset_queries, transaction


@app.task(bind=True)
def test_task(self, *args, **kwargs):
    # print(self.__all__)
    print(self.__dict__)
    print(self.request)
    print(args, kwargs)
    print(datetime.now())
    if not args:
        x = 0
    else:
        x = args[0]
    x += 2
    
    return {"value": x}

@app.task(bind=True)
def update_parking_slots(self, *args, **kwargs):
    now = datetime.now()
    update_query_list = [ ]
    update_slots = [ ]

    expired_users_bookings = UsersBookings.objects.filter(status__in=[UsersBookings.Status.BOOKED, UsersBookings.Status.USING],
                                                        slot_expiry__lte=now)

    this_time_bookings = UsersBookings.objects.filter(status=UsersBookings.Status.BOOKED,
                                                    slot_expiry__gt=now,
                                                    slot_opening__lte=now)

    for expired in expired_users_bookings:
        expired.status = UsersBookings.Status.EXPIRED
        update_slots.append(expired.slot_id)
        update_query_list.append(expired)
    
    for getting_slot in this_time_bookings:
        getting_slot.status = UsersBookings.Status.USING
        update_query_list.append(getting_slot)

    ParkingSlots.objects.filter(id__in=set(update_slots)).update(status=ParkingSlots.Status.FREE)
    UsersBookings.objects.bulk_update(update_query_list, ["status", "slot"])
