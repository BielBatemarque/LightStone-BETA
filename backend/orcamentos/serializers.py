from rest_framework import serializers
from .models import Orcamento
from clientes.serializers import ClienteSerializer

class OrcamentoSerializer(serializers.ModelSerializer):
    cliente = ClienteSerializer()

    class Meta:
        model = Orcamento
        fields = ['id', 'valor_total', 'cliente', 'pecas']