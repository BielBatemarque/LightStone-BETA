from django.db import models

# Create your models here.

class Cargos(models.Model):
    nome = models.CharField(max_length=100)

    def __str__(self) -> str:
        return self.nome

class Colaborador(models.Model):
    nome = models.CharField(max_length=80)
    nascimento = models.DateField()
    telefone = models.CharField(max_length=15)
    cpf = models.TextField(max_length=11, unique=True)
    email = models.CharField(max_length=100)
    cargo = models.ForeignKey(Cargos, on_delete=models.DO_NOTHING, null=True)

    def __str__(self) -> str:
        return self.nome
    