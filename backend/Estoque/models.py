from django.db import models
from materiais.models import Material
# Create your models here.

class Estoque(models.Model):
    material = models.ForeignKey(Material, on_delete=models.CASCADE)
    quantidade_metros = models.IntegerField()