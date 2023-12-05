from rest_framework import serializers
from .models import Estoque, MovimentacaoDeEstoque

class EstoqueSerializer(serializers.ModelSerializer):
    class Meta:
        model = Estoque
        fields = ['id', 'material', 'quantidade_metros']

class MovimentacaoDeEstoqueSerializer(serializers.ModelSerializer):
    class Meta:
        model = MovimentacaoDeEstoque
        fields = ['id', 'user', 'produto', 'data', 'quantidade', 'tipo']