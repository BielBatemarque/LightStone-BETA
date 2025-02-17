from rest_framework import serializers
from .models import Orcamento
from clientes.serializers import ClienteSerializer
from clientes.models import Cliente

class OrcamentoWriteSerializer(serializers.ModelSerializer):
    """Serializer para criação e atualização, aceita apenas o ID do cliente."""
    cliente = serializers.PrimaryKeyRelatedField(queryset=Cliente.objects.all())

    class Meta:
        model = Orcamento
        fields = ['id', 'valor_total', 'cliente', 'pecas']


class OrcamentoReadSerializer(serializers.ModelSerializer):
    """Serializer para leitura, retorna o objeto completo do cliente."""
    cliente = ClienteSerializer()

    class Meta:
        model = Orcamento
        fields = ['id', 'valor_total', 'cliente', 'pecas']