from .models import Cliente
from rest_framework import routers, serializers, viewsets

class ClienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cliente
        fields = ['id','nome','cpf','data_nascimento','email', 'cep', 'numero', "cidade", 'uf', 'logradouro', 'bairro', 'telefone']

    def validate_email(self, value):
        # Adicione sua validação personalizada para o campo 'email' aqui
        if not "@" in (value) and not ".com" in value:
            raise serializers.ValidationError("O email não está em um formato válido.")
        return value
    
    def validate_cpf(self, value):
        # Verifica se o CPF de cadastro já existe no banco
        cpf_existente = Cliente.objects.filter(cpf=value).exclude(id=self.instance.id if self.instance else None).first()

        if cpf_existente:
            raise serializers.ValidationError("Este CPF já está em uso com outro Cliente")

        return value
    
