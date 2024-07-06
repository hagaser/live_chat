from django.db import models
from datetime import datetime

# Create your models here.


class Room(models.Model):
    name = models.CharField(max_length=1000)


class Message(models.Model):
    roomName = models.CharField(max_length=1000)
    userName = models.CharField(max_length=1000)
    date = models.DateTimeField(default=datetime.now, blank=True)
    value = models.CharField(max_length=10000)
