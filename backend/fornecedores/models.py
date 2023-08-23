from django.db import models

# Create your models here.
class Fornecedor(models.Model):
    nome_empresa = models.CharField(max_length=50)
    cnpj = models.IntegerField()
    endereco = models.TextField(max_length=150)
