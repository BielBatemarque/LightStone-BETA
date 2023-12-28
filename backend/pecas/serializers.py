from rest_framework import serializers
from .models import Peca

class PecaSerializers(serializers.ModelSerializer):
    class Meta:
        model = Peca
        fields = ['id', 'nome', 'dimensoes', 'material']