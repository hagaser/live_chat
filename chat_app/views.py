from django.shortcuts import render, redirect
from .models import Room, Message
from django.http import HttpResponse, JsonResponse
import json


# Create your views here.


def index(request):
    if request.method == 'POST':

        roomname = request.POST['roomname']
        username = request.POST['username']

        if Room.objects.filter(name=roomname).exists():  # if current room already exists
            pass

        else:
            new_room = Room.objects.create(name=roomname)  # if not then create
            new_room.save()

        return redirect('/'+roomname+'/?user_name='+username)  # go to this room

    else:
        return render(request, 'index.html')


def room(request, room):

    username = request.GET.get('user_name')
    room_details = Room.objects.get(name=room)  # get current room object
    data = {
        'username': username,
        'room': room,
        'room_details': room_details,
    }

    return render(request, 'room.html', data)


def send(request):

    data = json.loads(request.body)

    message = data.get('message')
    username = data.get('username')
    room_id = data.get('room_id')

    new_message = Message.objects.create(value=message,
                                         userName=username,
                                         roomName=room_id)
    new_message.save()


def getMessages(request, room):

    room_details = Room.objects.get(name=room)  # get current room object
    messages = Message.objects.filter(roomName=room_details.id)  # get messages with current room object

    return JsonResponse({"messages": list(messages.values())})  # return messages in json
