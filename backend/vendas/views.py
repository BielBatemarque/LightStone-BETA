from django.shortcuts import render
from .models import Venda
from rest_framework import viewsets
from .serializers import VendasSerializers
# Create your views here.
class VendaViewSet(viewsets.ModelViewSet):
    queryset = Venda.objects.all()
    serializer_class = VendasSerializers
