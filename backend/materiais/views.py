from django.shortcuts import render
from rest_framework import viewsets
from .models import Material
from .serializers import MaterialSerializers
# Create your views here.

class MaterialViewSets(viewsets.ModelViewSet):
    queryset = Material.objects.all()
    serializer_class = MaterialSerializers