from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from usuarios.views import UserViewSet
from clientes.views import ClienteViewSet
from colaboradores.views import ColaboradorViewsSets
from fornecedores.views import FornecedorViewSets
from Estoque.views import EstoqueViewsSets, EntradaDeEstoque, SaidaDeEstoque
from materiais.views import MaterialViewSets
from usuarios.views import UserLoginView, LogoutView
from vendas.views import VendaViewSet
from relatorios.views import PDFView

router = routers.DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'clientes', ClienteViewSet)
router.register(r'colaboradores', ColaboradorViewsSets)
router.register(r'fornecedores', FornecedorViewSets)
router.register(r'estoques', EstoqueViewsSets)
router.register(r'materiais', MaterialViewSets)
router.register(r'vendas', VendaViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('login/', UserLoginView.as_view(), name='user-login'),
    path('logout/', LogoutView.as_view(), name='user-logout'),
    path('gerar_pdf/', PDFView.as_view(), name='gerar_pdf'),
    path('entrada_estpque', EntradaDeEstoque.as_view(), name='entrada_estoque'),
    path('saida_estoque', SaidaDeEstoque.as_view(), name='saida_estoque'),
]
