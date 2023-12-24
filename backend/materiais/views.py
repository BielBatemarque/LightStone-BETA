from django.shortcuts import render
from rest_framework import viewsets
from .models import Material
from .serializers import MaterialSerializers
from rest_framework.response import Response
from Estoque.models import Estoque

# Create your views here.

class MaterialViewSets(viewsets.ModelViewSet):
    queryset = Material.objects.all()
    serializer_class = MaterialSerializers

    def perform_create(self, serializer):
        instance =  serializer.save()
        print(f'cadastrado novo material: {instance.nome}')
        
        Estoque.objects.create(material= instance, quantidade_metros=0)
        return Response(serializer.data)