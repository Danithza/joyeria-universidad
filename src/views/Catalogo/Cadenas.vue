<template>
  <div :class="['app-container', darkMode ? 'dark' : '']">
    <!-- Navbar -->
    <Navbar :cartCount="cartStore.totalItems" />

    <!-- Layout -->
    <div class="main-layout">
      <!-- Filtros -->
      <aside class="sidebar">
        <h2>Filtros</h2>
        <input v-model="busqueda" placeholder="Buscar Cadena..." />
        <div class="slider-group">
          <label>Precio mín: {{ precioMin }}</label>
          <input type="range" v-model="precioMin" min="0" max="1000" />
        </div>
        <div class="slider-group">
          <label>Precio máx: {{ precioMax }}</label>
          <input type="range" v-model="precioMax" min="0" max="1000" />
        </div>
        <button @click="limpiarFiltros">Limpiar</button>
      </aside>

      <!-- Galería -->
      <section class="galeria">
        <transition-group name="fade" tag="div" class="productos-grid">
          <div
            v-for="Cadena in CadenasFiltrados"
            :key="Cadena.id"
            class="tarjeta-producto"
          >
            <div class="etiqueta" v-if="Cadena.etiqueta">{{ Cadena.etiqueta }}</div>

            <i
              class="fas fa-heart icono-favorito"
              :class="{ favorito: favoritos.includes(Cadena.id) }"
              @click="toggleFavorito(Cadena.id)"
              title="Añadir a favoritos"
            ></i>

            <img
              :src="Cadena.imagen"
              :alt="Cadena.nombre"
              class="imagen-anillo"
            />

            <h3>{{ Cadena.nombre }}</h3>

            <div class="estrellas">
              <i
                v-for="n in 5"
                :key="n"
                class="fa-star"
                :class="n <= (Cadena.rating || 4) ? 'fas' : 'far'"
              ></i>
              <span class="rating-text">({{ Cadena.rating || 4 }}/5)</span>
            </div>

            <p class="precio">${{ Cadena.precio }}</p>

            <p v-if="Cadena.stock === 0" class="sin-stock">Sin stock</p>
            <p v-else class="stock-disponible">{{ Cadena.stock }} disponibles</p>

            <button
              @click="agregarAlCarrito(Cadena)"
              :disabled="Cadena.stock === 0"
            >
              <i class="fas fa-cart-plus"></i> Añadir al carrito
            </button>
          </div>
        </transition-group>
      </section>
    </div>

    <div v-if="toastVisible" class="toast">¡Producto añadido al carrito!</div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useCartStore } from '@/stores/useCartStore'
import Navbar from '@/components/Layout/Navbar.vue'

import collar1 from '@/assets/img-collares/collar1.jpg'
import collar2 from '@/assets/img-collares/collar2.jpg'
import collar3 from '@/assets/img-collares/collar3.jpg'
import collar4 from '@/assets/img-collares/collar4.jpg'

const cartStore = useCartStore()

const darkMode = ref(true)
const busqueda = ref('')
const precioMax = ref(1000)
const precioMin = ref(0)
const toastVisible = ref(false)

const favoritos = ref(JSON.parse(localStorage.getItem('favoritos') || '[]'))
watch(favoritos, (val) => {
  localStorage.setItem('favoritos', JSON.stringify(val))
}, { deep: true })

const Cadenas = ref([
  { id: 1, nombre: 'Cadena de Oro tejido 15k', precio: 120, imagen: collar1, stock: 10, etiqueta: 'Popular', rating: 5 },
  { id: 2, nombre: 'Cadena de Oro 20k', precio: 150, imagen: collar2, stock: 8, etiqueta: '', rating: 4 },
  { id: 3, nombre: 'Cadena 10k', precio: 90, imagen: collar3, stock: 12, etiqueta: 'nuevo', rating: 4 },
  { id: 4, nombre: 'Cadena Oro Blanco 25k', precio: 110, imagen: collar4, stock: 9, etiqueta: 'Exclusivo', rating: 3 },
])

onMounted(() => {
  darkMode.value = window.matchMedia('(prefers-color-scheme: dark)').matches
})

