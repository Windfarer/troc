from django.shortcuts import render
from rest_framework import viewsets

from .models import Species
from .serializers import SpeciesSerializer

# Create your views here.

class SpeciesViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = SpeciesSerializer

    def get_queryset(self):
        queryset = Species.objects.all().order_by('-updated_at')
        query = self.request.query_params.get('query', None)
        if query is not None:
            queryset = queryset.filter(name_cn__contains=query)
        return queryset