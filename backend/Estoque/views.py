from django.shortcuts import render
from .serializers import EstoqueSerializer, MovimentacaoDeEstoqueSerializer
from rest_framework import viewsets
from .models import Estoque, MovimentacaoDeEstoque
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from materiais.models import Material
from rest_framework.decorators import action


# Create your views here.

class EstoqueViewsSets(viewsets.ModelViewSet):
    queryset = Estoque.objects.all()
    serializer_class = EstoqueSerializer

    @action(detail=False, methods=['get'], url_name="listagem_estoque_material", url_path="listagem_estoque_material")
    def listagem_estoque_material(self, request):
        estoques = self.queryset.select_related("material")
        data = [
            {
                "id": estoque.id,
                "quantidade_metros": estoque.quantidade_metros,
                "material": {
                    "id": estoque.material.id,
                    "nome": estoque.material.nome,
                }
            }
            for estoque in estoques
        ]

        return Response(data, status=status.HTTP_200_OK)
    
    @action(detail=False, methods=["get"], url_name="filtrar_estoque", url_path="filtrar_estoque")
    def filtrar_estoque(self, request):
        estoques = self.queryset.select_related("material")
        nome_material = request.query_params.get("material", None)

        if nome_material:
            estoques = estoques.filter(material__nome__icontains=nome_material)

            data = [
                {
                    "id": estoque.id,
                    "quantidade_metros": estoque.quantidade_metros,
                    "material": {
                        "id": estoque.material.id,
                        "nome": estoque.material.nome,                  
                    }
                }
                for estoque in estoques
            ]

            return Response(data, status=status.HTTP_200_OK)
        
        return Response({"detail": "Material não encontrado"})


class MovimentacaoDeEstoqueViewsSets(viewsets.ModelViewSet):
    queryset = MovimentacaoDeEstoque.objects.all()
    serializer_class = MovimentacaoDeEstoqueSerializer

    @action(detail=False, methods=["get"], url_name="retorna_movimentacoes_por_estoque", url_path="retorna_movimentacoes_por_estoque")
    def retorna_movimentacoes_por_estoque(self, request):
        estoque = request.query_params.get("produto", None)
        movimentacoes_por_estoque = self.queryset.filter(produto__id=estoque)
        serializer = self.get_serializer(movimentacoes_por_estoque, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class EntradaDeEstoque(APIView):
    def post(self, request, estoque_id):
        estoque = get_object_or_404(Material, id=estoque_id)  # Buscar direto o Material
        serializer = MovimentacaoDeEstoqueSerializer(data=request.data)

        if serializer.is_valid():
            quantidade = serializer.validated_data['quantidade']
            usuario = request.user

            try:
                # Criar a movimentação
                MovimentacaoDeEstoque.objects.create(
                    user=usuario,
                    quantidade=int(quantidade),
                    tipo='entrada',
                    produto_id=estoque.id
                )

                # Atualizar o estoque do material
                estoque_estoque = Estoque.objects.get(material=estoque)
                estoque_estoque.quantidade_metros += int(quantidade)
                estoque_estoque.save()

                return Response({'Mensagem': 'Movimentação registrada com sucesso'})
            except Exception as e:
                print(str(e))
                return Response({'Erro': 'Erro interno ao processar a requisição'})
        else:
            return Response({'Erro': serializer.errors})
    
class SaidaDeEstoque(APIView):
    def post(self, request, estoque_id):
        estoque = get_object_or_404(Material, id=estoque_id)  # Buscar direto o Material
        serializer = MovimentacaoDeEstoqueSerializer(data=request.data)

        if serializer.is_valid():
            quantidade = serializer.validated_data['quantidade']
            usuario = request.user

            try:
                # Criar a movimentação
                MovimentacaoDeEstoque.objects.create(
                    user=usuario,
                    quantidade=int(quantidade),
                    tipo='saida',
                    produto_id=estoque.id
                )

                # Atualizar o estoque do material
                estoque_estoque = Estoque.objects.get(material=estoque)
                estoque_estoque.quantidade_metros -= int(quantidade)
                estoque_estoque.save()

                return Response({'Mensagem': 'Movimentação registrada com sucesso'})
            except Exception as e:
                print(str(e))
                return Response({'Erro': 'Erro interno ao processar a requisição'})
        else:
            return Response({'Erro': serializer.errors})