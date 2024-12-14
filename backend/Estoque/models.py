from django.db import models
from materiais.models import Material
from django.contrib.auth.models import User
from django.utils import timezone


# Create your models here.

class Estoque(models.Model):
    material = models.ForeignKey(Material, on_delete=models.DO_NOTHING)
    quantidade_metros = models.IntegerField()

    def __str__(self):
        return self.material.nome
    
class MovimentacaoDeEstoque(models.Model):
    user = models.ForeignKey(User, on_delete=models.DO_NOTHING)
    produto = models.ForeignKey(Material, on_delete=models.DO_NOTHING)
    data = models.DateTimeField(default=timezone.now)
    quantidade = models.IntegerField()
    tipo = models.CharField(max_length=30)