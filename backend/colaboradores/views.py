from django.shortcuts import render
from .models import Colaborador, Cargos
from .serializers import ColaboradorSerializer, CargoSerializer
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework import status
from rest_framework.response import Response
# Create your views here.

class ColaboradorViewsSets(viewsets.ModelViewSet):
    queryset = Colaborador.objects.all()
    serializer_class = ColaboradorSerializer

    @action(detail=False, methods=["get"], url_name="listagem_colaborador_cargo", url_path="listagem_colaborador_cargo")
    def listagem_colaborador_cargo(self, request):
        colaboradores = self.queryset.all()
        serializer = self.get_serializer(colaboradores, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)

    #Verificar depois o funcionamento
    @action(detail=False, methods=["get"], url_name= "filtrar_colaborador", url_path="filtrar_colaborador")
    def filtrar_colaborador(self, request):
        nome_colaborador = request.query_params.get("nome", None)
        
        if nome_colaborador:
            colaborador_filtrado = self.queryset.filter(nome__icontains=nome_colaborador)
            serializer = self.get_serializer(colaborador_filtrado, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response({"detail": "Nenhum colaborador com este nome foi encontrado"}, status=status.HTTP_400_BAD_REQUEST)


class CargoViewSets(viewsets.ModelViewSet):
    queryset = Cargos.objects.all()
    serializer_class = CargoSerializer