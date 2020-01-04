from rest_framework import viewsets
from rest_framework import filters
from django.db import models

from .models import Species
from ..user.models import WxAppUser
from .serializers import SpeciesSerializer
from .cc import s2t


from rest_framework_simplejwt.authentication import JWTTokenUserAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny

class ChineseSearchFilter(filters.SearchFilter):
    def get_search_terms(self, request):
        params = super().get_search_terms(request)
        return [s2t(x) for x in params]


class SpeciesViewSet(viewsets.ReadOnlyModelViewSet):
    authentication_classes = [JWTTokenUserAuthentication]
    # permission_classes = [IsAuthenticated]
    # queryset = Species.objects.all().order_by('-updated_at')

    def get_queryset(self):
        token_user = self.request.user
        if token_user.is_authenticated:
            print(WxAppUser.objects.get(id=token_user.id))
        return Species.objects.all().order_by('-updated_at')

    serializer_class = SpeciesSerializer
    filter_backends = [ChineseSearchFilter]
    search_fields = [field.name for field in Species._meta.get_fields() if isinstance(field, (models.CharField, models.TextField))]
