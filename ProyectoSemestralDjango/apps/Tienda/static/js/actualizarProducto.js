document.getElementById('editar-producto-form').addEventListener('submit', function(event) {
    event.preventDefault();  // Prevenir la acción por defecto del formulario
  
    // Obtener los nuevos valores del formulario
    const nombre = document.getElementById('nombre').value;
    const descripcion = document.getElementById('descripcion').value;
    const precio = document.getElementById('precio').value;
    const img_url = document.getElementById('img_url').value;
  
    // Obtener el ID del producto de los parámetros de consulta en la URL
    const urlParams = new URLSearchParams(window.location.search);
    const productoId = urlParams.get('productoId');
  
    // Realizar una solicitud AJAX para actualizar el producto
    fetch(`/api/productos/${productoId}/actualizar/`, {
      method: 'PUT',
      body: JSON.stringify({
        nombre: nombre,
        descripcion: descripcion,
        precio: precio,
        img_url: img_url
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (response.ok) {
          // Actualización exitosa
          console.log('Producto actualizado exitosamente');
          // Redireccionar a la página de lista de productos
          window.location.href = 'listarProductos/';
        } else {
          // Error al actualizar el producto
          console.error('Error al actualizar el producto');
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  });
  