from rest_framework import viewsets
from rest_framework import filters

from .models import Species
from .serializers import SpeciesSerializer


class SpeciesViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Species.objects.all().order_by('-updated_at')
    serializer_class = SpeciesSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = [
        "domain",
        "domain_cn",
        "kingdom",
        "kingdom_cn",
        "phylum",
        "phylum_cn",
        "subphylum",
        "subphylum_cn",
        "clazz",
        "clazz_cn",
        "subclass",
        "subclass_cn",
        "order",
        "order_cn",
        "family",
        "family_cn",
        "subfamily",
        "subfamily_cn",
        "genus",
        "genus_cn",
        "species",
        "species_cn",
        "name_cn",
        "name_en",
        "name_jp",
        "origin",
        "habitats",
        "part",
        "type",
    ]
