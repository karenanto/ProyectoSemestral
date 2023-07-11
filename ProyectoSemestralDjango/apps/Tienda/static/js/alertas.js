$(document).ready(function() {
  $('form').submit(function(e) {
      e.preventDefault();

      // Obtener los valores del formulario
      var username = $('#username').val();
      var email = $('#email').val();
      var password = $('#password').val();
      var confirmPassword = $('#confirmar_contraseña').val();

      // Validar los valores del formulario
      if (username === '' || email === '' || password === '' || confirmPassword === '') {
          // Mostrar mensaje de error si no es inicio de sesión
          if ($(this).hasClass('login-form')) {
              $('#message-container').html('');
          } else {
              $('#message-container').html(`
                  <div class="alert alert-danger" role="alert">
                      Todos los campos son obligatorios.
                  </div>
              `);
          }
      } else if (password !== confirmPassword) {
          // Mostrar mensaje de error si no es inicio de sesión
          if ($(this).hasClass('login-form')) {
              $('#message-container').html('');
          } else {
              $('#message-container').html(`
                  <div class="alert alert-danger" role="alert">
                      Las contraseñas no coinciden.
                  </div>
              `);
          }
      } else if (!$(this).hasClass('login-form')) {
          // Mostrar mensaje de éxito si no es inicio de sesión
          $('#message-container').html(`
              <div class="alert alert-success" role="alert">
                  Registro exitoso. ¡Bienvenido, ${username}!
              </div>
          `);
      }
  });
});



$(document).ready(function() {
    $('form').submit(function(event) {
      event.preventDefault();
  
      // Obtén los valores del usuario y la contraseña
      var usuario = $('#usuario').val();
      var contraseña = $('#contraseña').val();
  
      // Lógica para validar el inicio de sesión
      if (usuario === 'admin' && contraseña === 'admin123') {
        mostrarToast('success', 'Inicio de sesión exitoso');
      } else {
        mostrarToast('error', 'Credenciales incorrectas');
      }
  
      // Restablecer los campos del formulario
      $('form')[0].reset();
    });
  
    function mostrarToast(type, message) {
      var toastClass = 'bg-primary';
      if (type === 'error') {
        toastClass = 'bg-danger';
      } else if (type === 'success') {
        toastClass = 'bg-success';
      }
  
      var toast = $('<div class="toast" role="alert" aria-live="assertive" aria-atomic="true">')
        .addClass(toastClass)
        .text(message);
  
      $('#message-container').append(toast);
  
      // Mostrar y luego ocultar el Toast
      toast.toast({ delay: 3000 }).toast('show');
  
      // Eliminar el Toast después de ocultarlo
      toast.on('hidden.bs.toast', function() {
        $(this).remove();
      });
    }
  });