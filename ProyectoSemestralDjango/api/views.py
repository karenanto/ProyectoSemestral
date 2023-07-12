from django.shortcuts import get_object_or_404, redirect
#from rest_framework import generics
from apps.Tienda.models import Producto, Carrito
from .serializers import ProductSerializer
from django.http import JsonResponse
# Create your views here.

def listar_productos(request):
    producto = Producto.objects.all()
    serializer = ProductSerializer(Producto, many=True)
    return JsonResponse(serializer.data, safe=False)

def detalle_producto(request, pk):
    producto = get_object_or_404(Producto, pk=pk)
    serializer = ProductSerializer(producto)
    return JsonResponse(serializer.data)

def crear_producto(request):
    if request.method == 'POST':
        serializer = ProductSerializer(data=request.POST)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)

def actualizar_producto(request, pk):
    producto= get_object_or_404(Producto, pk=pk)
    if request.method == 'PUT':
        serializer = ProductSerializer(producto, data=request.PUT)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer._errors, status=400)

def eliminar_producto(request, pk):
    producto = get_object_or_404(Producto, pk=pk)
    if request.method == 'DELETE':
        producto.delete()
        return JsonResponse({'Producto eliminado exitosamente'}, status=204)
    return JsonResponse({'Solicitud inválida'}, status=400)
