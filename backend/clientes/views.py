from .models import Cliente
from rest_framework import viewsets
from .serializers import ClienteSerializer
from .models import Cliente
from rest_framework.views import APIView, Response
from rest_framework import status
from rest_framework.decorators import api_view
from utils.validador import Validador
# Create your views here.

class ClienteViewSet(viewsets.ModelViewSet):
    queryset = Cliente.objects.all()
    serializer_class = ClienteSerializer


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


