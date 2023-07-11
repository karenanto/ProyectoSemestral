fetch('api/productos/')
  .then(response => response.json())
  .then(data => {
    const productTableBody = document.querySelector('#tabla-productos tbody');
    
    // Recorrer los productos y generar las filas de la tabla
    data.forEach(producto => {
      const row = document.createElement('tr');
      row.id = 'producto-row-' + producto.id; //identificación de la fila
      // Celdas de la tabla con los detalles del producto
      const idCell = document.createElement('td');
      idCell.textContent = producto.id;
      row.appendChild(idCell);
      
      const nameCell = document.createElement('td');
      nameCell.textContent = producto.name;
      row.appendChild(nameCell);
      
      const priceCell = document.createElement('td');
      priceCell.textContent = producto.price;
      row.appendChild(priceCell);
      
      const descriptionCell = document.createElement('td');
      descriptionCell.textContent = producto.description;
      row.appendChild(descriptionCell);
      
      const stockCell = document.createElement('td');
      stockCell.textContent = producto.stock;
      row.appendChild(stockCell);
      
      const imageCell = document.createElement('td');
      const imageElement = document.createElement('img');
      imageElement.src = producto.img_url;
      imageElement.alt = producto.name;
      imageCell.appendChild(imageElement);
      row.appendChild(imageCell);
      
      const actionsCell = document.createElement('td');
      
      // Botón de eliminar
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Eliminar';
      deleteButton.addEventListener('click', function() {
        // Lógica para eliminar el producto
        deleteProduct(producto.id);
      });
      actionsCell.appendChild(deleteButton);
      
      // Botón de actualizar
      const updateButton = document.createElement('button');
      updateButton.textContent = 'Actualizar';
      updateButton.addEventListener('click', function() {
        // Lógica para actualizar el producto
        updateProduct(producto.id);
      });
      actionsCell.appendChild(updateButton);
      
      row.appendChild(actionsCell);
      
      productTableBody.appendChild(row);
    });
  })
  .catch(error => {
    console.error('Error:', error);
  });

  function deleteProduct(productoId) {
    const confirmed = confirm('¿Estás seguro de que deseas eliminar este producto?');
    
    if (confirmed) {
      fetch(`/api/productos/${productoId}/eliminar/`, {
        method: 'DELETE',
      })
        .then(response => {
          if (response.ok) {
            // Eliminación exitosa
            console.log('Producto eliminado exitosamente');
            // Eliminar el producto de la tabla o realizar acciones adicionales según tus necesidades
            $('#producto-row-' + productoId).remove();
          } else {
            // Error al eliminar el producto
            console.error('Error al eliminar el producto');
          }
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }
  }
  
  function updateProduct(productoId) {
    // Redirigir al usuario
    window.location.href = `/editarProducto/?id=${productoId}`;
  }
  
