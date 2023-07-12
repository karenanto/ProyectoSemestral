const carrito = document.querySelector('#carrito');
const listaProductos = document.querySelector('#lista-productos');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito')
let articulosCarrito = [];

cargarEventListeners();
function cargarEventListeners(){
    listaProductos.addEventListener('click', agregarProducto);
    carrito.addEventListener('click', eliminarProducto);
    document.addEventListener('DOMContentLoaded', ()=>{
        articulosCarrito=JSON.parse(localStorage.getItem('carrito')) ||  [];
        carritoHTML();
    });
    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito=[];
        sincronizarStorage();
        limpiarHTML();
    })

}

function agregarProducto(e){
    e.preventDefault();

    if (e.target.classList.contains('agregar-carrito')){
        const productoSeleccionado= e.target.parentElement.parentElement;
        leerDatosProducto(productoSeleccionado);
    }
}

function eliminarProducto(e){
    e.preventDefault();

    if (e.target.classList.contains('borrar-producto')){
        const productoId= e.target.getAttribute('data-id');
        articulosCarrito=articulosCarrito.filter(producto => producto.id !== productoId);
        carritoHTML();
    }
}

function leerDatosProducto(producto){
    const infoProducto ={
        imagen: producto.querySelector('img').src,
        titulo: producto.querySelector('h4').textContent,
        precio: producto.querySelector('.precio span').textContent,
        id: producto.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }
    
    const existe=articulosCarrito.some(producto => producto.id === infoProducto.id)
    if(existe){
        const productos = articulosCarrito.map( producto => {
            if(producto.id===infoProducto.id){
                producto.cantidad++;
                return producto;
            }
            else{
                return producto;
            }
        })
    }
    else{
        articulosCarrito = [...articulosCarrito, infoProducto];
    }
    
    carritoHTML();
}
    


