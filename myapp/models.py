from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

# Create your models here.

class Chat(models.Model):
    user = models.ForeignKey(User, on_delete = models.CASCADE, related_name = "chat")
    chat_name = models.CharField(max_length = 30)
    created_at = models.DateTimeField(default=timezone.now)

class Message(models.Model):
    chat = models.ForeignKey(Chat, on_delete = models.CASCADE, related_name = "messages")
    prompt = models.TextField()
    response = models.TextField()
    created_at = models.DateTimeField(default=timezone.now)