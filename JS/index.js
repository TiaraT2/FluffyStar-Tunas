//Descuento e impuesto.
const porcentajeDeDescuento = 5;
const porcentajeDeImpuesto = 12;

//Mercancia
class Productos {
  constructor(nombre, tamaño, codigo, cantidad, descuento, precio) {
    this.nombre = nombre;
    this.tamaño = tamaño;
    this.codigo = codigo;
    this.cantidad = cantidad;
    this.descuento = descuento;
    this.precio = precio;

    this.aplicarDescuento = () => {
      if (this.descuento) {
        this.precio = this.precio - (this.precio * porcentajeDeDescuento) / 100;
      }
    };
  }
}

const productosArray = [
  new Productos("Zorro negro G", "Grande", 205, 24, false, 5000),
  new Productos("Zorro negro M", "Mediano", 105, 17, true, 3125),
  new Productos("Zorro blanco G", "Grande", 204, 14, true, 5000),
  new Productos("Zorro blanco M", "Mediano", 104, 21, false, 3125),
  new Productos("Cerdo rosa G", "Grande", 123, 10, false, 3679),
  new Productos("Cuervo negro M", "Mediano", 301, 15, false, 2910),
  new Productos("Ardilla M", "Mediano", 401, 20, true, 2739),
  new Productos("Dragón chino M", "Mediano", 601, 12, false, 4571),
];

//Cuentas para el valor total.
const calcularValorTotal = (producto) => {
  const impuesto = producto.precio * (porcentajeDeImpuesto / 100);
  const descuento = producto.aplicarDescuento()
    ? calcularDescuento(producto.precio)
    : 0;
  const valorTotal = producto.precio + impuesto - descuento;
  return Math.round(valorTotal);
};

//Utilización de map y join.
const nombresProductos = productosArray.map(
  (producto, index) => `${index + 1}. ${producto.nombre}`
);
const productosDisponibles = nombresProductos.join("\n");

// Filtrar productos con descuento
const productosConDescuento = productosArray.filter(
  (producto) => producto.descuento
);
const nombresProductosConDescuento = productosConDescuento.map(
  (producto, index) => `${index + 1}. ${producto.nombre}`
);
const productosConDescuentoDisponibles =
  nombresProductosConDescuento.join("\n");
if (productosConDescuento.length > 0) {
  alert(
    "Productos con descuento disponibles:\n" + productosConDescuentoDisponibles
  );
} else {
  alert("No hay productos con descuento disponibles.");
}

let valida = false;

while (!valida) {
  alert(
    "Bienvenido a mi tienda de peluches. En esta ocasión contamos con un reducido stock, sin embargo, si desea seguir viendo los que hay en stock; te damos la más cálida bienvenida. \n Antes de continua tome en cuenta que los tamaños varian: G es referente a grande y M es referente a mediano. "
  );
  seleccion = parseInt(
    prompt(
      "En esta ocasión contamos con un reducido stock de: \n" +
        productosDisponibles
    )
  );

  const mostrarInformacionProducto = (producto) => {
    for (const propiedad in producto) {
      if (propiedad === "descuento") {
        alert("Tiene descuento: " + (producto[propiedad] ? "Sí" : "No"));
      } else if (propiedad !== "aplicarDescuento") {
        alert(propiedad + ": " + producto[propiedad]);
      }
    }
  };

  if (seleccion >= 1 && seleccion <= productosArray.length) {
    const productoSeleccionado = productosArray[seleccion - 1];
    const valorTotal = calcularValorTotal(productoSeleccionado);
    alert("El valor del peluche es un total de $" + valorTotal.toFixed());

    const deseaVerDetalle = prompt(
      "¿Desea ver la información detallada del producto? (Sí/No)"
    ).toLowerCase();

    if (deseaVerDetalle === "sí" || deseaVerDetalle === "si") {
      mostrarInformacionProducto(productoSeleccionado);
    }

    valida = true;
  } else {
    alert(
      "Comprendo si ninguno es de tu agrado, no obstante puede esperar a que notifiquemos que los nuevos peluches entren en stock. \n Gracias, tenga buen día!!"
    );
    valida = true;
    break;
  }
}

// Mostrar la fecha y hora actual
const fechaActual = new Date();
const opcionesDeFormato = {
  weekday: "long",
  year: "numeric",
  month: "numeric",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
};
const fechaFormateada = fechaActual.toLocaleDateString(
  "es-ES",
  opcionesDeFormato
);

alert("Fecha y hora del momento de la compra: " + fechaFormateada);
