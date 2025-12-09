/* ============================= */
/* 🛒 CARRITO COMPLETO (NO GUARDA EN LOCALSTORAGE) */
/* ============================= */

let cart = [];  // carrito siempre empieza vacío


/* ============================= */
/* 🔢 ACTUALIZAR CONTADOR */
/* ============================= */
function updateCartCount() {
  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  document.getElementById("cart-count").innerText = count;
}
updateCartCount();


/* ============================= */
/* ➕ AÑADIR PRODUCTO */
/* ============================= */
document.querySelectorAll(".add-btn").forEach(btn => {

  btn.addEventListener("click", e => {

    const card = e.target.closest(".card");
    const name = card.querySelector("h3").innerText;
    const price = parseInt(card.querySelector(".price").innerText.replace(/\D/g,''));
    const img = card.querySelector("img").src;

    let item = cart.find(p => p.name === name);

    if (item) item.qty++;
    else cart.push({ name, price, qty: 1, img });

    updateCartCount();
    renderCart();

    // ⭐ EFECTO BURBUJA
    createBubbleEffect(e);
  });

});


/* ============================= */
/* 🎭 MODAL CARRITO */
/* ============================= */
function openCart() {
  const modal = document.getElementById("cart-modal");
  modal.classList.add("active");
}

function closeCart() {
  document.getElementById("cart-modal").classList.remove("active");
}


/* ============================= */
/* 🔼🔽 SUMAR / RESTAR / ELIMINAR */
/* ============================= */
function increaseItem(index) {
  cart[index].qty++;
  renderCart();
  updateCartCount();
}

function decreaseItem(index) {
  if (cart[index].qty > 1) {
    cart[index].qty--;
  } else {
    cart.splice(index, 1);
  }
  renderCart();
  updateCartCount();
}

function removeItem(index) {
  cart.splice(index, 1);
  renderCart();
  updateCartCount();
}


/* ============================= */
/* 🧾 RENDER DEL CARRITO */
/* ============================= */
function renderCart() {
  const container = document.getElementById("cart-items");
  container.innerHTML = "";

  let total = 0;

  cart.forEach((item, index) => {
    total += item.price * item.qty;

    container.innerHTML += `
      <div class="cart-item">

        <img src="${item.img}" class="cart-img">

        <div class="cart-info">
          <h4>${item.name}</h4>
          <p>$${item.price * item.qty}</p>

          <div class="qty-controls">
            <button onclick="decreaseItem(${index})">−</button>
            <span>${item.qty}</span>
            <button onclick="increaseItem(${index})">+</button>
          </div>
        </div>

        <button class="delete-btn" onclick="removeItem(${index})">🗑</button>

      </div>
    `;
  });

  document.getElementById("cart-total").innerText = total;
}


/* ============================= */
/* 📲 ENVÍO A WHATSAPP */
/* ============================= */
function sendCartToWhatsApp() {
  if (cart.length === 0) {
    alert("Tu carrito está vacío");
    return;
  }

  let message = "Hola! Quiero pedir:%0A%0A";
  let total = 0;

  cart.forEach(item => {
    message += `• ${item.name} x${item.qty} - $${item.price * item.qty}%0A`;
    total += item.price * item.qty;
  });

  message += `%0A💰 Total: $${total}`;

  window.open(`https://wa.me/56936784249?text=${message}`, "_blank");
}


/* ============================= */
/* ⭐ EFECTO BURBUJA AL AGREGAR */
/* ============================= */
function createBubbleEffect(event) {
  const bubble = document.createElement("div");
  bubble.classList.add("bubble-effect");

  // posición donde se hizo click
  const rect = event.target.getBoundingClientRect();
  bubble.style.left = rect.left + "px";
  bubble.style.top = rect.top + "px";

  document.body.appendChild(bubble);

  setTimeout(() => {
    bubble.remove();
  }, 800);
}


/* ============================= */
/* 🎞️ CARRUSEL AUTOMÁTICO (SIN CAMBIOS) */
/* ============================= */

document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;

    const showSlide = (index) => {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        slides[index].classList.add('active');
        dots[index].classList.add('active');
        currentSlide = index;
    };

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
        });
    });

    const nextSlide = () => {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    };

    setInterval(nextSlide, 5000);
    showSlide(currentSlide);
});

// Ajuste de scroll para compensar el header fijo
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    const id = this.getAttribute("href");

    if (id === "#") return; // Evita errores con enlaces vacíos

    e.preventDefault();

    const target = document.querySelector(id);
    if (!target) return;

    const offset = 140; // AJUSTA AQUÍ (100–150 recomendado)
    const topPosition = target.getBoundingClientRect().top + window.scrollY - offset;

    window.scrollTo({
      top: topPosition,
      behavior: "smooth"
    });
  });
});