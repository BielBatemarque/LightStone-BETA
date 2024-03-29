from django.db import models

# Create your models here.
class Fornecedor(models.Model):
    nome_empresa = models.CharField(max_length=50)
    cnpj = models.IntegerField(unique=True)
    cep = models.IntegerField(null=True)
    numero = models.IntegerField(null=True)
    cidade = models.CharField(max_length=50, null=True)
    uf = models.CharField(max_length=5, null=True)
    logradouro = models.CharField(max_length=100, null=True)
    bairro = models.CharField(max_length=100, null=True)

    def __str__(self):
        return self.nome_empresa