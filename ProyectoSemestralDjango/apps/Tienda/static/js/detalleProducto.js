// detalleProducto.js
document.addEventListener('DOMContentLoaded', function() {
  const productDetailsContainer = document.getElementById('product-details');
  const addToCartButton = document.getElementById('add-to-cart');

  // Obtén el ID del producto de los parámetros de consulta en la URL
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id');

  // Realiza una solicitud a la API para obtener los detalles del producto
  fetch(`/api/productos/${productoId}/`)
    .then(response => response.json())
    .then(producto => {
      // Crea elementos HTML para mostrar los detalles del producto
      const productName = document.createElement('h2');
      productName.textContent = producto.nombre;

      const productDescription = document.createElement('p');
      productDescription.textContent = producto.descripcion;

      const productPrice = document.createElement('p');
      productPrice.textContent = `Precio: ${producto.precio}`;

      const productImage = document.createElement('img');
      productImage.src = producto.img_url;
      productImage.alt = producto.nombre;

      // Agrega los elementos al contenedor de detalles del producto
      productDetailsContainer.appendChild(productName);
      productDetailsContainer.appendChild(productDescription);
      productDetailsContainer.appendChild(productPrice);
      productDetailsContainer.appendChild(productImage);

      // Agrega un controlador de eventos al botón de "Agregar al carrito"
      addToCartButton.addEventListener('click', function() {
        // Lógica para agregar el producto al carrito de compras
        // Puedes implementar aquí la funcionalidad de tu carrito de compras
        console.log('Producto agregado al carrito:', producto);
      });
    })
    .catch(error => {
      console.error('Error:', error);
    });
});
