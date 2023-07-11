from rest_framework import serializers
from apps.Tienda.models import Producto
from apps.Tienda.models import Usuario

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Producto
        fields = '__all__'

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = '__all__'

