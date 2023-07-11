from django.shortcuts import get_object_or_404
#from rest_framework import generics
from apps.Tienda.models import Producto
from .serializers import ProductSerializer
from apps.Tienda.models import Usuario
from .serializers import UsuarioSerializer
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

def crearUsuario(request):
    if request.method == 'POST':
        serializer =  UsuarioSerializer(data=request.POST)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)

def actualizarUsuario(request, pk):
    usuario= get_object_or_404(Usuario, pk=pk)
    if request.method == 'PUT':
        serializer = UsuarioSerializer(usuario, data=request.PUT)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer._errors, status=400)

def eliminarUsuario(request, pk):
    producto = get_object_or_404(Usuario, pk=pk)
    if request.method == 'DELETE':
        usuario.delete()
        return JsonResponse({'Usuario eliminado exitosamente'}, status=204)
    return JsonResponse({'Solicitud inválida'}, status=400)

def listarUsuario(request):
    usuario = Usuario.objects.all()
    serializer = UsuarioSerializer(Usuario, many=True)
    return JsonResponse(serializer.data, safe=False)
