from django.contrib.auth.models import User
from rest_framework import routers, serializers, viewsets
from .serializers import UserSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.hashers import make_password

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def create(self, request, *args, **kwargs):
        request.data['password'] = make_password(request.data['password'])
        return super().create(request, *args, **kwargs)
    
    def perform_update(self, serializer):
        # Verifica se o campo de senha foi fornecido na solicitação
        if 'password' in self.request.data:
            self.request.data['password'] = make_password(self.request.data['password'])
        serializer.save()

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()

        # Modifica o campo de senha se fornecido na solicitação
        if 'password' in request.data:
            request.data['password'] = make_password(request.data['password'])

        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        return Response(serializer.data)
    
class UserLoginView(APIView):
    def post(self, request):
        try:
            username = request.data.get('username')
            password = request.data.get('password')

            if not username or not password:
                return Response({'error': 'Informe o nome de usuário e senha.'}, status=status.HTTP_400_BAD_REQUEST)

            user = authenticate(request, username=username, password=password)

            if user is not None:
                login(request, user)
                token, created = Token.objects.get_or_create(user=user)
                print(username)
                if user.is_staff:
                    return Response({'token': token.key, 'user': username, 'superUser': True, 'id': user.id }, status=status.HTTP_200_OK)
                else:
                    return Response({'token': token.key, 'user': username, 'superUser': False}, status=status.HTTP_200_OK)
            else:
                return Response({'error': 'Credenciais inválidas.'}, status=status.HTTP_401_UNAUTHORIZED)
        except Exception as e:
            return Response({'message': f'erro ao efetuar login: {str(e)}'})


class LogoutView(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        try:
            token = request.auth

            if token:
                token.delete()
                return Response({"message": "Logout realizado com sucesso."}, status=status.HTTP_200_OK)
            else:
                return Response({"message": "Você não está autenticado."}, status=status.HTTP_401_UNAUTHORIZED)
        except Exception as e:
            return Response({"message": f"Erro durante o logout {str(e)}"})
    