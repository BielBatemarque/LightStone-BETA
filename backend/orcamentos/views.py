from rest_framework.response import Response
from rest_framework import viewsets
from .models import Orcamento
from .serializers import OrcamentoSerializer
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework import status
from pecas.serializers import PecaSerializers

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

    @action(detail=False, methods=["post"])
    def retorna_orcamento_com_pecas(self, request):
        orcamento_id = request.data.get("id", None)

        if not orcamento_id:
            return Response({"datail": "O campo id é obrigatorio"}, status=status.HTTP_400_BAD_REQUEST)
       
        try:
            orcamento = Orcamento.objects.get(id=orcamento_id)
        except Orcamento.DoesNotExist:
            return Response({"detail": "Orçamento não encontrado."}, status=status.HTTP_404_NOT_FOUND)
       
        orcamento_serializer = self.get_serializer(orcamento)
        pecas = orcamento.pecas.all()
        pecas_serialier = PecaSerializers(pecas, many=True)

        data = orcamento_serializer.data
        data["pecas"] = pecas_serialier.data
        return Response(data, status=status.HTTP_200_OK)
