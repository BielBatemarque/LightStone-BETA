from django.db import models

# Create your models here.

class Ciente(models.Model):
    nome = models.CharField(max_length=50)
    cpf = models.IntegerField()
    endereco = models.TextField(max_length=150)
    data_nascimento = models.DateField()
    email = models.EmailField(max_length=150)

    def __str__(self):
        return self.nome

