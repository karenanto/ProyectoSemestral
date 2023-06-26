from django.shortcuts import render

def CargarInicio (request):
    return render (request,"inicio.html")

def CargarEjemplo (request):
    return render (request,"ejemplo.html")

def CargarCarrito (request):
    return render (request,"carrito.html")
# Create your views here.
