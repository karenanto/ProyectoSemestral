# Generated by Django 4.2.2 on 2023-07-08 03:59

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Producto',
            fields=[
                ('id_producto', models.IntegerField(primary_key=True, serialize=False)),
                ('nombre', models.CharField(max_length=50)),
                ('precio', models.IntegerField()),
                ('descripcion', models.CharField(max_length=150)),
                ('stock', models.IntegerField(default=0)),
                ('img_url', models.ImageField(upload_to='imagenesProducto')),
            ],
        ),
        migrations.CreateModel(
            name='tpUsuario',
            fields=[
                ('id_tpUsuario', models.IntegerField(primary_key=True, serialize=False)),
                ('nombre_tpUsuario', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='Usuario',
            fields=[
                ('id_usuario', models.IntegerField(primary_key=True, serialize=False)),
                ('nombre', models.CharField(max_length=50)),
                ('apellido', models.CharField(max_length=50)),
                ('correo', models.CharField(max_length=50)),
                ('contrasena', models.CharField(max_length=20)),
                ('tpusuario_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Tienda.tpusuario')),
            ],
        ),
        migrations.CreateModel(
            name='Compra',
            fields=[
                ('id_compra', models.IntegerField(primary_key=True, serialize=False)),
                ('fecha_compra', models.DateField(auto_now_add=True)),
                ('cantidad', models.IntegerField()),
                ('total', models.IntegerField()),
                ('id_producto', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Tienda.producto')),
            ],
        ),
    ]
