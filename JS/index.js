//Mercancia
const precioPelucheZorroNegroGrande = 5000;
const precioPelucheZorroNegroMediano = 3125;
const precioPelucheZorroBlancoGrande = 5000;
const precioPelucheZorroBlancoMediano = 3125;
const PrecioPelucheCerdoRosaGrande = 3679;
const precioPelucheCuervoNegroMediano = 2910;
const precioPelucheArdillaMediana = 2739;
const precioPelucheDragonChinoMediano = 4571;

//Descuento e impuesto.
const porcentajeDeDescuento = 8;
const porcentajeDeImpuesto = 12;

function calcularDescuento(precio) {
  return precio * (porcentajeDeDescuento / 100);
}

function calcularImpuesto(precio) {
  return precio * (porcentajeDeImpuesto / 100);
}

//Cuentas para el valor total.

function calcularValorTotal(precio) {
  const impuesto = calcularImpuesto(precio);
  const Descuento = calcularDescuento(precio);
  const valorTotal = precio + impuesto - Descuento;
  return valorTotal;
}

let valida = false;

while (!valida) {
  alert(
    "Bienvenido a mi tienda de peluches. En esta ocasión contamos con un reducido stock, sin embargo, si desea seguir viendo los que hay en stock; te damos la más cálida bienvenida."
  );
  seleccion = parseInt(
    prompt(
      "Los productos dados a continuación son los que están en stock: \n 1.Un peluche de zorro negro tamaño grande \n 2.Un peluche de zorro negro tamaño mediano \n 3.Un peluche de zorro blanco tamañano grande \n 4.Un peluche de zorro blanco tamaño mediano \n 5.Un peluche de cerdo tamaño grande \n 6.Un peluche de un cuervo tamaño mediano \n 7.Un peluche de ardilla tamaño mediano \n 8.Un peluche de dragon chino tamaño mediano \n Basado en el peluche que usted eligió, por favor, coloque el número correspondiente."
    )
  );
  if (seleccion == 1) {
    valorTotal = calcularValorTotal(precioPelucheZorroNegroGrande);
    alert("El valor del peluche es un total de $" + valorTotal);
     valida = true;
  } else if (seleccion == 2) {
    valorTotal = calcularValorTotal(precioPelucheZorroNegroMediano);
    alert("El valor del peluche es un total de $" + valorTotal);
    valida = true;
  } else if (seleccion == 3) {
    valorTotal = calcularValorTotal(precioPelucheZorroBlancoGrande);
    alert("El valor del peluche es un total de $" + valorTotal);
     valida = true;
  } else if (seleccion == 4) {
    valorTotal = calcularValorTotal(precioPelucheZorroBlancoMediano);
    alert("El valor del peluche es un total de $" + valorTotal);
     valida = true;
  } else if (seleccion == 5) {
    valorTotal = calcularValorTotal(PrecioPelucheCerdoRosaGrande);
    alert("El valor del peluche es un total de $" + valorTotal.toFixed());
     valida = true;
  } else if (seleccion == 6) {
    valorTotal = calcularValorTotal(precioPelucheCuervoNegroMediano);
    alert("El valor del peluche es un total de $" + valorTotal.toFixed());
     valida = true;
  } else if (seleccion == 7) {
    valorTotal = calcularValorTotal(precioPelucheArdillaMediana);
    alert("El valor del peluche es un total de $" + valorTotal.toFixed());
     valida = true;
  } else if (seleccion == 8) {
    valorTotal = calcularValorTotal(precioPelucheDragonChinoMediano);
    alert("El valor del peluche es un total de $" + valorTotal.toFixed());
     valida = true;
  } else {
    alert(
      "Comprendo si ninguno es de tu agrado, no obstante puede esperar a que notifiquemos que los nuevos peluches entren en stock. \n Gracias, tenga buen día!!"
    );
  }
}
