from django.db import models
from django.contrib.auth.models import AbstractUser


class WxAppUser(AbstractUser):
    openid = models.CharField(max_length=200)
    unionid = models.CharField(max_length=200, null=True)
    session_key = models.CharField(max_length=200)
