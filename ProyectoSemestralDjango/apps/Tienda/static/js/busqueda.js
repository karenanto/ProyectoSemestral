// Controlador de eventos para el formulario de búsqueda
document.getElementById('search-form').addEventListener('submit', function(event) {
  event.preventDefault();  // Prevenir la acción por defecto del formulario
  const searchTerm = document.getElementById('search-input').value;
  // Realizar la búsqueda y mostrar los resultados en otra página
  window.location.href = `/resultadosBusqueda/?search=${searchTerm}`;
});

// Lógica de búsqueda
document.addEventListener('DOMContentLoaded', function() {
  const searchResultsContainer = document.getElementById('search-results');
  const urlParams = new URLSearchParams(window.location.search);
  const searchTerm = urlParams.get('search');

  fetch(`/api/productos/?search=${searchTerm}`)
    .then(response => response.json())
    .then(data => {
      // Recorrer los resultados de la búsqueda
      data.forEach(producto => {
        const card = document.createElement('div');
        card.classList.add('card');

        const cardContent = document.createElement('div');
        cardContent.classList.add('card-content');

        // Agregar contenido de la tarjeta (nombre, descripción, precio, etc.)
        cardContent.innerHTML = `
          <h3>${producto.nombre}</h3>
          <p>${producto.descripcion}</p>
          <p>Precio: ${producto.precio}</p>
          <img src="${producto.img_url}" alt="${producto.nombre}">
        `;

        const detailsLink = document.createElement('a');
        detailsLink.href = `/detalleProducto/?id=${producto.id}`;
        detailsLink.textContent = 'Ver detalles';

        cardContent.appendChild(detailsLink);
        card.appendChild(cardContent);
        searchResultsContainer.appendChild(card);
      });
    })
    .catch(error => {
      console.error('Error:', error);
    });
});