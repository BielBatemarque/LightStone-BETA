from django.contrib.auth.models import User
from rest_framework import routers, serializers, viewsets
from .serializers import UserSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserLoginView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password  = request.data.get('password')
        
        user = authenticate(request, username=username, password=password)
        print(user)

        if user is not None:
            login(request, user)
            print(request.user.is_authenticated)
            return Response({'message': 'Sucesso no login'})
        else:
            return Response({'message': 'Falha ao Logar'})

class UserLogoutView(APIView):
    def post(self, request):
        print(request.user.is_authenticated)
        if request.user.is_authenticated:
            logout(request)
            return Response({'message': 'Logout bem-sucedido'})
        else:
            return Response({'message': 'Nenhum usuário logado'})