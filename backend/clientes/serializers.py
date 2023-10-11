from django.urls import path, include
from .models import Cliente
from rest_framework import routers, serializers, viewsets

class ClienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cliente
        fields = ['id','nome','cpf','endereco','data_nascimento','email']

    def validate_email(self, value):
        # Adicione sua validação personalizada para o campo 'email' aqui
        if not "@" in (value) and not ".com" in value:
            raise serializers.ValidationError("O email não está em um formato válido.")
        return value