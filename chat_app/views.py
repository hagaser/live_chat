import json

from django.shortcuts import render, redirect, get_object_or_404
from django.http import HttpResponse, JsonResponse

from .models import Room, Message


# Create your views here.


def index(request):
    # if get request enter to the room
    if request.method == 'POST':

        room_name = request.POST['room-name']
        user_name = request.POST['user-name']

        # if current room already exists then pass
        if Room.objects.filter(name=room_name).exists():
            pass

        else: # if not then create
            new_room = Room.objects.create(name=room_name)
            new_room.save()

        # save name for the session
        request.session['user_name'] = user_name
        # go to this room
        return redirect('/'+room_name+'/')

    else: # if we don't try to connect to the room
        return render(request, 'index.html')


def room(request, room):

    # get user name
    user_name = request.session.get('user_name')

    data = {
        'user_name': user_name,
        'room_name': room,
    } 

    return render(request, 'room.html', data)
