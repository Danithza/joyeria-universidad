<template>
  <div :class="{ dark: darkMode }" class="anillos-app">
    <!-- Navbar -->
    <header class="navbar">
      <h1>Elegancia Digital en Línea</h1>
      <div class="navbar-icons">
        <span class="icon" @click="toggleModoOscuro" aria-label="Modo Oscuro">
          <i class="fas" :class="darkMode ? 'fa-sun' : 'fa-moon'"></i>
        </span>
        <span class="icon" @click="toggleCarrito" aria-label="Carrito de compras">
          <i class="fas fa-shopping-cart"></i>
          <span v-if="carrito.length" class="contador">{{ carrito.length }}</span>
        </span>
      </div>
    </header>

   

    <!-- Resumen de Compra Modal -->
    <div v-if="resumenCompraVisible" class="modal">
      <div class="modal-content resumen">
        <span class="close" @click="resumenCompraVisible = false">&times;</span>
        <h2>Resumen de tu compra</h2>
        <ul>
          <li v-for="(item, index) in carrito" :key="'resumen-'+index">
            {{ item.nombre }} - ${{ item.precio }}
          </li>
        </ul>
        <p><strong>Total:</strong> ${{ totalCarrito }}</p>
        <button @click="confirmarCompra">Confirmar compra</button>
      </div>
    </div>

    <!-- Modal de agradecimiento -->
    <div v-if="modalAgradecimientoVisible" class="modal">
      <div class="modal-content resumen">
        <span class="close" @click="modalAgradecimientoVisible = false">&times;</span>
        <h2>¡Gracias por tu compra! 🎉</h2>
        <p>Tu pedido ha sido recibido y está siendo procesado.</p>
      </div>
    </div>

    <!-- Galería de Anillos -->
    <main class="galeria">
      <div class="anillo-card" v-for="anillo in anillos" :key="anillo.id">
        <img :src="anillo.imagen" :alt="anillo.nombre" />
        <h3>{{ anillo.nombre }}</h3>
        <p>${{ anillo.precio }}</p>
        <button @click="agregarAlCarrito(anillo)">
          <i class="fas fa-cart-plus"></i> Agregar al carrito
        </button>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useCartStore } from '@/stores/useCartStore'

const cartStore = useCartStore()

const carrito = cartStore.carrito
const totalCarrito = cartStore.totalCarrito
const agregarAlCarrito = cartStore.agregarAlCarrito
const removeFromCart = cartStore.removeFromCart
const vaciarCarrito = cartStore.vaciarCarrito

const darkMode = ref(false)
const showCarrito = ref(false)
const resumenCompraVisible = ref(false)
const modalAgradecimientoVisible = ref(false)

const toggleModoOscuro = () => {
  darkMode.value = !darkMode.value
  localStorage.setItem('modoOscuro', darkMode.value)
}

const toggleCarrito = () => {
  showCarrito.value = !showCarrito.value
}

onMounted(() => {
  darkMode.value = localStorage.getItem('modoOscuro') === 'true'
})

function confirmarCompra() {
  resumenCompraVisible.value = false
  modalAgradecimientoVisible.value = true
  vaciarCarrito()
}

const anillos = ref([
  { id: 1, nombre: 'Anillo Brillante', precio: 120, imagen: '/src/assets/anillo1.jpeg' },
  { id: 2, nombre: 'Anillo Elegante', precio: 95, imagen: '/src/assets/anillo2.jpeg' },
  { id: 3, nombre: 'Anillo Clásico', precio: 150, imagen: '/src/assets/anillo3.jpeg' },
  { id: 4, nombre: 'Anillo Perla', precio: 110, imagen: '/src/assets/anillo4.jpeg' },
  { id: 5, nombre: 'Anillo Zafiro', precio: 140, imagen: '/src/assets/anillo5.jpeg' },
  { id: 6, nombre: 'Anillo Minimal', precio: 80, imagen: '/src/assets/anillo6.jpeg' },
  { id: 7, nombre: 'Anillo Vintage', precio: 160, imagen: '/src/assets/anillo7.jpeg' },
  { id: 8, nombre: 'Anillo Glam', precio: 135, imagen: '/src/assets/anillo8.jpeg' }
])
</script>

<style scoped>
.anillos-app {
  font-family: 'Arial', sans-serif;
  padding: 1rem;
  transition: background 0.3s;
}
.dark {
  background: #1a1a1a;
  color: white;
}
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.navbar-icons .icon {
  margin-left: 1rem;
  cursor: pointer;
}
.contador {
  background: red;
  color: white;
  border-radius: 50%;
  padding: 0.2rem 0.5rem;
  margin-left: 0.3rem;
  font-size: 0.8rem;
}
.carrito-popup {
  background: #fff;
  border: 1px solid #ccc;
  padding: 1rem;
  margin: 1rem 0;
}
.dark .carrito-popup {
  background: #2a2a2a;
  color: white;
}
.modal {
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background-color: rgba(0,0,0,0.6);
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  max-width: 500px;
  width: 90%;
}
.dark .modal-content {
  background: #333;
  color: white;
}
.close {
  float: right;
  cursor: pointer;
  font-size: 1.5rem;
}
.galeria {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1rem;
  margin-top: 2rem;
}
.anillo-card {
  background: #f8f8f8;
  padding: 1rem;
  text-align: center;
  border-radius: 10px;
  transition: transform 0.3s;
}
.anillo-card:hover {
  transform: scale(1.05);
}
.anillo-card img {
  max-width: 100%;
  border-radius: 8px;
}
.dark .anillo-card {
  background: #2a2a2a;
  color: white;
}
button {
  margin-top: 0.5rem;
  background: #333;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
}
button:hover {
  background: #555;
}
</style>
