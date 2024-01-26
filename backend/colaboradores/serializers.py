from django.urls import path, include
from .models import Colaborador
from rest_framework import routers, serializers, viewsets

class ColaboradorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Colaborador
        fields = ['id', 'nome', 'nascimento', 'telefone', 'cpf', 'email', 'cargo']

    def validate_cpf(self, value):
        # Valida se ja existe algum colaborador com o cpf
        cpf_existente = Colaborador.objects.filter(cpf=value).exists()

        if cpf_existente:
            raise serializers.ValidationError("CPF já cadastrado")
        return value