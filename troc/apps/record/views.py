from django.shortcuts import render
from rest_framework import viewsets
from .serializers import RecordSerializer
from .models import Record
from ..species.models import Species
from rest_framework_simplejwt.authentication import JWTTokenUserAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.exceptions import NotFound
# Create your views here.
class RecordViewSet(viewsets.ModelViewSet):
    authentication_classes = [JWTTokenUserAuthentication]
    permission_classes = [IsAuthenticated]

    serializer_class = RecordSerializer

    def get_queryset(self):
        """
        This view should return a list of all the purchases
        for the currently authenticated user.
        """
        user = self.request.user
        return Record.objects.filter(user=user)

    def create(self, request):
        user = self.request.user
        species_id = self.request.data["species_id"]
        species = Species.objects.get(id=species_id)
        if not species:
            raise NotFound()
        record = Record(species=species, user=user)
