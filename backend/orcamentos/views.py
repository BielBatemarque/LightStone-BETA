from django.db import transaction
from django.db.models import ObjectDoesNotExist
from rest_framework import status
from rest_framework.response import Response
from rest_framework import viewsets
from .models import Orcamento
from .serializers import OrcamentoSerializer
from pecas.models import Peca  # Supondo que você tenha um modelo de Peca

class OrcamentoViewSets(viewsets.ModelViewSet):
    queryset = Orcamento.objects.all()
    serializer_class = OrcamentoSerializer

    def perform_create(self, serializer):
        pecas_ids = self.request.data.get("pecas", [])

        # Verificar se todas as peças existem
        try:
            pecas = Peca.objects.filter(pk__in=pecas_ids)
            if len(pecas) != len(pecas_ids):
                return Response({"error": "Um ou mais IDs de peças inválidos."}, status=status.HTTP_400_BAD_REQUEST)

            # Verificar se todos os IDs de peças correspondem a objetos válidos
            if not all(str(peca.id) in pecas_ids for peca in pecas):
                return Response({"error": "Um ou mais IDs de peças inválidos."}, status=status.HTTP_400_BAD_REQUEST)

            # Criar o orçamento dentro de uma transação
            with transaction.atomic():
                # Crie o objeto Orcamento e salve-o
                orcamento = serializer.save()
                
                # Adicione as peças ao orçamento
                orcamento.pecas.add(*pecas)
                
                # Excluir as peças do estoque após serem associadas ao orçamento
                for peca in pecas:
                    peca.delete()

        except ObjectDoesNotExist:
            return Response({"error": "Um ou mais IDs de peças inválidos."}, status=status.HTTP_400_BAD_REQUEST)

        return super().perform_create(serializer)