from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from usuarios.views import UserViewSet
from clientes.views import ClienteViewSet, ValidaCPF
from colaboradores.views import ColaboradorViewsSets, CargoViewSets
from fornecedores.views import FornecedorViewSets
from Estoque.views import EstoqueViewsSets, EntradaDeEstoque, SaidaDeEstoque, MovimentacaoDeEstoqueViewsSets
from materiais.views import MaterialViewSets
from usuarios.views import UserLoginView, LogoutView
from vendas.views import VendaViewSet
from relatorios.views import PDFView, PDFOrcamentoView, DashboardVIew
from pecas.views import PecasViewSets
from orcamentos.views import OrcamentoViewSet

router = routers.DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'clientes', ClienteViewSet)
router.register(r'colaboradores', ColaboradorViewsSets)
router.register(r'fornecedores', FornecedorViewSets)
router.register(r'estoques', EstoqueViewsSets)
router.register(r'materiais', MaterialViewSets)
router.register(r'vendas', VendaViewSet)
router.register(r'movimentacoes_estoque', MovimentacaoDeEstoqueViewsSets)
router.register(r'pecas', PecasViewSets)
router.register(r'orcamentos', OrcamentoViewSet)
router.register(r'cargos', CargoViewSets)

urlpatterns = [
    path('', include(router.urls)),
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('login/', UserLoginView.as_view(), name='user-login'),
    path('logout/', LogoutView.as_view(), name='user-logout'),
    path('gerar_pdf/', PDFView.as_view(), name='gerar_pdf'),
    path('gerar_pdf_orcamentos/', PDFOrcamentoView.as_view(), name="gerar_pdf_orcamento"),
    path('entrada_estoque/<int:estoque_id>/', EntradaDeEstoque.as_view(), name='entrada_estoque'),
    path('saida_estoque/<int:estoque_id>/', SaidaDeEstoque.as_view(), name='saida_estoque'),
    path('valida_cpf', ValidaCPF.as_view(), name="valida_cpf"),
    path('dashboardView/', DashboardVIew.as_view(), name="dados_dashboard")
]
