from .models import Colaborador, Cargos
from rest_framework import serializers
from datetime import datetime

class ColaboradorSerializer(serializers.ModelSerializer):
    cargo_nome = serializers.ReadOnlyField(source="cargo.nome")
    class Meta:
        model = Colaborador
        fields = ['id', 'nome', 'nascimento', 'telefone', 'cpf', 'email', 'cargo', 'cargo_nome']

    def validade_email(self, value):

        if not "@" in value and not ".com" in value:
            raise serializers.ValidationError("Email Inválido")

        return value

    def validate_cpf(self, value):
        # Valida se ja existe algum colaborador com o cpf
        cpf_existente = Colaborador.objects.filter(cpf=value).exists()

        if len(value) != 11:
            raise serializers.ValidationError("CPF inválido")

        if cpf_existente:
            raise serializers.ValidationError("CPF já cadastrado")
        return value
    
class CargoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cargos
        fields = ['id', 'nome']