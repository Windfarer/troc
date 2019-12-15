from django.db import models
from django.utils import timezone


# Create your models here.
class Species(models.Model):
    domain = models.CharField(max_length=200, null=True, verbose_name="域")
    domain_cn = models.CharField(max_length=200, null=True, verbose_name="域-中文")

    kingdom = models.CharField(max_length=200, null=True, verbose_name="界")
    kingdom_cn = models.CharField(max_length=200, null=True, verbose_name="界-中文")

    phylum = models.CharField(max_length=200, null=True, verbose_name="门")
    phylum_cn = models.CharField(max_length=200, null=True, verbose_name="门-中文")

    subphylum = models.CharField(max_length=200, null=True, verbose_name="亚门")
    subphylum_cn = models.CharField(max_length=200, null=True, verbose_name="亚门-中文")

    clazz = models.CharField(max_length=200, null=True, verbose_name="纲")
    clazz_cn = models.CharField(max_length=200, null=True, verbose_name="纲-中文")

    subclass = models.CharField(max_length=200, null=True, verbose_name="亚纲")
    subclass_cn = models.CharField(max_length=200, null=True, verbose_name="亚纲-中文")

    order = models.CharField(max_length=200, null=True, verbose_name="目")
    order_cn = models.CharField(max_length=200, null=True, verbose_name="目-中文")

    family = models.CharField(max_length=200, null=True, verbose_name="科")
    family_cn = models.CharField(max_length=200, null=True, verbose_name="科-中文")

    subfamily = models.CharField(max_length=200, null=True, verbose_name="亚科")
    subfamily_cn = models.CharField(max_length=200, null=True, verbose_name="亚科-中文")

    genus = models.CharField(max_length=200, null=True, verbose_name="属")
    genus_cn = models.CharField(max_length=200, null=True, verbose_name="属-中文")

    species = models.CharField(max_length=200, null=True, verbose_name="种")
    species_cn = models.CharField(max_length=200, null=True, verbose_name="种-中文")

    name_cn = models.CharField(max_length=200, verbose_name="名称-中文")
    name_en = models.CharField(max_length=200, null=True, verbose_name="名称-英文")
    name_jp = models.CharField(max_length=200, null=True, verbose_name="名称-日文")
    origin = models.CharField(max_length=200, null=True)
    habitats = models.CharField(max_length=200, null=True)
    part = models.CharField(max_length=200, null=True)
    type = models.CharField(max_length=200, null=True)

    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(default=timezone.now)
