
from django.urls import path, include
from . import views
from .views import procesar_compra
from django.contrib.auth import views as auth_views

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
    path('agregarProducto/', views.cargarAgregarProducto),
    path('cerrar-sesion/', auth_views.LogoutView.as_view(), name='cerrar-sesion'),
    path('agregar-al-carrito/<int:producto_id>/', views.agregar_al_carrito, name='agregar-al-carrito'),
    path('api/', include('api.urls'))

]
