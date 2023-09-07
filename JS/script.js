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

function agregarAlCarrito(button) {
  const producto = JSON.parse(button.getAttribute("data-producto"));
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  carrito.push(producto);
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
    total += producto.precio;
    carritoLista.innerHTML += `
            <div>
                <p>${producto.nombre} $${producto.precio.toFixed(2)}</p>
                <button class="btn" onclick="borrarProducto(${index})">Borrar</button>
            </div>
        `;
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

function buscarProductos() {
  const input = document.getElementById("busquedaInput");
  const query = input.value.toLowerCase();
  const productos = document.querySelectorAll("#productos .product");

  productos.forEach((producto) => {
    const nombre = producto.querySelector("h2").textContent.toLowerCase();
    if (nombre.includes(query)) {
      producto.style.display = "block"; // Mostrar producto
    } else {
      producto.style.display = "none"; // Ocultar producto
    }
  });
}

function confirmarCompra() {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  carrito.length === 0
    ? Swal.fire(
        "El carrito está vacío. Agrega productos antes de confirmar la compra."
      )
    : (Swal.fire("Compra confirmada. Gracias por su compra."),
      localStorage.removeItem("carrito"),
      mostrarCarrito());
}

mostrarCarrito();
