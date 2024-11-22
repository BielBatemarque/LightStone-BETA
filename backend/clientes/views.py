from .models import Cliente
from rest_framework import viewsets
from .serializers import ClienteSerializer
from .models import Cliente
from rest_framework.views import APIView, Response
from rest_framework import status
from utils.validador import Validador
from rest_framework.decorators import action
# Create your views here.

class ClienteViewSet(viewsets.ModelViewSet):
    queryset = Cliente.objects.all()
    serializer_class = ClienteSerializer

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


