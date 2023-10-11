from django.urls import path, include
from .models import Colaborador
from rest_framework import routers, serializers, viewsets

class ColaboradorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Colaborador
        fields = ['id', 'nome', 'nascimento', 'telefone', 'cpf', 'email']

