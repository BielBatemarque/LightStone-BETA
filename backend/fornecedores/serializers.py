from django.urls import path, include
from .models import Fornecedor
from rest_framework import routers, serializers, viewsets

class FornecedorSerializers(serializers.ModelSerializer):
    class Meta:
        model = Fornecedor
        fields = ['nome_empresa', 'cnpj', 'endereco']
