from django.contrib import admin
from .models import Species
class SpeciesAdmin(admin.ModelAdmin):
    list_display = ("name_cn", "name_en", "updated_at")

admin.site.register(Species, SpeciesAdmin)