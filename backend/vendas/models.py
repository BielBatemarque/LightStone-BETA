from django.db import models
from clientes.models import Cliente
# Create your models here.

class Venda(models.Model):
    valor_total = models.FloatField()
    cliente = models.ForeignKey(Cliente, on_delete=models.DO_NOTHING)