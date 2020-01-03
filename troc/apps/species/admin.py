from django.contrib import admin
from .models import Species
from django.db import models
from .cc import s2t

class SpeciesAdmin(admin.ModelAdmin):
    list_display = ("name_cn", "name_en", "updated_at")
    search_fields = [field.name for field in Species._meta.get_fields() if isinstance(field, (models.CharField, models.TextField))]

    def get_search_results(self, request, queryset, search_term):
        queryset, use_distinct = super().get_search_results(request, queryset, s2t(search_term))
        return queryset, use_distinct

admin.site.register(Species, SpeciesAdmin)
