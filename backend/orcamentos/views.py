from rest_framework.response import Response
from rest_framework import viewsets
from .models import Orcamento
from .serializers import OrcamentoSerializer
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework import status

class OrcamentoViewSets(viewsets.ModelViewSet):
    queryset = Orcamento.objects.all()
    serializer_class = OrcamentoSerializer

    @action(detail=False, methods=["get"])
    def retorna_orcamentos_cliente(self, request):

        cliente_nome = request.query_params.get("cliente", None)

        if cliente_nome:
            orcamentos_filtrados = self.queryset.filter(cliente__nome__icontains=cliente_nome)
            serializer = self.get_serializer(orcamentos_filtrados, many=True)

            return Response(serializer.data, status=status.HTTP_200_OK)
        
        Response({"datail": "Cliente não encontrado"}, status=status.HTTP_400_BAD_REQUEST)