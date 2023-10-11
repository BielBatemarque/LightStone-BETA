from rest_framework import serializers
from .models import Estoque

class EstoqueSerializer(serializers.ModelSerializer):
    class Meta:
        model = Estoque
        fields = ['id', 'material', 'quantidade_metros']