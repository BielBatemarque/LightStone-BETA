from .models import Cliente
from rest_framework import viewsets
from .serializers import ClienteSerializer
from .models import Cliente
from rest_framework.views import APIView, Response
from rest_framework import status
from utils.validador import Validador
from rest_framework.decorators import action
import re
# Create your views here.

class ClienteViewSet(viewsets.ModelViewSet):
    queryset = Cliente.objects.all()
    serializer_class = ClienteSerializer

    def create(self, request, *args, **kwargs):
        try:
            # Obter os dados da requisição
            data = request.data

            # Limpar o CPF (remover máscara)
            if "cpf" in data:
                data["cpf"] = re.sub(r"\D", "", data["cpf"])

                # Validar CPF
                if not Validador.valida_cpf_cnpj(data["cpf"]):
                    return Response({"error": "CPF inválido"}, status=status.HTTP_400_BAD_REQUEST)

            # Passar os dados limpos para o serializer
            serializer = self.get_serializer(data=data)
            serializer.is_valid(raise_exception=True)

            # Salvar os dados
            self.perform_create(serializer)

            # Retornar a resposta com o cliente criado
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        except Exception as e:
            print(f"Erro ao criar cliente: {str(e)}")
            return Response({"error": f"Erro ao criar cliente: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def update(self, request, *args, **kwargs):
        try:
            # Obter a instância existente
            partial = kwargs.pop('partial', False)  # Identificar se é um PATCH (atualização parcial)
            instance = self.get_object()

            # Obter os dados da requisição
            data = request.data

            # Limpar o CPF (remover máscara)
            # if "cpf" in data:
            #     data["cpf"] = re.sub(r"\D", "", data["cpf"])

                # Validar CPF
            if not Validador.valida_cpf_cnpj(str(data["cpf"])):
                return Response({"error": "CPF inválido"}, status=status.HTTP_400_BAD_REQUEST)

            # Passar os dados limpos para o serializer
            serializer = self.get_serializer(instance, data=data, partial=partial)
            serializer.is_valid(raise_exception=True)

            # Atualizar os dados
            self.perform_update(serializer)

            # Retornar os dados atualizados
            return Response(serializer.data, status=status.HTTP_200_OK)

        except Exception as e:
            print(f"Erro ao atualizar cliente: {str(e)}")
            return Response({"error": f"Erro ao atualizar cliente: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    @action(detail=False, methods=["get"], url_name="filtrar_clientes", url_path="filtrar_clientes")
    def filtrar_clientes(self, request):
        nome_cliente = request.query_params.get("nome", None)

        if nome_cliente:
            clientes_filtrados = self.queryset.filter(nome__icontains=nome_cliente)
            serializer = self.get_serializer(clientes_filtrados, many=True)

            return Response(serializer.data, status=status.HTTP_200_OK)
        
        Response({"datail": "Cliente não encontrado"}, status=status.HTTP_400_BAD_REQUEST)

class ValidaCPF(APIView):
    def post(self, request):
        try:

            documento = request.data.get("cpf")
            print(documento)

            if not documento:
                return Response({"error": "Informe o número do documento."}, status=status.HTTP_400_BAD_REQUEST)
            
            if Validador.valida_cpf_cnpj(documento):
                return Response({"message": "número de documento válido"})
            else:
                return Response({"error": "número de documento inválido"}, status=status.HTTP_400_BAD_REQUEST)
            
            
        except Exception as e:
            print(str(e))
            return Response({"error": f"erro ao tentar processar: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


