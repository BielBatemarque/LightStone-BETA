from django.db import models
from clientes.models import Cliente
from materiais.models import Material

# Create your models here.
class Orcamento(models.Model):
    valor_total = models.FloatField()
    cliente = models.ForeignKey(Cliente, on_delete=models.DO_NOTHING)
    material = models.ManyToManyField(Material)
    
    def __str__(self) -> str:
        return self.cliente.nome