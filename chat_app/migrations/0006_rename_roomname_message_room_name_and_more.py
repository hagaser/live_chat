# Generated by Django 5.1.2 on 2024-10-31 13:23

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('chat_app', '0005_message_date_message_username_message_value_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='message',
            old_name='roomName',
            new_name='room_name',
        ),
        migrations.RenameField(
            model_name='message',
            old_name='userName',
            new_name='user_name',
        ),
    ]
