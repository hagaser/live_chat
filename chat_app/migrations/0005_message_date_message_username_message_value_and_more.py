# Generated by Django 4.2.13 on 2024-10-29 14:01

import chat_app.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('chat_app', '0004_remove_message_date_remove_message_username_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='message',
            name='date',
            field=models.DateTimeField(blank=True, default=chat_app.models.Message.get_time),
        ),
        migrations.AddField(
            model_name='message',
            name='userName',
            field=models.CharField(default=1, max_length=1000),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='message',
            name='value',
            field=models.CharField(default=1, max_length=10000),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='message',
            name='id',
            field=models.AutoField(primary_key=True, serialize=False),
        ),
    ]