<template>
  <nav class="navbar">
    <button class="menu-btn" @click="$emit('toggleSidebar')">☰</button>

    <div class="logo-container">
      <img src="/joy_logo.png" alt="Logo" class="logo-img" />
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

      <!-- Carrito con integración del store -->
      <div class="icon-group cart-icon" @click="mostrarCarrito = true">
        <i class="fas fa-shopping-cart"></i>
        <span class="cart-count" v-if="cartStore.totalItems > 0">
          {{ cartStore.totalItems }}
        </span>
      </div>
    </div>
  </nav>

  <!-- Modal del Carrito -->
  <div class="modal-overlay" v-if="mostrarCarrito" @click.self="mostrarCarrito = false">
    <div class="modal-content">
      <button class="close-modal" @click="mostrarCarrito = false">&times;</button>
      <h2>🛍 Tu Carrito ({{ cartStore.totalItems }})</h2>

      <div v-if="cartStore.items.length === 0" class="empty-cart">
        <p>Tu carrito está vacío</p>
        <i class="fas fa-shopping-basket"></i>
      </div>

      <div v-else>
        <div class="cart-items">
          <div v-for="item in cartStore.items" :key="item.id" class="cart-item">
            <img :src="item.imagen" :alt="item.nombre" class="item-image">
            <div class="item-details">
              <h3>{{ item.nombre }}</h3>
              <p>${{ item.precio }} x {{ item.cantidad }}</p>
            </div>
            <div class="item-actions">
              <span class="item-total">${{ (item.precio * item.cantidad).toFixed(2) }}</span>
              <button @click="cartStore.eliminarProducto(item.id)" class="remove-item">
                <i class="fas fa-trash"></i>
              </button>
            </div>
          </div>
        </div>

        <div class="cart-summary">
          <div class="total-section">
            <span>Total:</span>
            <span class="total-amount">${{ cartStore.precioTotal.toFixed(2) }}</span>
          </div>

          <div class="cart-buttons">
            <button @click="mostrarCarrito = false" class="continue-shopping">
              Seguir Comprando
            </button>
            <button @click="proceedToCheckout" class="checkout-button">
              Finalizar Compra
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useCartStore } from '../../stores/useCartStore'

const cartStore = useCartStore()
const mostrarCarrito = ref(false)

const proceedToCheckout = () => {
  if (cartStore.items.length > 0) {
    // Aquí puedes redirigir a la página de checkout
    alert('Redirigiendo al proceso de pago...')
    mostrarCarrito.value = false
  }
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

/* Estilos mejorados para el modal del carrito */
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
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25);
  animation: fadeIn 0.3s ease-out;
  position: relative;
}

.close-modal {
  position: absolute;
  top: 15px;
  right: 15px;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #666;
}

.modal-content h2 {
  margin-bottom: 20px;
  font-family: 'Playfair Display', serif;
  font-size: 1.8rem;
  color: #333;
  text-align: center;
}

.empty-cart {
  text-align: center;
  padding: 20px 0;
}

.empty-cart i {
  font-size: 3rem;
  color: #ccc;
  margin-top: 15px;
}

.empty-cart p {
  font-size: 1.2rem;
  color: #666;
}

.cart-items {
  margin-bottom: 20px;
}

.cart-item {
  display: flex;
  align-items: center;
  padding: 15px 0;
  border-bottom: 1px solid #eee;
}

.item-image {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 8px;
  margin-right: 15px;
}

.item-details {
  flex: 1;
}

.item-details h3 {
  margin: 0;
  font-size: 1rem;
  color: #333;
}

.item-details p {
  margin: 5px 0 0;
  font-size: 0.9rem;
  color: #666;
}

.item-actions {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.item-total {
  font-weight: bold;
  color: #333;
  margin-bottom: 5px;
}

.remove-item {
  background: none;
  border: none;
  color: #ff4444;
  cursor: pointer;
  font-size: 1rem;
}

.cart-summary {
  margin-top: 20px;
  padding-top: 20px;
  border-top: 2px solid #eee;
}

.total-section {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  font-size: 1.2rem;
}

.total-amount {
  font-weight: bold;
  color: #c90000;
}

.cart-buttons {
  display: flex;
  gap: 10px;
}

.continue-shopping,
.checkout-button {
  flex: 1;
  padding: 12px;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.continue-shopping {
  background-color: #f0f0f0;
  color: #333;
}

.continue-shopping:hover {
  background-color: #e0e0e0;
}

.checkout-button {
  background-color: #c90000;
  color: white;
}

.checkout-button:hover {
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

/* Estilos para modo oscuro */
.dark .modal-content {
  background-color: #1e1e1e;
  color: white;
}

.dark .modal-content h2 {
  color: white;
}

.dark .cart-item {
  border-bottom-color: #333;
}

.dark .item-details h3 {
  color: white;
}

.dark .item-details p {
  color: #aaa;
}

.dark .item-total {
  color: white;
}

.dark .total-section {
  border-top-color: #333;
}

.dark .continue-shopping {
  background-color: #333;
  color: white;
}

.dark .continue-shopping:hover {
  background-color: #444;
}
</style>