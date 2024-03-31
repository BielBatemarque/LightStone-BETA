from rest_framework import serializers
from .models import Material

class MaterialSerializers(serializers.ModelSerializer):
    class Meta:
        model = Material
        fields = ['id', 'nome', 'cor_base', 'fornecedor']

        def validate_name(self, value):
            # Valida se o material com o mesmo nome já está cadastrado
            nome_existente = Material.objects.filter(nome=value).exists()

            if nome_existente:
                raise serializers.ValidationError("Material já cadastrado")
            return value