from django.shortcuts import render
from django.shortcuts import get_object_or_404, redirect
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

def cargarAgregarProducto(request):
    return render(request="agregarProducto.html")


def procesar_compra(request, id_producto):
    producto = get_object_or_404(Producto, id=id_producto)

    if producto.stock > 0:
        producto.stock -= 1
        producto.save()

        return JsonResponse({'message': 'Compra exitosa'})
    else:
        return JsonResponse({'message': 'No hay stock disponible'})
    
def catalogo(request):
    productos = Producto.objects.filter(stock__gt=0)
    return render(request, 'catalogo.html', {'productos': productos})

def agregar_al_carrito(request, producto_id):
    # Obtener el producto correspondiente al ID
    producto = get_object_or_404(Producto, id=producto_id)
    
    # Obtener o crear el carrito del usuario actual
    carrito, _ = Carrito.objects.get_or_create(usuario=request.user)
    
    # Agregar el producto al carrito
    carrito.productos.add(producto)
    
    # Actualizar el total y la cantidad del carrito
    carrito.actualizar_total()
    carrito.actualizar_cantidad()
    
    # Redireccionar a la página de catálogo o a donde desees
    return redirect('catalogo')