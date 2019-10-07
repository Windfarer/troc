from django.shortcuts import render
from rest_framework import viewsets
from .serializers import RecordSerializer
from .models import Record
from rest_framework_simplejwt.authentication import JWTTokenUserAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny

# Create your views here.
class RecordViewSet(viewsets.ModelViewSet):
    # authentication_classes = [JWTTokenUserAuthentication]
    permission_classes = [AllowAny]

    queryset = Record.objects.all().order_by('-updated_at')
    serializer_class = RecordSerializer