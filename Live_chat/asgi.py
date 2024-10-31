"""
ASGI config for Live_chat project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.2/howto/deployment/asgi/
"""

import os

from django.core.asgi import get_asgi_application
from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
from whitenoise import WhiteNoise

from .settings import BASE_DIR
import chat_app.routing

# set settings
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'Live_chat.settings')

# create asgi app
application = get_asgi_application()
# add static to app
application = WhiteNoise(application, root=os.path.join(BASE_DIR, 'staticfiles'))

# create routers
application = ProtocolTypeRouter({
    'http': get_asgi_application(),
    'websocket': AuthMiddlewareStack(
        URLRouter(
            chat_app.routing.websocket_urlpatterns
        )
    ),
})