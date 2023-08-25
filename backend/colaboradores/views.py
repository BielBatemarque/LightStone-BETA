from django.shortcuts import render
from .models import Colaborador
from .serializers import ColaboradorSerializer
from rest_framework import viewsets
# Create your views here.

class ColaboradorViewsSets(viewsets.ModelViewSet):
    queryset = Colaborador.objects.all()
    serializer_class = ColaboradorSerializer