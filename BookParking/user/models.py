from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.


class User(AbstractUser):
    
    mobile = models.CharField("Mobile Number", max_length=12, null=True, blank=True)
    
    class Meta:
        app_label = 'user'
        verbose_name = 'User'
        verbose_name_plural = 'Users'
