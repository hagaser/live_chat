from django.urls import re_path
from . import consumers

# url path for websocket
websocket_urlpatterns = [
    re_path(r'ws/chat/(?P<room_name>\w+)/(?P<user_name>\w+)/$', consumers.ChatConsumer.as_asgi()),
]
