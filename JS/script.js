const menuIcon = document.querySelector(".menu-icon");
const menu = document.querySelector(".menu");

menuIcon.addEventListener("click", () => {
  menu.classList.toggle("active");
});

document.getElementById("loginButton").addEventListener("click", function () {
  var email = document.getElementById("emailLogin").value;
  var password = document.getElementById("passwordLogin").value;

  if (email === "" || password === "") {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Faltan campos a rellenar!",
    });
  } else {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });

    Toast.fire({
      icon: "success",
      title: "Bienvenido.",
    });
  }
});

document
  .getElementById("registerButton")
  .addEventListener("click", function () {
    var fullName = document.getElementById("fullName").value;
    var phoneNumber = document.getElementById("phoneNumber").value;
    var email = document.getElementById("emailRegister").value;
    var password = document.getElementById("passwordRegister").value;

    if (
      fullName === "" ||
      phoneNumber === "" ||
      email === "" ||
      password === ""
    ) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Faltan campos a rellenar!",
      });
    } else {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });

      Toast.fire({
        icon: "success",
        title: "Registro completado.",
      });
    }
  });

function buscarProductos() {
  const input = document.getElementById("busquedaInput");
  const query = input.value.toLowerCase();
  const productos = document.querySelectorAll("#productos .product");

  productos.forEach((producto) => {
    const nombre = producto.querySelector("h2").textContent.toLowerCase();
    if (nombre.includes(query)) {
      producto.style.display = "block";
    } else {
      producto.style.display = "none";
    }
  });
}

async function obtenerProductos() {
  try {
    const respuesta = await fetch("../JSON/productos.json");

    if (!respuesta.ok) {
      throw new Error(
        `Error al obtener el archivo JSON. Código de estado: ${respuesta.status}`
      );
    }

    const productos = await respuesta.json();
    return productos;
  } catch (error) {
    console.error(`Error: ${error.message}`);
    return null;
  }
}
async function main() {
  try {
    const productos = await obtenerProductos();

    if (productos) {
      console.log("Productos obtenidos:", productos);

      localStorage.setItem("productos", JSON.stringify(productos));
    } else {
      console.log("No se pudieron obtener los productos.");
    }
  } catch (error) {
    console.error("Error al obtener los productos:", error);
  }
}

main();

function agregarAlCarrito(btn) {
  const productId = parseInt(btn.getAttribute("data-id"));

  const productos = JSON.parse(localStorage.getItem("productos")) || [];

  const producto = productos.find((p) => p.id === productId);

  if (producto) {
    agregarProductoAlCarrito(producto);
  } else {
    console.error("Producto no encontrado.");
  }
}

function agregarProductoAlCarrito(producto) {
  const { id, nombre, precio } = producto;
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  carrito.push({ id, nombre, precio });
  localStorage.setItem("carrito", JSON.stringify(carrito));
  mostrarCarrito();
}

function mostrarCarrito() {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const carritoLista = document.getElementById("carritoLista");
  const totalSpan = document.getElementById("total");
  let total = 0;

  carritoLista.innerHTML = "";
  carrito.forEach((producto, index) => {
    if (
      producto &&
      typeof producto === "object" &&
      producto.hasOwnProperty("precio")
    ) {
      total += parseFloat(producto.precio);
      carritoLista.innerHTML += `
              <div>
                  <p>${producto.nombre} $${parseFloat(producto.precio).toFixed(
        0
      )}</p>
                  <button class="btn" onclick="borrarProducto(${index})">Borrar</button>
              </div>
          `;
    }
  });

  totalSpan.textContent = total.toFixed(2);
}

function borrarProducto(index) {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  carrito.splice(index, 1);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  mostrarCarrito();
}

function borrarCarrito() {
  localStorage.removeItem("carrito");
  mostrarCarrito();
}

function confirmarCompra() {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  let total = 0;

  carrito.forEach((producto) => {
    if (
      producto &&
      typeof producto === "object" &&
      producto.hasOwnProperty("precio")
    ) {
      total += parseFloat(producto.precio);
    }
  });

  if (carrito.length === 0) {
    Swal.fire(
      "El carrito está vacío. Agrega productos antes de confirmar la compra."
    );
  } else {
    Swal.fire({
      title: "Confirmar compra",
      text: `El total es de: $${total.toFixed(0)}`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sí, continuar",
      cancelButtonText: "No, cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Compra confirmada. Gracias por su compra.");
        localStorage.removeItem("carrito");
        mostrarCarrito();
      } else {
        Swal.fire("Compra cancelada.");
      }
    });
  }
}
