from django.urls import path, include
from .models import Fornecedor
from rest_framework import routers, serializers, viewsets

class FornecedorSerializers(serializers.ModelSerializer):
    class Meta:
        model = Fornecedor
        fields = ['id', 'nome_empresa', 'cnpj', 'endereco']

        def validade_cnpj(self, value):
            #Verifica se o cnpj ja existe
            cnpj_existe = Fornecedor.objects.filter(cnpj=value).exists()

            if cnpj_existe:
                raise serializers.ValidationError("CNPJ ja cadastrado")
            return value
