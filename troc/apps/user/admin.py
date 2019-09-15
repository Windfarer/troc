from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import WxAppUser

admin.site.register(WxAppUser, UserAdmin)