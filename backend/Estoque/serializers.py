from rest_framework import serializers
from .models import Estoque, MovimentacaoDeEstoque
from materiais.serializers import MaterialSerializers
from materiais.models import Material
from django.contrib.auth.models import User

class EstoqueSerializer(serializers.ModelSerializer):
    class Meta:
        model = Estoque
        fields = ['id', 'material', 'quantidade_metros']

class MovimentacaoDeEstoqueSerializer(serializers.ModelSerializer):
    produto = serializers.PrimaryKeyRelatedField(queryset=Material.objects.all())
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    
    class Meta:
        model = MovimentacaoDeEstoque
        fields = ['id', 'user', 'produto', 'data', 'quantidade', 'tipo']