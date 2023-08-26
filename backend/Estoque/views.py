from django.shortcuts import render
from .serializers import EstoqueSerializer
from rest_framework import viewsets
from .models import Estoque

# Create your views here.

class EstoqueViewsSets(viewsets.ModelViewSet):
    queryset = Estoque.objects.all()
    serializer_class = EstoqueSerializer