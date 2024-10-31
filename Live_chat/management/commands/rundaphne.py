from django.core.management.base import BaseCommand
import os

class Command(BaseCommand):
    help = 'Run Daphne server'

    def handle(self, *args, **kwargs):
        exe_directory = os.path.dirname(os.path.abspath(__file__))
        os.system(f'start cmd /K "cd /d {exe_directory} && cd .. && cd .. && cd .. && workon chat_app && daphne -p 8000 Live_chat.asgi:application && echo sart server command: daphne -p 8000 Live_chat.asgi:application"')