from django.shortcuts import render
from rest_framework import viewsets
from .models import Peca
from .serializers import PecaSerializers
# Create your views here.

class PecasViewSets(viewsets.ModelViewSet):
    queryset = Peca.objects.all()
    serializer_class = PecaSerializers