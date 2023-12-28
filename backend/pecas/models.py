from django.db import models
from materiais.models import Material

# Create your models here.

class Peca(models.Model):
    material = models.ForeignKey(Material, on_delete=models.CASCADE)
    nome = models.CharField(max_length=100)
    dimensoes = models.TextField()

    def __str__(self) -> str:
        return self.nome