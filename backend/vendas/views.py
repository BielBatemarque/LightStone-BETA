from django.shortcuts import render
from .models import Venda
from rest_framework import viewsets
from .serializers import VendasSerializers
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework import status
from django.db.models.functions import TruncMonth
from django.db.models import Count, Sum


# Create your views here.
class VendaViewSet(viewsets.ModelViewSet):
    queryset = Venda.objects.all()
    serializer_class = VendasSerializers

    @action(detail=False, methods=["get"])
    def retorna_vendas_filtradas(self, request):

        print("entrou aqui")

        cliente_nome = request.query_params.get('cliente', None)

        if cliente_nome:
            vendas_filtradas = self.queryset.filter(cliente__nome__icontains=cliente_nome)
            serializer = self.get_serializer(vendas_filtradas, many=True)
            
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        return Response({"datail": "Cliente não encontrado"}, status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=False, methods=["get"], url_name="listagem_vendas_cliente", url_path="listagem_vendas_cliente")
    def listagem_vendas_cliente(self, request):
        vendas = self.queryset.select_related("cliente")

        data = [
            {
                "id": venda.id,
                "valor_total": venda.valor_total,
                "cliente": {
                    "id": venda.cliente.id,
                    "nome": venda.cliente.nome
                }
            }
            for venda in vendas
        ]

        return Response(data, status=status.HTTP_200_OK)
    
    @action(detail=False, methods=["get"], url_name="vendas_por_mes", url_path="vendas_por_mes")
    def vendas_por_mes(self, request):
        vendas_agrupadas = (
            self.queryset
            .annotate(mes=TruncMonth("created_at"))
            .values("mes")
            .annotate(total_vendas=Count("id"), total_valor=Sum("valor_total"))
            .order_by("mes")
        )

        data = [
            {
                "mes": venda["mes"].strftime("%Y-%m"),
                "total_vendas": venda["total_vendas"],
                "total_valor": venda["total_valor"],
            }
            for venda in vendas_agrupadas
        ]

        return Response(data, status=status.HTTP_200_OK)