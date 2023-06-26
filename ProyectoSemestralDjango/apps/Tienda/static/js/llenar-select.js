// DOM con el select de región //
const regionSelect= document.querySelector('#idRegion'); // Seleccionar el select de región mediante su ID.
document.addEventListener("DOMContentLoaded", obtenerRegion()) // Cuando se cargue la página, se ejecutará la función obtenerRegion().

// Consultar a la API por las regiones de Chile //
function obtenerRegion(){
    // Los headers permiten al cliente y al servidor realizar una petición o respuesta.
    var headers = new Headers();

    // X-CSCAPI-KEY es el nombre de la llave de acceso y el segudo argumento es el valor de la llave.
    headers.append("X-CSCAPI-KEY", "OXdVWHZIallMMmRMTmJPMkdvakVIWlBJNHd5dmRTZHRSbVVEZ0RwVQ==");

    // Se crea un objeto con los requerimientos de la petición.
    var requestOptions = {
        method: 'GET', // GET significa que se está solicitando información, y traerá un resultado.
        headers: headers, // Se añaden los argumentos del objeto headers (llave-valor).
        redirect: 'follow' // Tipo de direccionamiento (?).
    };

    // Mediante el fetch, haremos la petición con los requerimientos especificados y traerá un array con objetos para ser recorrido.
    fetch("https://api.countrystatecity.in/v1/countries/CL/states", requestOptions)
        .then(respuesta => respuesta.ok? respuesta.json(): Promise.reject(respuesta)) // Transformamos el array de objetos en formato JSON.
        .then(resultado => listarRegion(resultado)) // Pasamos el array convertido a la función listarRegion().
        .catch(error => {console.log('Error: ', error)}); // En el caso de que la consulta retorne un error, se imprimirá en la consola el error.
}

// Llenar el select de región con la consulta realizada //
function listarRegion(regiones){
    const llenar=document.querySelector('#idRegion'); // Se selecciona nuevamente el select de región.
    let texto= '<option value="0">Seleccione Región</option>'; // Se crea un string que contiene la primera opción que se visualizará.
    regiones.forEach(reg => { // Con el forEach recorreremos el JSON por medio de reg, que tomará el valor de cada objeto del JSON.
        const { name, iso2 }=reg; // Se seleccionan las llaves del JSON que se necesitarán y se le asignan al objeto reg. Name es el nombre de la región e iso2 es su sigla.
        texto +=`<option value="${iso2}">${name}</option>\n`; // Se irá añadiendo en el texto cada opción, el value tomará el valor de la sigla de la región.
    })
    llenar.innerHTML = texto; // Se reemplará lo que anteriormente contenía el select con el texto que se hizo anteriormente.
}

// DOM con el select de comuna //
const comunaSelect= document.querySelector('#idComuna'); // Seleccionar el select de comuna mediante su ID.
regionSelect.addEventListener("change", ( () =>obtenerComuna(regionSelect.value))); // Se creará un evento que recupere la sigla de la región seleccionada para pasárselo a la función listarComuna(). 

// Consultar a la API por las comunas de Chile según la región anteriormente seleccionada //
function obtenerComuna(RG){
    // Los headers permiten al cliente y al servidor realizar una petición o respuesta.
    var headers = new Headers();

    // X-CSCAPI-KEY es el nombre de la llave de acceso y el segudo argumento es el valor de la llave.
    headers.append("X-CSCAPI-KEY", "OXdVWHZIallMMmRMTmJPMkdvakVIWlBJNHd5dmRTZHRSbVVEZ0RwVQ==");

    // Se crea un objeto con los requerimientos de la petición.
    var requestOptions = {
        method: 'GET', // GET significa que se está solicitando información, y traerá un resultado.
        headers: headers, // Se añaden los argumentos del objeto headers (llave-valor).
        redirect: 'follow' // Tipo de direccionamiento (?).
    };

    // Mediante el fetch, haremos la petición con los requerimientos especificados y traerá un array con objetos para ser recorrido.
    fetch(`https://api.countrystatecity.in/v1/countries/CL/states/${RG}/cities`, requestOptions)
        .then(respuesta => respuesta.json()) // Transformamos el array en formato JSON.
        .then(resultado => listarComuna(resultado)) // Pasamos el array convertido a la función listarComuna().
        .catch(error => console.log('Error: ', error)); // En el caso de que la consulta retorne un error, se imprimirá en la consola el error.
}

// Llenar el select de región con la consulta realizada //
function listarComuna(comunas){
    const llenar=document.querySelector('#idComuna'); // Se selecciona nuevamente el select de comuna.
    let texto= '<option value="0">Seleccione Comuna</option>\n'; // Se crea un string que contiene la primera opción que se visualizará.
    comunas.forEach(com => { // Con el forEach recorreremos el JSON por medio de com, que tomará el valor de cada objeto del JSON.
        const { id, name }=com; // Se seleccionan las llaves del JSON que se necesitarán y se le asignan al objeto com. ID es el id de la comuna y name es su nombre.
        texto +=`<option value="${id}">${name}</option>\n`; // Se irá añadiendo en el texto cada opción, el value tomará el valor del id de la comuna.
    })
    llenar.innerHTML = texto; // Se reemplará lo que anteriormente contenía el select con el texto que se hizo anteriormente.
}