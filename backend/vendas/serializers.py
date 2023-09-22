from rest_framework import serializers
from .models import Venda

class VendasSerializers(serializers.ModelSerializer):

    class Meta:
        model = Venda
        fields = ['valor_total', 'cliente']