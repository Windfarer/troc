from django.db import models
from django.utils import timezone


# Create your models here.
class Species(models.Model):
    domain = models.CharField(max_length=200, null=True)
    domain_cn = models.CharField(max_length=200, null=True)

    kingdom = models.CharField(max_length=200, null=True)
    kingdom_cn = models.CharField(max_length=200, null=True)

    phylum = models.CharField(max_length=200, null=True)
    phylum_cn = models.CharField(max_length=200, null=True)

    subphylum = models.CharField(max_length=200, null=True)
    subphylum_cn = models.CharField(max_length=200, null=True)

    clazz = models.CharField(max_length=200, null=True)
    clazz_cn = models.CharField(max_length=200, null=True)

    subclass = models.CharField(max_length=200, null=True)
    subclass_cn = models.CharField(max_length=200, null=True)

    order = models.CharField(max_length=200, null=True)
    order_cn = models.CharField(max_length=200, null=True)

    family = models.CharField(max_length=200, null=True)
    family_cn = models.CharField(max_length=200, null=True)

    subfamily = models.CharField(max_length=200, null=True)
    subfamily_cn = models.CharField(max_length=200, null=True)

    genus = models.CharField(max_length=200, null=True)
    genus_cn = models.CharField(max_length=200, null=True)

    species = models.CharField(max_length=200, null=True)
    species_cn = models.CharField(max_length=200, null=True)

    name_cn = models.CharField(max_length=200)
    name_en = models.CharField(max_length=200, null=True)
    name_jp = models.CharField(max_length=200, null=True)
    origin = models.CharField(max_length=200, null=True)
    habitats = models.CharField(max_length=200, null=True)
    part = models.CharField(max_length=200, null=True)
    type = models.CharField(max_length=200, null=True)

    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(default=timezone.now)
