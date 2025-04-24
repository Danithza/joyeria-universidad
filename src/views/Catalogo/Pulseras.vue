<template>
  <div :class="['app-container', darkMode ? 'dark' : '']">
    <Navbar :cartCount="cartStore.totalItems" />

    <div class="main-layout">
      <!-- FILTROS -->
      <aside class="sidebar">
        <h2 class="titulo-filtros"><i class="fas fa-filter"></i> Filtrar pulseras</h2>
        <div class="card-filtro">
          <label><i class="fas fa-search"></i> Buscar:</label>
          <input v-model="busqueda" placeholder="Buscar pulsera..." />
        </div>
        <div class="card-filtro">
          <label><i class="fas fa-dollar-sign"></i> Precio mínimo</label>
          <input type="range" v-model="precioMin" min="0" max="1000000" />
          <span>${{ precioMin.toLocaleString() }} COP</span>
        </div>
        <div class="card-filtro">
          <label><i class="fas fa-dollar-sign"></i> Precio máximo</label>
          <input type="range" v-model="precioMax" min="0" max="1000000" />
          <span>${{ precioMax.toLocaleString() }} COP</span>
        </div>
        <button @click="limpiarFiltros">
          <i class="fas fa-times-circle"></i> Limpiar filtros
        </button>
      </aside>

      <!-- GALERÍA -->
      <section class="galeria">
        <div class="grid-horizontal">
          <div
            v-for="pulsera in pulserasFiltradas"
            :key="pulsera.id"
            class="tarjeta-producto horizontal"
          >
            <img
              :src="pulsera.imagen"
              :alt="pulsera.nombre"
              class="imagen-horizontal"
            />
            <div class="info-horizontal">
              <h3>{{ pulsera.nombre }}</h3>
              <div class="estrellas">
                <i
                  v-for="n in 5"
                  :key="n"
                  class="fa-star"
                  :class="n <= (pulsera.rating || 4) ? 'fas' : 'far'"
                ></i>
                <span class="rating-num">({{ pulsera.rating }}/5)</span>
              </div>
              <p class="precio">${{ pulsera.precio.toLocaleString() }} COP</p>
              <button @click="agregarAlCarrito(pulsera)">
                <i class="fas fa-cart-plus"></i> Añadir al carrito
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useCartStore } from '@/stores/useCartStore'
import Navbar from '@/components/Layout/Navbar.vue'

import pulsera1 from '@/assets/img-pulseras/pulsera1.jpg'
import pulsera2 from '@/assets/img-pulseras/pulsera2.jpg'
import pulsera3 from '@/assets/img-pulseras/pulsera3.jpg'
import pulsera4 from '@/assets/img-pulseras/pulsera4.jpg'

const cartStore = useCartStore()

const pulseras = ref([
  {
    id: 1,
    nombre: 'Pulsera Elegante Dorada',
    precio: 85000,
    imagen: pulsera1,
    rating: 4
  },
  {
    id: 2,
    nombre: 'Pulsera Plata Brillante',
    precio: 120000,
    imagen: pulsera2,
    rating: 5
  },
  {
    id: 3,
    nombre: 'Pulsera Minimalista',
    precio: 65000,
    imagen: pulsera3,
    rating: 4
  },
  {
    id: 4,
    nombre: 'Pulsera Vintage',
    precio: 95000,
    imagen: pulsera4,
    rating: 5
  }
])

const darkMode = ref(true)
const busqueda = ref('')
const precioMax = ref(1000000)
const precioMin = ref(0)

onMounted(() => {
  darkMode.value = window.matchMedia('(prefers-color-scheme: dark)').matches
})

const pulserasFiltradas = computed(() =>
  pulseras.value.filter(
    (p) =>
      p.nombre.toLowerCase().includes(busqueda.value.toLowerCase()) &&
      p.precio <= precioMax.value &&
      p.precio >= precioMin.value
  )
)

const limpiarFiltros = () => {
  busqueda.value = ''
  precioMax.value = 1000000
  precioMin.value = 0
}

const agregarAlCarrito = (pulsera) => {
  cartStore.agregarProducto(pulsera)
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
  width: 240px;
  background: #1c1c1c;
  padding: 1.5rem;
  border-radius: 16px;
  color: #fff;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.titulo-filtros {
  font-size: 1.2rem;
  margin-bottom: 1rem;
}
.card-filtro {
  background: #2a2a2a;
  border-radius: 12px;
  padding: 0.8rem;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}
.card-filtro input[type='range'] {
  cursor: pointer;
}
.sidebar input,
.sidebar button {
  border-radius: 8px;
  padding: 0.5rem;
  border: none;
}
.sidebar input {
  background: #f0f0f0;
  color: #000;
}
.sidebar button {
  background: #e91e63;
  color: #fff;
  font-weight: bold;
  margin-top: 1rem;
  transition: background 0.3s;
}
.sidebar button:hover {
  background: #c2185b;
}

.galeria {
  flex: 1;
}
.grid-horizontal {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}

.tarjeta-producto {
  background: #fff;
  border-radius: 16px;
  padding: 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
  transition: transform 0.3s ease;
}
.tarjeta-producto:hover {
  transform: scale(1.02);
}
.dark .tarjeta-producto {
  background: #1e1e1e;
  color: #fff;
}

.tarjeta-producto.horizontal {
  display: flex;
  align-items: center;
  gap: 1rem;
  text-align: left;
}

.imagen-horizontal {
  width: 140px;
  height: 140px;
  object-fit: cover;
  border-radius: 12px;
  flex-shrink: 0;
}

.info-horizontal {
  flex: 1;
}

.precio {
  font-weight: bold;
  margin-top: 0.5rem;
  color: #333;
}
.dark .precio {
  color: #ddd;
}

button {
  background: #000;
  color: #fff;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  margin-top: 0.5rem;
  cursor: pointer;
  transition: background 0.3s;
}
button:hover {
  background: #444;
}

.estrellas {
  color: gold;
  margin: 0.3rem 0;
}
.fa-star {
  margin: 0 1px;
}

.rating-num {
  font-size: 0.9rem;
  margin-left: 6px;
  color: #bbb;
}

@media (max-width: 768px) {
  .main-layout {
    flex-direction: column;
  }
  .sidebar {
    width: 100%;
  }
  .grid-horizontal {
    grid-template-columns: 1fr;
  }
}
</style>
