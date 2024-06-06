let cantidad;
let precioUnitario;
let total;

function calcular() {
    // Obtener los valores de los campos de entrada
    let cantidad = parseFloat(document.getElementById("CnPivot").value);
    let precioUnitario = parseFloat(document.getElementById("PrPivot").value);

    // Calcular el total
    let total = cantidad * precioUnitario;

    // Mostrar el resultado en la consola
    console.log(total);

    // Asignar el resultado al campo de salida
    document.getElementById("TnPivot").value = total;
}
