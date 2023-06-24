from django.shortcuts import render

from django.views import View
from apps.Tienda.models import Producto
from django.http import JsonResponse
# Create your views here.


class ObtenerProductos(View):
    def get(self,request):
        productos = Producto.objects.all()
        return JsonResponse(list(productos.values()),safe=False)