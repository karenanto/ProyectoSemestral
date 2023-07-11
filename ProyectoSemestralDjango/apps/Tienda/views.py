from django.shortcuts import render
from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from .models import *

def CargarInicio (request):
    return render (request,"inicio.html")

def CargarCarrito (request):
    return render (request,"carrito.html")
# Create your views here.

def CargarCatalogo(request):
    return render(request,"catalogo.html")

def CargarHome(request):
    return render(request,"inicio.html")

def CargarLogin(request):
    return render(request,"iniciarSesion.html")

def CargarPago(request):
    return render(request,"formpago.html")

def cargarRegistro(request):
    return render(request,'registro.html')

def cargarEditarProducto(request):
    return render(request='editarProducto.html')

def cargarListarProductos(request):
    return render(request="ListarProductos.html")

def cargarResultadosBusqueda(request):
    return render(request="resultadosBusqueda.html")

def cargarDetalleProducto(request):
    return render(request="detalleProducto.html")

def procesar_compra(request, id_producto):
    producto = get_object_or_404(Producto, id=id_producto)

    if producto.stock > 0:
        producto.stock -= 1
        producto.save()

        return JsonResponse({'message': 'Compra exitosa'})
    else:
        return JsonResponse({'message': 'No hay stock disponible'})
    
