from django.urls import path, include
from .models import Cliente
from rest_framework import routers, serializers, viewsets

class ClienteSerializer(serializers.ModelSerializer):
    class meta:
        model = Cliente
        fields = ['nome','cpf','endereco','data_nascimento','email']