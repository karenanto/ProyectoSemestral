$(document).ready(function() {
    $("form").submit(function(event) {
      // Prevenir el envío del formulario
      event.preventDefault();
      
      // Validar el campo de nombre completo
      var name = $("input[name='nombre_completo']").val();
      if (name == "") {
        alert("Por favor ingrese su nombre completo.");
        return false;
      }
      
      // Validar el campo de email
      var email = $("input[name='email']").val();
      if (email == "") {
        alert("Por favor ingrese su correo electrónico.");
        return false;
      }
      
      // Validar los campos de fecha de nacimiento
      var day = $("input[name='dob_day']").val();
      var month = $("input[name='dob_month']").val();
      var year = $("input[name='dob_year']").val();
      var date = new Date(year, month - 1, day);
      if (isNaN(date.getTime())) {
        alert("Por favor ingrese una fecha de nacimiento válida.");
        return false;
      }
      
      // Validar el campo de número de tarjeta
      var cardNumber = $("input[name='card_number']").val();
      if (cardNumber == "") {
        alert("Por favor ingrese el número de su tarjeta de crédito.");
        return false;
      }
      
      // Validar el campo de CVC
      var cvc = $("input[name='cvc']").val();
      if (cvc == "") {
        alert("Por favor ingrese el código CVC de su tarjeta de crédito.");
        return false;
      }
      
      // Validar los campos de mes y año de caducidad
      var expirationMonth = $("select[name='expiration_month']").val();
      var expirationYear = $("select[name='expiration_year']").val();
      if (expirationMonth == "0" || expirationYear == "0") {
        alert("Por favor seleccione la fecha de caducidad de su tarjeta de crédito.");
        return false;
      }
      
      // Si todas las validaciones pasan, enviar el formulario
      alert("¡Formulario enviado correctamente!");
      $("form")[0].submit();
    });
  });
  