const CadenasFiltrados = computed(() =>
  Cadenas.value.filter(
    (a) =>
      a.nombre.toLowerCase().includes(busqueda.value.toLowerCase()) &&
      a.precio <= precioMax.value &&
      a.precio >= precioMin.value
  )
)

const limpiarFiltros = () => {
  busqueda.value = ''
  precioMax.value = 1000
  precioMin.value = 0
}

const toggleFavorito = (id) => {
  if (favoritos.value.includes(id)) {
    favoritos.value = favoritos.value.filter(favId => favId !== id)
  } else {
    favoritos.value.push(id)
  }
}

const agregarAlCarrito = (Cadena) => {
  if (Cadena.stock > 0) {
    cartStore.agregarProducto(Cadena)
    toastVisible.value = true
    setTimeout(() => {
      toastVisible.value = false
    }, 2000)
  }
}
</script>

<style scoped>
.app-container {
  background-color: #f5f5f5;
  min-height: 100vh;
  padding-top: 100px;
}
.dark {
  background-color: #121212;
  color: #fff;
}
.main-layout {
  display: flex;
  gap: 2rem;
  padding: 2rem;
}
.sidebar {
  width: 200px;
  background: #1c1c1c;
  padding: 1rem;
  border-radius: 12px;
  color: #fff;
}
.sidebar input,
.sidebar button {
  width: 100%;
  margin-top: 0.5rem;
  padding: 0.4rem;
  border-radius: 6px;
  border: none;
}
.slider-group {
  margin-top: 1rem;
}
.galeria {
  flex: 1;
  overflow-x: auto;
}
.productos-grid {
  display: flex;
  flex-direction: row;
  gap: 1.5rem;
  overflow-x: auto;
  padding-bottom: 1rem;
  scroll-snap-type: x mandatory;
}
.productos-grid::-webkit-scrollbar {
  display: none;
}
.productos-grid {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.tarjeta-producto {
  flex: 0 0 auto;
  width: 180px;
  scroll-snap-align: start;
  position: relative;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
  padding: 1rem;
  text-align: center;
  transition: transform 0.3s ease;
}
.tarjeta-producto:hover {
  transform: scale(1.05);
}
.dark .tarjeta-producto {
  background: #1e1e1e;
  color: #fff;
}
.imagen-anillo {
  width: 100%;
  height: 140px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 0.5rem;
  transition: transform 0.4s ease;
}
.tarjeta-producto:hover .imagen-anillo {
  transform: scale(1.1);
}
.precio {
  font-weight: bold;
  color: #333;
}
.dark .precio {
  color: #ddd;
}
.stock-disponible {
  font-size: 0.8rem;
  color: #666;
}
button {
  background: #000;
  color: #fff;
  border: none;
  padding: 0.5rem;
  border-radius: 8px;
  margin-top: 0.5rem;
  cursor: pointer;
  transition: background 0.3s;
}
button:disabled {
  background: #888;
  cursor: not-allowed;
}
button:hover {
  background: #444;
}
.etiqueta {
  background: crimson;
  color: #fff;
  padding: 0.2rem 0.5rem;
  font-size: 0.7rem;
  border-radius: 10px;
  display: inline-block;
  margin-bottom: 0.4rem;
}
.icono-favorito {
  position: absolute;
  top: 10px;
  right: 10px;
  color: #bbb;
  transition: color 0.3s;
  cursor: pointer;
}
.icono-favorito.favorito {
  color: crimson;
}
.estrellas {
  color: gold;
  margin: 0.3rem 0;
}
.fa-star {
  margin: 0 1px;
}
.rating-text {
  font-size: 0.7rem;
  margin-left: 4px;
}
.sin-stock {
  color: crimson;
  font-weight: bold;
  font-size: 0.9rem;
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.4s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
.toast {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: #333;
  color: white;
  padding: 0.7rem 1rem;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.3);
  z-index: 1000;
}
@media (max-width: 768px) {
  .main-layout {
    flex-direction: column;
  }
  .sidebar {
    width: 100%;
  }
}
</style>
