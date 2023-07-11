document.getElementById('agregar-producto-form').addEventListener('submit', function(event) {
    event.preventDefault();  // Prevenir la acción por defecto del formulario
    
    // Obtener los datos del formulario
    const nombre = document.getElementById('nombre').value;
    const descripcion = document.getElementById('descripcion').value;
    const precio = document.getElementById('precio').value;
    const img_url = document.getElementById('img_url').value;
    
    // Crear un objeto con los datos del producto
    const productData = {
      nombre: nombre,
      descripcion: descripcion,
      precio: precio,
      img_url: img_url
    };
    
    // Realizar una solicitud POST para crear el producto
    fetch('/api/productos/crear/', {
      method: 'POST',
      body: JSON.stringify(productData),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        // Hacer algo con la respuesta del servidor
        console.log('Producto creado exitosamente:', data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  });
  