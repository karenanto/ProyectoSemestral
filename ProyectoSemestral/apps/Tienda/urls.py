from django.urls import path
from . import views


urlpatterns = [
    path('', views.cargarInicio),
    path('agregarProducto', views.cargarAgregarProducto),
    path('agregarProd',views.agregarProducto),
    path('editarProducto/<id>',views.cargarEditarProducto),
    path('editarProductoForm',views.editarProducto),
    path('eliminarProducto/<id>',views.eliminarProducto),
    path('carrito',views.carritoVentas)
    
]