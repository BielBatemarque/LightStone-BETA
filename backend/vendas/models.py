from django.db import models
from clientes.models import Cliente
from orcamentos.models import Orcamento
# Create your models here.

class Venda(models.Model):
    valor_total = models.FloatField()
    cliente = models.ForeignKey(Cliente, on_delete=models.DO_NOTHING)
    orcamento = models.ForeignKey(Orcamento, on_delete=models.DO_NOTHING, null=True)
    
    def __str__(self) -> str:
        return self.cliente.nome