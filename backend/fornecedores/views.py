from django.shortcuts import render
from rest_framework import viewsets, status
from .serializers import FornecedorSerializers
from rest_framework.decorators import action
from .models import Fornecedor
from rest_framework.response import Response
# Create your views here.

class FornecedorViewSets(viewsets.ModelViewSet):
    queryset = Fornecedor.objects.all()
    serializer_class = FornecedorSerializers

    #Verificar funcionamento
    @action(detail=False, methods=["get"], url_name="filtrar_fornecedores", url_path="filtrar_fornecedores")
    def filtrar_fornecedores(self, request):
        nome_fornecedor = request.query_params.get("nome", None)

        if nome_fornecedor:
            fornecedores_filtrados = self.queryset.filter(nome_empresa__icontains=nome_fornecedor)
            serializer = self.get_serializer(fornecedores_filtrados, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response({"detail": "Nenhum fornecedor foi encontrado"}, status=status.HTTP_200_OK)