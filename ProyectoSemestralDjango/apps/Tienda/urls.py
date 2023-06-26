
from django.urls import path
from . import views

urlpatterns = [
    path ('', views.CargarInicio),
    path ('ejemplo', views.CargarEjemplo),
    path ('carrito', views.CargarCarrito)
]
