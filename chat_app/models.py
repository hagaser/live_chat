from django.db import models
from datetime import datetime, timezone, timedelta

# Create your models here.


class Room(models.Model):
    name = models.CharField(max_length=1000)
    id = models.AutoField(primary_key=True)


class Message(models.Model):
    def get_time():
        return datetime.now(timezone(timedelta(hours=3)))
    room_name = models.CharField(max_length=1000)
    user_name = models.CharField(max_length=1000)
    date = models.DateTimeField(default=get_time, blank=True)
    value = models.CharField(max_length=10000)
    id = models.AutoField(primary_key=True)