function carritoHTML(){
    limpiarHTML();
    let total=0;
    articulosCarrito.forEach( producto => {
        const {imagen, titulo, precio, cantidad, id} = producto;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src="${imagen}" width=100></td>
            <td>${titulo}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td><a href="#" class="borrar-producto" data-id="${producto.id}">X</a></td>
        `;
        contenedorCarrito.appendChild(row);
        const valor=parseInt(precio.slice(1, 3));
        total=total+valor*cantidad;
        const totalCompra=document.getElementById('totalCompra');
        totalCompra.innerHTML=`<h4 id="totalCompra">Total: $ ${total}</h4>`;
    });
    
    sincronizarStorage();
}

function sincronizarStorage(){
    localStorage.setItem('carrito', JSON.stringify(articulosCarrito));
}

function limpiarHTML(){
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
    const totalCompra=document.getElementById('totalCompra');
    totalCompra.innerHTML=`<h4 id="totalCompra">Total: $ 0</h4>`;
}

// Escuchar el evento de clic en los botones "Agregar al Carrito"
const agregarCarritoButtons = document.querySelectorAll('.agregar-carrito');
agregarCarritoButtons.forEach(button => {
    button.addEventListener('click', function(event) {
        event.preventDefault();
        const productId = button.getAttribute('data-id');
        const producto = {
            id: productId,
            nombre: button.parentElement.querySelector('.card-title').textContent,
            descripcion: button.parentElement.querySelector('.card-text').textContent,
            precio: button.parentElement.querySelector('.card-text').textContent.split(':')[1].trim(),
            img_url: button.parentElement.parentElement.querySelector('.card-img-top').getAttribute('src')
        };
        // Obtener los productos existentes en el localStorage
        const productosEnCarrito = JSON.parse(localStorage.getItem('carrito')) || [];
        // Verificar si el producto ya está en el carrito
        const productoExistente = productosEnCarrito.find(item => item.id === productId);
        if (productoExistente) {
            // Si el producto ya existe, puedes mostrar un mensaje o realizar alguna otra acción
            console.log('El producto ya está en el carrito');
        } else {
            // Agregar el producto al carrito
            productosEnCarrito.push(producto);
            // Guardar los productos en el localStorage
            localStorage.setItem('carrito', JSON.stringify(productosEnCarrito));
            // Mostrar un mensaje de éxito o realizar alguna otra acción
            console.log('El producto se agregó al carrito');
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const carritoRow = document.getElementById('carrito-row');
    const productosEnCarrito = JSON.parse(localStorage.getItem('carrito')) || [];

    productosEnCarrito.forEach(producto => {
        const card = document.createElement('div');
        card.classList.add('col-md-4');

        const cardContent = document.createElement('div');
        cardContent.classList.add('card');

        // Agregar contenido de la tarjeta (nombre, descripción, precio, imagen, etc.)
        cardContent.innerHTML = `
            <img src="${producto.img_url}" class="card-img-top" alt="${producto.nombre}">
            <div class="info-card">
                <h5 class="card-title">${producto.nombre}</h5>
                <p class="card-text">${producto.descripcion}</p>
                <p class="card-text">Precio: ${producto.precio}</p>
                <a href="#" class="u-full-width button-primary button input eliminar-carrito" data-id="${producto.id}">Eliminar del Carrito</a>
            </div>
        `;

        card.appendChild(cardContent);
        carritoRow.appendChild(card);
    });

    // Agregar evento de clic a los botones "Eliminar del Carrito"
    const eliminarCarritoButtons = document.querySelectorAll('.eliminar-carrito');
    eliminarCarritoButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault();
            const productId = button.getAttribute('data-id');
            eliminarProductoDelCarrito(productId);
            // Eliminar la card correspondiente del DOM
            button.parentElement.parentElement.remove();
        });
    });
});

function eliminarProductoDelCarrito(productId) {
    const productosEnCarrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const productosFiltrados = productosEnCarrito.filter(producto => producto.id !== productId);
    localStorage.setItem('carrito', JSON.stringify(productosFiltrados));
}

document.addEventListener('DOMContentLoaded', function() {
    const carritoRow = document.getElementById('carrito-row');
    const carritoCantidad = document.getElementById('carrito-cantidad');
    const carritoTotal = document.getElementById('carrito-total');
    const btnComprar = document.getElementById('btn-comprar');

    actualizarCarrito();

    btnComprar.addEventListener('click', function() {
        realizarCompra();
        actualizarCarrito();
    });

    function actualizarCarrito() {
        const productosEnCarrito = JSON.parse(localStorage.getItem('carrito')) || [];
        let cantidadTotal = 0;
        let totalCompra = 0;

        carritoRow.innerHTML = '';

        productosEnCarrito.forEach(producto => {
            const card = document.createElement('div');
            // Código para crear la card del producto

            carritoRow.appendChild(card);

            cantidadTotal += 1;
            totalCompra += producto.precio;
        });

        carritoCantidad.textContent = `Cantidad de productos: ${cantidadTotal}`;
        carritoTotal.textContent = `Total de la compra: ${totalCompra} USD`;
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const btnComprar = document.getElementById('btn-comprar');

    btnComprar.addEventListener('click', function() {
        const productosEnCarrito = JSON.parse(localStorage.getItem('carrito')) || [];

        // Verificar el stock antes de procesar la compra
        const stockSuficiente = productosEnCarrito.every(producto => producto.stock > 0);

        if (stockSuficiente) {
            // Restar el stock y procesar la compra
            productosEnCarrito.forEach(producto => {
                producto.stock -= 1;
                // Aquí puedes realizar cualquier otra lógica relacionada con la compra, como actualizar la base de datos, generar una orden, etc.
            });

            // Actualizar los productos en el localStorage
            localStorage.setItem('carrito', JSON.stringify(productosEnCarrito));

            // Realizar cualquier acción adicional, como redireccionar a una página de confirmación de compra, mostrar un mensaje, etc.
            console.log('Compra realizada con éxito');
        } else {
            // Mostrar un mensaje de error o tomar alguna otra acción en caso de que el stock no sea suficiente
            console.log('No hay suficiente stock para realizar la compra');
        }
    });
});