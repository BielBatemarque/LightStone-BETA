from django.contrib import admin
from django.urls import path, include
from rest_framework import routers, serializers, viewsets
from usuarios.views import UserViewSet
from clientes.views import ClienteViewSet
from colaboradores.views import ColaboradorViewsSets



router = routers.DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'clientes', ClienteViewSet)
router.register(r'colaboradores', ColaboradorViewsSets)


urlpatterns = [
    path('', include(router.urls)),
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
]
