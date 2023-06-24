from django.shortcuts import render, redirect
from .models import *
from django.conf import settings
import os
from django.http import HttpResponse
import json

# Create your views here.

def cargarInicio(request):
    productos = Producto.objects.all()
    cate_perro = Producto.objects.filter(categoria_id = 1)
    cate_gato = Producto.objects.filter(categoria_id = 20)
    return render(request, "inicio.html", {"prod":productos, "categoria_dog": cate_perro, "categoria_cat":cate_gato})

def cargarAgregarProducto(request):
    categorias  = Categoria.objects.all()
    productos = Producto.objects.all()
    return render(request,"agregarProductos.html", {"cate":categorias, "prod":productos})




def agregarProducto(request):
    print(request.POST)
    v_sku = request.POST['txtSku']
    v_nombre = request.POST['txtNombre']
    v_precio = request.POST['txtPrecio']
    v_stock = request.POST['txtStock']
    v_descripcion = request.POST['txtDescripcion']
    v_img = request.FILES['txtImg']
    

    categoria = Categoria.objects.get(id_categoria = request.POST['cmbCategoria'])
    
    Producto.objects.create(
        id_producto = v_sku , 
        nombre = v_nombre , 
        precio = v_precio, 
        stock = v_stock,
        descripcion = v_descripcion,
        img_url = v_img, 
        categoria_id = categoria)


    return redirect('/agregarProducto')


def cargarEditarProducto(request,id):

    producto = Producto.objects.get(id_producto = id)
    categorias = Categoria.objects.all()


    categoriaId = producto.categoria_id

    productoCategoriaId = Categoria.objects.get(id_categoria = categoriaId.id_categoria).id_categoria

    return render(request,"editarProducto.html",{"prod":producto,"cate":categorias, "categoriaId":productoCategoriaId})




def editarProducto(request):
    v_sku = request.POST['txtSku']
    productoBD = Producto.objects.get(id_producto = v_sku)
    v_nombre = request.POST['txtNombre']
    v_precio = request.POST['txtPrecio']
    v_stock = request.POST['txtStock']
    v_descripcion = request.POST['txtDescripcion']
    v_categoria = Categoria.objects.get(id_categoria = request.POST['cmbCategoria'])

    try:
        v_img = request.FILES['txtImg']
        ruta_imagen  = os.path.join(settings.MEDIA_ROOT, str(productoBD.img_url))
        os.remove(ruta_imagen)
    except:
        v_img = productoBD.img_url


    productoBD.nombre = v_nombre
    productoBD.precio = v_precio
    productoBD.stock = v_stock
    productoBD.descripcion = v_descripcion
    productoBD.categoria_id = v_categoria
    productoBD.img_url = v_img

    productoBD.save()


    return redirect('/agregarProducto')





def eliminarProducto(request,id):
    producto = Producto.objects.get(id_producto = id)
    producto.delete()
    ruta_imagen  = os.path.join(settings.MEDIA_ROOT, str(producto.img_url))
    os.remove(ruta_imagen)

    return redirect('/agregarProducto')



def carritoVentas(request):
    #print("Productos Carrito------>",request.body)
    data = json.loads(request.body)
    for p in data:
        print("SKU",p['sku'])
        print("CANTIDAD",p['cantidad'])

    return HttpResponse("Goood!!!")
