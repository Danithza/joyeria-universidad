<template>
  <div :class="{ dark: darkMode }" class="anillos-app">
    <!-- Navbar -->
    <header class="navbar">
      <h1>Elegancia Digital en Línea</h1>
      <div class="navbar-icons">
        <span class="icon" @click="toggleModoOscuro">
          <i class="fas" :class="darkMode ? 'fa-sun' : 'fa-moon'"></i>
        </span>
        <span class="icon" @click="toggleCarrito">
          <i class="fas fa-shopping-cart"></i>
          <span v-if="carrito.length" class="contador">{{ carrito.length }}</span>
        </span>
      </div>
    </header>

    <!-- Carrito Popup -->
    <div v-if="showCarrito" class="carrito-popup">
      <h4>Carrito de compras</h4>
      <ul>
        <li v-for="(item, index) in carrito" :key="index">
          {{ item.nombre }} - ${{ item.precio }}
          <button @click="removeFromCart(index)">🗑️</button>
        </li>
      </ul>
      <p><strong>Total:</strong> ${{ totalCarrito }}</p>
      <button @click="vaciarCarrito">Vaciar carrito</button>
      <button @click="resumenCompraVisible = true" v-if="carrito.length">Ver resumen de compra</button>
    </div>

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
      <div
        class="anillo-card"
        v-for="anillo in anillos"
        :key="anillo.id"
      >
        <img :src="anillo.imagen" :alt="anillo.nombre" />
        <h3>{{ anillo.nombre }}</h3>
        <p>${{ anillo.precio }}</p>
        <button @click="agregarAlCarrito(anillo)">Agregar al carrito</button>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

// Modo oscuro
const darkMode = ref(false)
const toggleModoOscuro = () => {
  darkMode.value = !darkMode.value
  localStorage.setItem('modoOscuro', darkMode.value)
}
onMounted(() => {
  darkMode.value = localStorage.getItem('modoOscuro') === 'true'
})

// Lista de anillos
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

// Carrito
const carrito = ref([])
const showCarrito = ref(false)
const toggleCarrito = () => (showCarrito.value = !showCarrito.value)
const agregarAlCarrito = (anillo) => carrito.value.push(anillo)
const removeFromCart = (index) => carrito.value.splice(index, 1)
const vaciarCarrito = () => carrito.value = []

const totalCarrito = computed(() =>
  carrito.value.reduce((total, item) => total + item.precio, 0)
)

// Resumen de compra
const resumenCompraVisible = ref(false)
const modalAgradecimientoVisible = ref(false)

function confirmarCompra() {
  resumenCompraVisible.value = false
  modalAgradecimientoVisible.value = true
  vaciarCarrito()
}
</script>

<style scoped>
.anillos-app {
  font-family: 'Segoe UI', sans-serif;
  padding: 1rem;
  background: #fff;
  min-height: 100vh;
  color: #333;
  transition: background 0.3s ease;
}
.dark {
  background: #121212;
  color: #f1f1f1;
}
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #eaeaea;
  padding: 1rem;
  border-radius: 10px;
}
.navbar-icons {
  display: flex;
  gap: 1rem;
}
.icon {
  cursor: pointer;
  font-size: 1.5rem;
}
.contador {
  background: red;
  color: white;
  font-size: 0.8rem;
  padding: 2px 6px;
  border-radius: 50%;
  position: relative;
  top: -10px;
  left: -5px;
}
.galeria {
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* 4 columnas fijas */
  gap: 2rem;
  margin: 2rem auto;
  max-width: 1000px; /* limita el ancho para centrar */
  justify-content: center;
}

.anillo-card {
  background: #fafafa;
  padding: 1rem;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transition: transform 0.3s ease;
}
.anillo-card:hover {
  transform: scale(1.05);
}
.anillo-card img {
  width: 100%;
  height: auto;
  border-radius: 8px;
}
.anillo-card button {
  margin-top: 10px;
  background: #000;
  color: white;
  padding: 8px 12px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.anillo-card button:hover {
  background: #444;
}

/* Carrito popup */
.carrito-popup {
  position: fixed;
  top: 70px;
  right: 20px;
  background: #fff;
  border: 1px solid #ccc;
  padding: 1rem;
  width: 300px;
  z-index: 1000;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0,0,0,0.2);
}
.carrito-popup ul {
  list-style: none;
  padding: 0;
}
.carrito-popup li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}
.carrito-popup button {
  background: #d33;
  color: white;
  border: none;
  padding: 4px 8px;
  border-radius: 4px;
  cursor: pointer;
}

/* Modal */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
}
.modal-content {
  background: #fff;
  padding: 2rem;
  border-radius: 12px;
  max-width: 500px;
  width: 90%;
  position: relative;
}
.modal-content h2 {
  margin-top: 0;
}
.close {
  position: absolute;
  top: 10px;
  right: 15px;
  font-size: 1.5rem;
  cursor: pointer;
}

/* Resumen */
.modal-content.resumen {
  text-align: center;
}
.modal-content.resumen ul {
  list-style: none;
  padding: 0;
  margin-bottom: 1rem;
}
.modal-content.resumen li {
  padding: 5px 0;
}
.modal-content.resumen button {
  background: #000;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 1rem;
}
  
</style>

