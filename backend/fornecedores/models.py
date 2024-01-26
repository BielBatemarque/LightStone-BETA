from django.db import models

# Create your models here.
class Fornecedor(models.Model):
    nome_empresa = models.CharField(max_length=50)
    cnpj = models.IntegerField(unique=True)
    endereco = models.TextField(max_length=150)

    def __str__(self):
        return self.nome_empresa