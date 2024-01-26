from django.urls import path, include
from django.contrib.auth.models import User
from rest_framework import routers, serializers, viewsets

# Serializers define the API representation.
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'url', 'username', 'email', 'is_staff', 'password']

    def validade_username(self, value):
        # Valida se username já esta em uso
        username_existente = User.objects.filter(username=value).exists()

        if username_existente:
            raise serializers.ValidationError("Username já cadastrado")
        return value
