from django.db import models
from clientes.models import Cliente
from pecas.models import Peca

# Create your models here.
class Orcamento(models.Model):
    valor_total = models.FloatField()
    cliente = models.ForeignKey(Cliente, on_delete=models.DO_NOTHING)
    pecas = models.ManyToManyField(Peca)

    def adicionar_peca(self, peca):
        self.pecas.add(peca)

    def remove_peca(self, peca):
        self.pecas.remove(peca)
    
    def __str__(self) -> str:
        return self.cliente.nome