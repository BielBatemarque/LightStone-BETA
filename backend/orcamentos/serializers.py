from rest_framework import serializers
from .models import Orcamento

class OrcamentoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Orcamento
        fields = ['id', 'valor_total', 'cliente', 'pecas']