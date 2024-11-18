from django.db import models
from clientes.models import Cliente
from pecas.models import Peca

# Create your models here.
class Orcamento(models.Model):
    valor_total = models.FloatField()
    cliente = models.ForeignKey(Cliente, on_delete=models.CASCADE)
    pecas = models.ManyToManyField(Peca)
    
    def __str__(self) -> str:
        return self.cliente.nome