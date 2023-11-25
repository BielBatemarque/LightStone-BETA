from django.shortcuts import render
from .serializers import EstoqueSerializer
from rest_framework import viewsets
from .models import Estoque
from rest_framework.views import APIView
from rest_framework.response import Response


# Create your views here.

class EstoqueViewsSets(viewsets.ModelViewSet):
    queryset = Estoque.objects.all()
    serializer_class = EstoqueSerializer

class EntradaDeEstoque(APIView):
    def post(self, request):
        return
    
class SaidaDeEstoque(APIView):
    def post(self, request):
        return