from django.db import models
from fornecedores.models import Fornecedor

# Create your models here.
class Material(models.Model):
    nome = models.CharField(max_length=50, unique=True)
    cor_base = models.CharField(max_length=15)
    fornecedor = models.ManyToManyField(Fornecedor)
    
    def __str__(self):
        return self.nome