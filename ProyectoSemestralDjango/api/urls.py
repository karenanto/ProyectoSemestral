from django.urls import path
from .views import listar_productos, detalle_producto, crear_producto, actualizar_producto, eliminar_producto

urlpatterns = [
    path('productos/', listar_productos, name='lista-productos'),
    path('productos/<int:pk>/', detalle_producto, name='detalle-producto'),
    path('productos/crear/', crear_producto, name='crear-producto'),
    path('productos/<int:pk>/actualizar/', actualizar_producto, name='actualizar-producto'),
    path('productos/<int:pk>/eliminar/', eliminar_producto, name='eliminar-producto')
]
