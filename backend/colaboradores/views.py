from django.shortcuts import render
from .models import Colaborador, Cargos
from .serializers import ColaboradorSerializer, CargoSerializer
from rest_framework import viewsets
# Create your views here.

class ColaboradorViewsSets(viewsets.ModelViewSet):
    queryset = Colaborador.objects.all()
    serializer_class = ColaboradorSerializer

class CargoViewSets(viewsets.ModelViewSet):
    queryset = Cargos.objects.all()
    serializer_class = CargoSerializer