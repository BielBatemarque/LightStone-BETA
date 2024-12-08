from django.shortcuts import render
from rest_framework import viewsets
from .models import Material
from .serializers import MaterialSerializers
from rest_framework.response import Response
from Estoque.models import Estoque
from rest_framework.decorators import action
from rest_framework import status

# Create your views here.

class MaterialViewSets(viewsets.ModelViewSet):
    queryset = Material.objects.all()
    serializer_class = MaterialSerializers

    def perform_create(self, serializer):
        instance =  serializer.save()
        print(f'cadastrado novo material: {instance.nome}')
        
        Estoque.objects.create(material= instance, quantidade_metros=0)
        return Response(serializer.data)
    
    @action(detail=False, methods=["get"], url_name="filtrar_materiais", url_path="filtrar_materiais")
    def filtrar_materiais(self, request):
        nome_material = request.query_params.get("nome", None)
        materiais = self.queryset.select_related("fornecedor")

        if nome_material:
            materiais = materiais.filter(nome__icontains=nome_material)

            data = [
                {
                    "id": material.id,
                    "nome": material.nome,
                    "cor_base": material.cor_base,
                    "forncedor": {
                        "id": material.fornecedor.id,
                        "nome": material.fornecedor.nome
                    }
                }
                for material in materiais
            ]

            return Response(data, status=status.HTTP_200_OK)
            


