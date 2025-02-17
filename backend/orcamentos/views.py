from rest_framework.response import Response
from rest_framework import viewsets
from .models import Orcamento
from .serializers import OrcamentoWriteSerializer, OrcamentoReadSerializer
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework import status
from pecas.serializers import PecaSerializers
from django.db.models.functions import TruncMonth
from django.db.models import Count, Sum


class OrcamentoViewSet(viewsets.ModelViewSet):
    queryset = Orcamento.objects.all()

    def get_serializer_class(self):
        if self.action in ['list', 'retrieve']:  # Para leitura (GET)
            return OrcamentoReadSerializer
        return OrcamentoWriteSerializer  # Para escrita (POST, PUT, PATCH)

    @action(detail=False, methods=["get"])
    def retorna_orcamentos_cliente(self, request):

        cliente_nome = request.query_params.get("cliente", None)

        if cliente_nome:
            orcamentos_filtrados = self.queryset.filter(cliente__nome__icontains=cliente_nome)

            if len(orcamentos_filtrados) > 0:
                orcamentos = []

                for orcamento in orcamentos_filtrados:
                    orcamento.nome_cliente = orcamento.cliente.nome
                    orcamentos.append(orcamento)

            serializer = self.get_serializer(orcamentos, many=True)

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
       
        orcamento_serializer = OrcamentoReadSerializer(orcamento)
        pecas = orcamento.pecas.all()
        pecas_serialier = PecaSerializers(pecas, many=True)

        data = orcamento_serializer.data
        data["pecas"] = pecas_serialier.data
        return Response(data, status=status.HTTP_200_OK)
    
    @action(detail=False, methods=["get"], url_name="reotorna_listagem_orcamentos_com_cliente", url_path="reotorna_listagem_orcamentos_com_cliente")
    def reotorna_listagem_orcamentos_com_cliente(self, request):
        orcamentos = self.queryset.all()

        serializer = OrcamentoReadSerializer(orcamentos, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)
    
    @action(detail=False, methods=["get"], url_name="orcamentos_por_mes", url_path="orcamentos_por_mes")
    def orcamentos_por_mes(self, request):
        orcamentos_agrupados = (
            self.queryset
            .annotate(mes=TruncMonth("created_at"))
            .values("mes")
            .annotate(total_orcamentos=Count("id"), total_valor=Sum("valor_total"))
            .order_by("mes")
        )

        data = [
            {
                "mes": orcamento["mes"].strftime("%Y-%m"),
                "total_orcamentos": orcamento["total_orcamentos"],
                "total_valor": orcamento["total_valor"],
            }
            for orcamento in orcamentos_agrupados
        ]

        return Response(data, status=status.HTTP_200_OK)