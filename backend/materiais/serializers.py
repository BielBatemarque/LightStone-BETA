from rest_framework import serializers
from .models import Material

class MaterialSerializers(serializers.ModelSerializer):
    class Meta:
        model = Material
        fields = ['nome', 'cor_base', 'fornecedor']