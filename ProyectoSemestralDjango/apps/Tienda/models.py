from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Producto(models.Model):
    id_producto = models.IntegerField(primary_key=True)
    nombre = models.CharField(max_length=50,null=False)
    precio = models.IntegerField(null=False)
    descripcion = models.CharField(max_length=150 ,null=False)
    stock = models.IntegerField(default=0)
    img_url = models.ImageField(upload_to='imagenesProducto')

    def __str__(self):
        return self.get_display_string()

    def get_display_string(self):
        return f"Producto: {self.nombre},Descripcion:{self.descripcion} ,Precio: {self.precio}"

class tpUsuario(models.Model):
    id_tpUsuario = models.IntegerField(primary_key=True)
    nombre_tpUsuario = models.CharField(max_length=50,null=False)

class Usuario(models.Model):
    id_usuario = models.IntegerField(primary_key=True)
    tpusuario_id = models.ForeignKey(tpUsuario,on_delete=models.CASCADE)
    nombre = models.CharField(max_length=50,null=False)
    apellido = models.CharField(max_length=50,null=False)
    correo = models.CharField(max_length=50,null=False)
    contrasena = models.CharField(max_length=20,null=False)

class Compra(models.Model):
    id_compra = models.IntegerField(primary_key=True)
    fecha_compra = models.DateField(auto_now_add=True)
    id_producto= models.ForeignKey(Producto,on_delete=models.CASCADE)
    cantidad =  models.IntegerField(null=False)
    total =  models.IntegerField(null=False)

class Carrito(models.Model):
    usuario = models.OneToOneField(User, on_delete=models.CASCADE)
    productos = models.ManyToManyField('Producto')
    total = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    cantidad = models.PositiveIntegerField(default=0)

    def actualizar_total(self):
        self.total = sum(producto.precio for producto in self.productos.all())
        self.save()

    def actualizar_cantidad(self):
        self.cantidad = self.productos.count()
        self.save()

    def __str__(self):
        return f"Carrito de {self.usuario.username}"