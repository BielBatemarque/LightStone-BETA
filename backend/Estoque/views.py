from django.shortcuts import render
from .serializers import EstoqueSerializer, MovimentacaoDeEstoqueSerializer
from rest_framework import viewsets
from .models import Estoque, MovimentacaoDeEstoque
from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import get_object_or_404


# Create your views here.

class EstoqueViewsSets(viewsets.ModelViewSet):
    queryset = Estoque.objects.all()
    serializer_class = EstoqueSerializer

class MovimentacaoDeEstoqueViewsSets(viewsets.ModelViewSet):
    queryset = MovimentacaoDeEstoque.objects.all()
    serializer_class = MovimentacaoDeEstoqueSerializer

class EntradaDeEstoque(APIView):
    def post(self, request, estoque_id):
        estoque = get_object_or_404(Estoque, id=estoque_id)
        serializer = MovimentacaoDeEstoqueSerializer(data=request.data)
        print(estoque.material)

        if serializer.is_valid():
            quantidade = serializer.validated_data['quantidade']
            usuario = request.user
            print(estoque.material.nome)

            try:  
                MovimentacaoDeEstoque.objects.create(user=usuario, quantidade=int(quantidade), tipo='entrada', produto=estoque.material)
                estoque.quantidade_metros = estoque.quantidade_metros + int(quantidade)
                estoque.save()

                return Response({'Mensagem': 'Movimentação registrada com sucesso'})
            except Exception as e:
                print(str(e))
                return Response({'Erro': 'Erro interno ao processar a requisição'})
        else:
            return Response({'Erro': serializer.errors})
    
class SaidaDeEstoque(APIView):
    def post(self, request, estoque_id):
        estoque = get_object_or_404(Estoque, id=estoque_id)
        serializer = MovimentacaoDeEstoqueSerializer(data=request.data)

        if serializer.is_valid():
            quantidade = serializer.validated_data['quantidade']
            usuario = request.user
            print(estoque.material.nome)
            try:
                MovimentacaoDeEstoque.objects.create(user=usuario, quantidade=int(quantidade), tipo='saida', produto=estoque.material)
                estoque.quantidade_metros = estoque.quantidade_metros - int(quantidade)
                estoque.save()

                return Response({'Mensagem': 'Movimentação registrada com sucesso'})
            except Exception as e:
                print(str(e))
                return Response({'Erro': 'Erro interno ao processar a requisição'})
        else:
            return Response({'Erro': serializer.errors})