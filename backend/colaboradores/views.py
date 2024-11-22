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


class CargoViewSets(viewsets.ModelViewSet):
    queryset = Cargos.objects.all()
    serializer_class = CargoSerializer