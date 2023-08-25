from django.shortcuts import render
from rest_framework import viewsets
from .serializers import FornecedorSerializers
from .models import Fornecedor
# Create your views here.

class FornecedorViewSets(viewsets.ModelViewSet):
    queryset = Fornecedor.objects.all()
    serializer_class = FornecedorSerializers