from django.contrib import admin
from payments.models import PaymentModel

# Register your models here.




class PaymentAdmin(admin.ModelAdmin):
    
    list_display = ("id", "status", )
    readonly_fields = ("created", "updated", )

admin.site.register(PaymentModel, PaymentAdmin)
