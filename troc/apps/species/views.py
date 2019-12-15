from rest_framework import viewsets
from rest_framework import filters

from .models import Species
from .serializers import SpeciesSerializer
from .cc import s2t


class ChineseSearchFilter(filters.SearchFilter):
    def get_search_terms(self, request):
        params = super().get_search_terms(request)
        return [s2t(x) for x in params]


class SpeciesViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Species.objects.all().order_by('-updated_at')
    serializer_class = SpeciesSerializer
    filter_backends = [ChineseSearchFilter]
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
