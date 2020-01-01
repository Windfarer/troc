from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import WxAppUser


class WxAppUserAdmin(UserAdmin):
    list_display = UserAdmin.list_display + ('openid', 'unionid')
    fieldsets = UserAdmin.fieldsets + (
        (None, {'fields': ('openid', 'unionid')}),
    )

admin.site.register(WxAppUser, WxAppUserAdmin)