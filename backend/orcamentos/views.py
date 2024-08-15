from django.db import transaction
from django.db.models import ObjectDoesNotExist
from rest_framework import status
from rest_framework.response import Response
from rest_framework import viewsets
from .models import Orcamento
from .serializers import OrcamentoSerializer

class OrcamentoViewSets(viewsets.ModelViewSet):
    queryset = Orcamento.objects.all()
    serializer_class = OrcamentoSerializer
