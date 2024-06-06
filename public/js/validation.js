const nombre = document.getElementById("nombre");
const empresa = document.getElementById("empresa");
const correo = document.getElementById("email");
const telefono = document.getElementById("tel");
const mensaje = document.getElementById("mensaje");
const terminos = document.getElementById("terminos");
const alertNombre = document.querySelector('.alert-nombre');
//primer rudimiento de validacion, falta trabajo de hacerlo mas funcional. Por el momento solo valida longitud del texto ingresado, estoy trabajando en la validacion de tipo
nombre.addEventListener("blur", () => {
  let nombreValue = nombre.value;
  let length = nombreValue.length;
  if (nombreValue === "") {
    alert("el campo no puede estar vacio");
  } else if (length > 20) {
    alert("el campo no puede contener mas de 20 caracteres");
  } else if (length < 3) {
    alert("el campo no puede contener menos de 3 caracteres");
  }
});

empresa.addEventListener("blur", () => {
  let empresaValue = empresa.value;
  let length = empresaValue.length;
  if (empresaValue === "") {
    alert("el campo no puede estar vacio");
  } else if (length > 20) {
    alert("el campo no puede contener mas de 20 caracteres");
  } else if (length < 3) {
    alert("el campo no puede contener menos de 3 caracteres");
  }
});

correo.addEventListener("blur", () => {
  let correoValue = correo.value;
  let length = correoValue.length;
  if (correoValue === "") {
    alert("el campo no puede estar vacio");
  } else if (length > 20) {
    alert("el campo no puede contener mas de 20 caracteres");
  } else if (length < 3) {
    alert("el campo no puede contener menos de 3 caracteres");
  }
});

telefono.addEventListener("blur", () => {
  let telefonoValue = telefono.value;
  let length = telefonoValue.length;
  if (telefonoValue === "") {
    alert("el campo no puede estar vacio");
  } else if (length > 20) {
    alert("el campo no puede contener mas de 20 caracteres");
  } else if (length < 10) {
    alert("el campo no puede contener menos de 10 caracteres");
  }
});

mensaje.addEventListener("blur", () => {
  let mensajeValue = mensaje.value;
  let length = mensajeValue.length;
  if (mensajeValue === "") {
    alert("el campo no puede estar vacio");
  } else if (length > 1000) {
    alert("el campo no puede contener mas de 1000 caracteres");
  } else if (length < 5) {
    alert("el campo no puede contener menos de 5 caracteres");
  }
});
