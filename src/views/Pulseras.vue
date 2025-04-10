<template>
  <div :class="['app-container', darkMode ? 'dark' : '']">
    <!-- Navbar -->
    <Navbar :cartCount="cartStore.totalItems" />

    <!-- Layout -->
    <div class="main-layout">
      <!-- Filtros -->
      <aside class="sidebar">
        <h2>Filtros</h2>
        <input v-model="busqueda" placeholder="Buscar pulsera..." />
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
            v-for="pulsera in pulserasFiltradas"
            :key="pulsera.id"
            class="tarjeta-producto"
          >
            <div class="etiqueta" v-if="pulsera.etiqueta">{{ pulsera.etiqueta }}</div>
            <i class="fas fa-heart icono-favorito"></i>

            <img
              :src="pulsera.imagen"
              :alt="pulsera.nombre"
              class="imagen-producto"
            />

            <h3>{{ pulsera.nombre }}</h3>

            <!-- Calificación -->
            <div class="estrellas">
              <i
                v-for="n in 5"
                :key="n"
                class="fa-star"
                :class="n <= (pulsera.rating || 4) ? 'fas' : 'far'"
              ></i>
            </div>

            <p class="precio">${{ pulsera.precio }}</p>

            <p v-if="pulsera.stock === 0" class="sin-stock">Sin stock</p>

            <button
              @click="agregarAlCarrito(pulsera)"
              :disabled="pulsera.stock === 0"
            >
              <i class="fas fa-cart-plus"></i> Añadir al carrito
            </button>
          </div>
        </transition-group>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useCartStore } from '@/stores/useCartStore'
import Navbar from '@/components/Navbar.vue'

// Importar imágenes de pulseras
import pulsera1 from '@/assets/img-pulseras/pulsera1.jpg'
import pulsera2 from '@/assets/img-pulseras/pulsera2.jpg'
import pulsera3 from '@/assets/img-pulseras/pulsera3.jpg'
import pulsera4 from '@/assets/img-pulseras/pulsera4.jpg'

// Carrito store
const cartStore = useCartStore()

// Lista de pulseras con imágenes importadas
const pulseras = ref([
  {
    id: 1,
    nombre: 'Pulsera Elegante Dorada',
    precio: 85,
    imagen: pulsera1,
    stock: 12,
    etiqueta: 'Nuevo',
    rating: 4
  },
  {
    id: 2,
    nombre: 'Pulsera Plata Brillante',
    precio: 120,
    imagen: pulsera2,
    stock: 8,
    etiqueta: 'Popular',
    rating: 5
  },
  {
    id: 3,
    nombre: 'Pulsera Minimalista',
    precio: 65,
    imagen: pulsera3,
    stock: 15,
    etiqueta: '',
    rating: 4
  },
  {
    id: 4,
    nombre: 'Pulsera Vintage',
    precio: 95,
    imagen: pulsera4,
    stock: 10,
    etiqueta: 'Exclusivo',
    rating: 5
  }
])

// Estado visual
const darkMode = ref(true)
const busqueda = ref('')
const precioMax = ref(1000)
const precioMin = ref(0)

// Detectar modo oscuro del sistema automáticamente
onMounted(() => {
  darkMode.value = window.matchMedia('(prefers-color-scheme: dark)').matches
})

// Computado: aplicar filtros
const pulserasFiltradas = computed(() =>
  pulseras.value.filter(
    (p) =>
      p.nombre.toLowerCase().includes(busqueda.value.toLowerCase()) &&
      p.precio <= precioMax.value &&
      p.precio >= precioMin.value
  )
)

// Métodos
const limpiarFiltros = () => {
  busqueda.value = ''
  precioMax.value = 1000
  precioMin.value = 0
}

const agregarAlCarrito = (pulsera) => {
  if (pulsera.stock > 0) {
    cartStore.agregarProducto(pulsera)
  }
}
</script>

<style scoped>
/* Fondo general */
.app-container {
  background-color: #f5f5f5;
  min-height: 100vh;
  padding-top: 100px;
}
.dark {
  background-color: #121212;
  color: #fff;
}

/* Layout */
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

/* Galería */
.galeria {
  flex: 1;
}
.productos-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 1.5rem;
}

/* Tarjeta */
.tarjeta-producto {
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
.imagen-producto {
  width: 100%;
  height: 140px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 0.5rem;
  transition: transform 0.4s ease;
}
.tarjeta-producto:hover .imagen-producto {
  transform: scale(1.1);
}
.precio {
  font-weight: bold;
  color: #333;
}
.dark .precio {
  color: #ddd;
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

/* Etiquetas */
.etiqueta {
  background: crimson;
  color: #fff;
  padding: 0.2rem 0.5rem;
  font-size: 0.7rem;
  border-radius: 10px;
  display: inline-block;
  margin-bottom: 0.4rem;
}

/* Icono favorito */
.icono-favorito {
  position: absolute;
  top: 10px;
  right: 10px;
  color: #bbb;
  transition: color 0.3s;
  cursor: pointer;
}
.icono-favorito:hover {
  color: crimson;
}

/* Estrellas */
.estrellas {
  color: gold;
  margin: 0.3rem 0;
}
.fa-star {
  margin: 0 1px;
}

/* Sin stock */
.sin-stock {
  color: crimson;
  font-weight: bold;
  font-size: 0.9rem;
}

/* Transición */
.fade-enter-active,
.fade-leave-active {
  transition: all 0.4s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

/* Responsive */
@media (max-width: 768px) {
  .main-layout {
    flex-direction: column;
  }
  .sidebar {
    width: 100%;
  }
}
</style>