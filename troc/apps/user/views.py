from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import WxUserTokenObtainPairSerializer


class WxUserTokenObtainPairView(TokenObtainPairView):
    serializer_class = WxUserTokenObtainPairSerializer

class AuthView(APIView):
    authentication_classes = []
    permission_classes = []

    def post(self, request):
        return Response({"msg": "niubi", "data": request.data})

