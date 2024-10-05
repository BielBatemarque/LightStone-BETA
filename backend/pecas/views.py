from django.shortcuts import render
from rest_framework import viewsets
from .models import Peca
from .serializers import PecaSerializers
from rest_framework.response import Response
from rest_framework import status
from materiais.models import Material

# Create your views here.

class PecasViewSets(viewsets.ModelViewSet):
    queryset = Peca.objects.all()
    serializer_class = PecaSerializers

    def create(self, request, *args, **kwargs):
        try:
            response = super().create(request, *args, **kwargs)
            peca = Peca.objects.get(pk=response.data['id'])  # Pegando a peça recém-criada
            material = Material.objects.get(id=peca.material.id)  # Obtendo o preco_m2 do material

            print(material.nome)

            # Incluímos o preço do material na resposta
            response.data['preco_m2'] = material.preco_m2

            return Response(response.data, status=status.HTTP_201_CREATED)
        
        except Exception as e:
            return Response({
                "error": True,
                "message": f"Erro ao cadastrar peça: {str(e)}"
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)