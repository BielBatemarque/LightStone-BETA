from django.contrib import admin
from django.urls import path, include
from rest_framework import routers, serializers, viewsets
from usuarios.views import UserViewSet
from clientes.views import ClienteViewSet
from colaboradores.views import ColaboradorViewsSets
from fornecedores.views import FornecedorViewSets
from Estoque.views import EstoqueViewsSets
from materiais.views import MaterialViewSets
from usuarios.views import UserLoginView



router = routers.DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'clientes', ClienteViewSet)
router.register(r'colaboradores', ColaboradorViewsSets)
router.register(r'fornecedores', FornecedorViewSets)
router.register(r'estoques', EstoqueViewsSets)
router.register(r'materiais', MaterialViewSets)

urlpatterns = [
    path('', include(router.urls)),
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('login/', UserLoginView.as_view(), name='user-login'),
]
