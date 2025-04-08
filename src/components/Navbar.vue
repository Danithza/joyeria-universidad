<template>
  <nav class="navbar">
    <button class="menu-btn" @click="$emit('toggleSidebar')">☰</button>

    <div class="logo-container">
      <img src="/logo-joyas-.png" alt="Logo" class="logo-img" />
      <h1 class="logo">Elegancia Digital en Línea</h1>
    </div>

    <div class="nav-icons">
      <router-link to="/" class="icon-group">
        <i class="fas fa-home"></i>
        <span>Inicio</span>
      </router-link>

      <router-link to="/soporte" class="icon-group">
        <i class="fas fa-headset"></i>
        <span>Soporte</span>
      </router-link>

      <router-link to="/login" class="icon-group">
        <i class="fas fa-user"></i>
      </router-link>

      <!-- Carrito -->
      <div class="icon-group" @click="mostrarModal = true">
        <i class="fas fa-shopping-cart"></i>
        <span class="cart-count" v-if="cantidadCarrito > 0">{{ cantidadCarrito }}</span>
      </div>
    </div>
  </nav>

  <!-- Modal de Carrito -->
  <div class="modal-overlay" v-if="mostrarModal">
    <div class="modal-content">
      <h2>🛍 Tu Carrito</h2>

      <div v-if="carrito.length === 0">
        <p>Tu carrito está vacío.</p>
      </div>

      <ul v-else class="cart-list">
        <li v-for="producto in carrito" :key="producto.id" class="cart-item">
          <span>{{ producto.nombre }}</span>
          <span>x{{ producto.cantidad }}</span>
          <span>${{ (producto.precio * producto.cantidad).toFixed(2) }}</span>
        </li>
      </ul>

      <div class="modal-buttons">
        <button class="btn-cerrar" @click="mostrarModal = false">Cerrar</button>
        <button class="btn-finalizar" @click="finalizarCompra">Finalizar Compra</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useCartStore } from '../stores/useCartStore'

const cartStore = useCartStore()
const carrito = cartStore.carrito
const cantidadCarrito = computed(() => cartStore.cantidadCarrito)

const mostrarModal = ref(false)

function finalizarCompra() {
  alert('¡Gracias por tu compra! 💎')
  cartStore.carrito = [] // limpiar carrito
  mostrarModal.value = false
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600&display=swap');
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css');
@import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&family=Great+Vibes&family=Playfair+Display:wght@700&display=swap');

.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #f5f5f5;
  padding: 15px 30px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 1000;
}

.menu-btn {
  font-size: 1.8rem;
  background: #c90000;
  border: none;
  border-radius: 8px;
  padding: 10px 15px;
  cursor: pointer;
  color: white;
  transition: background 0.3s, transform 0.2s;
}

.menu-btn:hover {
  background: #a70000;
  transform: scale(1.1);
}

.logo-container {
  display: flex;
  align-items: center;
  gap: 10px;
}

.logo-img {
  width: 97px;
  height: auto;
  border-radius: 8px;
}

.logo {
  font-family: 'Great Vibes', cursive;
  font-size: 2.9rem;
  color: black;
  font-weight: bold;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
}

.nav-icons {
  display: flex;
  align-items: center;
  gap: 20px;
}

.icon-group {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 1.4rem;
  color: black;
  text-decoration: none;
  font-family: 'Montserrat', sans-serif;
  transition: color 0.3s, transform 0.2s;
  position: relative;
  cursor: pointer;
}

.icon-group:hover {
  color: #c90000;
  transform: scale(1.2);
}

.cart-count {
  background-color: #c90000;
  color: white;
  font-size: 0.75rem;
  font-weight: bold;
  border-radius: 50%;
  padding: 3px 7px;
  position: absolute;
  top: -8px;
  right: -10px;
}

/* --- Modal --- */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
}

.modal-content {
  background: white;
  padding: 30px;
  border-radius: 12px;
  width: 90%;
  max-width: 500px;
  text-align: center;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25);
  animation: fadeIn 0.3s ease-out;
}

.modal-content h2 {
  margin-bottom: 20px;
  font-family: 'Playfair Display', serif;
  font-size: 2rem;
}

.cart-list {
  list-style: none;
  padding: 0;
  margin: 0 0 20px 0;
  text-align: left;
}

.cart-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  font-size: 1rem;
  font-family: 'Montserrat', sans-serif;
}

.modal-buttons {
  display: flex;
  justify-content: space-around;
  gap: 10px;
}

.btn-cerrar,
.btn-finalizar {
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  font-family: 'Montserrat', sans-serif;
  transition: background 0.3s;
}

.btn-cerrar {
  background-color: #ccc;
}

.btn-finalizar {
  background-color: #c90000;
  color: white;
}

.btn-finalizar:hover {
  background-color: #a70000;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
