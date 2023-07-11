
from django.urls import path, include
from . import views
from .views import procesar_compra


urlpatterns = [
    path ('', views.CargarInicio),
    path ('carrito', views.CargarCarrito),
    path('catalogo',views.CargarCatalogo),
    path('home',views.CargarHome),
    path('login',views.CargarLogin, name='login'),
    path('formpago',views.CargarPago),
    path('registro',views.cargarRegistro),
    path('editarProducto/', views.cargarEditarProducto),
    path('listarProductos/', views.cargarListarProductos),
    path('resultadosBusqueda/', views.cargarResultadosBusqueda),
    path('detalleProducto/', views.cargarDetalleProducto),
    path('api/', include('api.urls'))

]
