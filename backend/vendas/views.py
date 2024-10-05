from django.shortcuts import render
from .models import Venda
from rest_framework import viewsets
from .serializers import VendasSerializers
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework import status
from django.db.models import Q

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
