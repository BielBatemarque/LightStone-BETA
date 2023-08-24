from django.shortcuts import render
from .models import Cliente
from rest_framework import routers, serializers, viewsets
from .serializers import ClienteSerializer
from .models import Cliente
# Create your views here.

class ClienteViewSet(viewsets.ModelViewSet):
    queryset = Cliente.objects.all()
    serializer_class = ClienteSerializer