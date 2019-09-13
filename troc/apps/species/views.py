from django.shortcuts import render
from rest_framework import viewsets

from .models import Species
from .serializers import SpeciesSerializer

# Create your views here.

class SpeciesViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Species.objects.all().order_by('-updated_at')
    serializer_class = SpeciesSerializer