from django.db import models
from django.utils import timezone
from ..species.models import Species
from ..user.models import WxAppUser
# Create your models here.

class Record(models.Model):
    species = models.ForeignKey(Species, on_delete=models.CASCADE)
    user = models.ForeignKey(WxAppUser, on_delete=models.CASCADE)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(default=timezone.now)