from django.shortcuts import render
from rest_framework import viewsets
from .models import Orcamento
from .serializers import OrcamentoSerializer
# Create your views here.

class OrcamentoViewSets(viewsets.ModelViewSet):
    queryset = Orcamento.objects.all()
    serializer_class = OrcamentoSerializer