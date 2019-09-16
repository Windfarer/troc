from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import WxUserTokenObtainPairSerializer
from . import wechat

class WxUserTokenObtainPairView(TokenObtainPairView):
    serializer_class = WxUserTokenObtainPairSerializer

class AuthView(APIView):
    authentication_classes = []
    permission_classes = []

    def post(self, request):
        code = request.data["code"]
        session_info = wechat.get_session_info(code)
        print(session_info)
        return Response({"msg": "niubi", "data": request.data})

