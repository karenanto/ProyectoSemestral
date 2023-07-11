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