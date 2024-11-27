import json
import base64
from datetime import datetime, timezone, timedelta

import django
django.setup()
from asgiref.sync import sync_to_async

from chat_app.models import Room, Message
from channels.generic.websocket import AsyncWebsocketConsumer


class ChatConsumer(AsyncWebsocketConsumer):


    async def connect(self):
        # take room name from url
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.user_name = self.scope['url_route']['kwargs']['user_name']
        # do ru chars in room name possible
        encoded_room = base64.urlsafe_b64encode(self.room_name.encode()).decode().rstrip("=")
        self.room_group_name = f'chat_{encoded_room}'

        # add new user to room (add new channel)
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )
        await self.accept() # connect success


    async def disconnect(self, close_code):
        # disconnect user (disconect channel)
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )


    async def receive(self, text_data):
        # get data
        json_data = json.loads(text_data)

        # get type or none
        message_type = json_data.get('type', None)

        # if join chat (loads all old messages)
        if message_type == "init":

            # formats the js time zone format
            self.timezone = int(round(json_data['timezone']/-60, 0))

            self.number_old_messages = 0
            await self.send_old_messages()

        elif message_type == "load_old":
            await self.send_old_messages()

        else:

            # the message that will be sent to everyone
            event = {
              'type': 'send_message',
              'message': json_data['message'],
              'userName': self.user_name
            }

            await self.save_message(event)
            
            # send everyone
            await self.channel_layer.group_send(
                self.room_group_name,
                event
            )

    # send to everyone
    async def send_message(self, event):

        await self.send(text_data=json.dumps({
            'message': event['message'],
            'userName': event['userName'],
            'date': datetime.now(timezone(timedelta(hours=self.timezone))).isoformat(),
            'new': True
        }))

    # save in DB
    async def save_message(self, event):

        await sync_to_async(Message.objects.create)(
            value=event['message'],
            user_name=self.user_name,
            room_name=self.room_name
        )

    # send 10 old messages
    async def send_old_messages(self):

        to = self.number_old_messages + 10

        # get list of 10 old messages by room name sorted by date
        messages = await sync_to_async(list)(
            Message.objects.filter(room_name=self.room_name).order_by('-date'
        )[self.number_old_messages:to])

        # formatting 10 old messages to send
        data = [
          {
            'message': message.value,
            'userName': message.user_name,
            'date': message.date.astimezone(timezone(timedelta(hours=self.timezone))).isoformat()
          }
          for message in messages
        ]

        # send list of old messages
        await self.send(text_data=json.dumps(data))

        self.number_old_messages = to