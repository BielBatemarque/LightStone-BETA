from django.db import models

# Create your models here.
class Material(models.Model):
    nome = models.CharField(max_length=50)
    cor_base = models.CharField(max_length=15)
    