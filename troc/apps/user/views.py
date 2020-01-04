from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import WxUserTokenObtainPairSerializer
from . import wechat
from .models import WxAppUser
from .jwt import get_tokens_for_user


class WxUserTokenObtainPairView(TokenObtainPairView):
    serializer_class = WxUserTokenObtainPairSerializer


class AuthView(APIView):
    authentication_classes = []
    permission_classes = []

    # create user or login via jwt
    def post(self, request):
        code = request.data["code"]
        session_info = wechat.get_session_info(code)
        print(session_info)
        try:
            user = WxAppUser.objects.get(openid=session_info["openid"])
            print("user existed", user.openid)
        except WxAppUser.DoesNotExist:  # create user
            user = WxAppUser(
                username=session_info["openid"],
                openid=session_info["openid"],
                session_key=session_info["session_key"],
                unionid=session_info.get("unionid"))
            user.save()
            print("user created", user)
        token = get_tokens_for_user(user)
        print(user, token)
        return Response(token)
