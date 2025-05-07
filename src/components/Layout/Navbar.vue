<template>
  <nav class="navbar">
    <!-- Botón de menú para abrir el sidebar -->
    <button class="menu-btn" @click="$emit('toggle-sidebar')">
      <i class="fas fa-bars"></i>
    </button>

    <!-- Logo -->
    <div class="logo-container">
      <img src="/joy_logo.png" alt="Logo" class="logo-img" />
      <h1 class="logo">Elegancia Digital</h1>
    </div>

    <!-- Íconos de navegación -->
    <div class="nav-icons">
      <router-link to="/" class="icon-group">
        <i class="fas fa-house"></i>
        <span>Inicio</span>
      </router-link>

      <router-link to="/soporte" class="icon-group">
        <i class="fas fa-bell"></i>
        <span>Soporte</span>
      </router-link>

      <router-link to="/login" class="icon-group">
        <i class="fas fa-user"></i>
        <span>Cuenta</span>
      </router-link>

      <!-- Carrito -->
      <div class="icon-group cart-icon" @click="mostrarCarrito = true">
        <i class="fas fa-cart-shopping"></i>
        <span>Carrito</span>
        <span class="cart-count" v-if="cartStore.totalItems > 0">
          {{ cartStore.totalItems }}
        </span>
      </div>
    </div>
  </nav>

  <!-- Modal del Carrito -->
  <div class="modal-overlay" v-if="mostrarCarrito" @click.self="mostrarCarrito = false">
    <div class="modal-content">
      <button class="close-modal" @click="mostrarCarrito = false">
        <i class="fas fa-times"></i>
      </button>

      <h2>🛍 Tu Carrito ({{ cartStore.totalItems }})</h2>

      <div v-if="cartStore.items.length === 0" class="empty-cart">
        <p>Tu carrito está vacío</p>
        <i class="fas fa-shopping-basket"></i>
      </div>

      <div v-else>
        <div class="cart-items">
          <div v-for="item in cartStore.items" :key="item.id" class="cart-item">
            <img :src="item.imagen" :alt="item.nombre" class="item-image" />
            <div class="item-details">
              <h3>{{ item.nombre }}</h3>
              <p>${{ item.precio }} x {{ item.cantidad }}</p>
            </div>
            <div class="item-actions">
              <span class="item-total">${{ (item.precio * item.cantidad).toFixed(2) }}</span>
              <button @click="cartStore.eliminarProducto(item.id)" class="remove-item">
                <i class="fas fa-trash-alt"></i>
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
import { useRouter } from 'vue-router'

const cartStore = useCartStore()
const mostrarCarrito = ref(false)
const router = useRouter()

const proceedToCheckout = () => {
  if (cartStore.items.length > 0) {
    mostrarCarrito.value = false
    router.push('/checkout')
  } else {
    alert('Tu carrito está vacío.')
  }
}
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap');
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css');

.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #ffffff;
  padding: 10px 20px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 1000;
}

.menu-btn {
  font-size: 1.5rem;
  background: none;
  border: none;
  color: #333;
  cursor: pointer;
}

.logo-container {
  display: flex;
  align-items: center;
  gap: 10px;
}

.logo-img {
  width: 60px;
  height: auto;
}

.logo {
  font-family: 'Inter', sans-serif;
  font-size: 1.8rem;
  color: black;
  font-weight: 700;
}

.nav-icons {
  display: flex;
  align-items: center;
  gap: 20px;
}

.icon-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 1rem;
  color: #444;
  text-decoration: none;
  font-family: 'Inter', sans-serif;
  transition: color 0.3s, transform 0.2s;
  position: relative;
}

.icon-group i {
  font-size: 1.5rem;
}

.icon-group span {
  margin-top: 5px;
  font-size: 0.8rem;
}

.icon-group:hover {
  color: black;
  transform: translateY(-2px);
}

.cart-count {
  background-color: #c90000;
  color: white;
  font-size: 0.7rem;
  font-weight: bold;
  border-radius: 50%;
  padding: 2px 6px;
  position: absolute;
  top: -5px;
  right: -10px;
}

/* Estilos del modal */
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
  font-family: 'Inter', sans-serif;
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
</style>
