<template>
  <div :class="['app-container', darkMode ? 'dark' : '']">
    <!-- Navbar -->
    <Navbar :cartCount="cartStore.totalItems" />

    <!-- Layout -->
    <div class="main-layout">
      <!-- Filtros -->
      <aside class="sidebar">
        <h2>Filtros</h2>
        <input v-model="busqueda" placeholder="Buscar anillo..." />
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
            v-for="anillo in anillosFiltrados"
            :key="anillo.id"
            class="tarjeta-producto"
          >
            <div class="etiqueta" v-if="anillo.etiqueta">{{ anillo.etiqueta }}</div>

            <!-- Ícono de favorito -->
            <i
              class="fas fa-heart icono-favorito"
              :class="{ favorito: favoritos.includes(anillo.id) }"
              @click="toggleFavorito(anillo.id)"
              title="Añadir a favoritos"
            ></i>

            <!-- Imagen -->
            <img
              :src="anillo.imagen"
              :alt="anillo.nombre"
              class="imagen-anillo"
            />

            <!-- Nombre -->
            <h3>{{ anillo.nombre }}</h3>

            <!-- Calificación -->
            <div class="estrellas">
              <i
                v-for="n in 5"
                :key="n"
                class="fa-star"
                :class="n <= (anillo.rating || 4) ? 'fas' : 'far'"
              ></i>
              <span class="rating-text">({{ anillo.rating || 4 }}/5)</span>
            </div>

            <!-- Precio -->
            <p class="precio">${{ anillo.precio }}</p>

            <!-- Stock -->
            <p v-if="anillo.stock === 0" class="sin-stock">Sin stock</p>
            <p v-else class="stock-disponible">{{ anillo.stock }} disponibles</p>

            <!-- Botón agregar al carrito -->
            <button
              @click="agregarAlCarrito(anillo)"
              :disabled="anillo.stock === 0"
            >
              <i class="fas fa-cart-plus"></i> Añadir al carrito
            </button>
          </div>
        </transition-group>
      </section>
    </div>

    <!-- Toast -->
    <div v-if="toastVisible" class="toast">¡Producto añadido al carrito!</div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useCartStore } from '@/stores/useCartStore'
import Navbar from '@/components/Layout/Navbar.vue'

// Imágenes
import anillo1 from '@/assets/img-anillos/anillo1.jpeg'
import anillo2 from '@/assets/img-anillos/anillo2.jpeg'
import anillo3 from '@/assets/img-anillos/anillo3.jpeg'
import anillo4 from '@/assets/img-anillos/anillo4.jpeg'
import anillo5 from '@/assets/img-anillos/anillo5.jpeg'
import anillo6 from '@/assets/img-anillos/anillo6.jpeg'
import anillo7 from '@/assets/img-anillos/anillo7.jpeg'
import anillo8 from '@/assets/img-anillos/anillo8.jpeg'

// Store
const cartStore = useCartStore()

// Estado
const darkMode = ref(true)
const busqueda = ref('')
const precioMax = ref(1000)
const precioMin = ref(0)
const toastVisible = ref(false)

// Favoritos
const favoritos = ref(JSON.parse(localStorage.getItem('favoritos') || '[]'))

watch(favoritos, (val) => {
  localStorage.setItem('favoritos', JSON.stringify(val))
}, { deep: true })

// Anillos
const anillos = ref([
  { id: 1, nombre: 'Anillo Elegancia 1', precio: 120, imagen: anillo1, stock: 10, etiqueta: 'Nuevo', rating: 5 },
  { id: 2, nombre: 'Anillo Elegancia 2', precio: 150, imagen: anillo2, stock: 8, etiqueta: 'Popular', rating: 4 },
  { id: 3, nombre: 'Anillo Clásico 3', precio: 90, imagen: anillo3, stock: 12, etiqueta: '', rating: 4 },
  { id: 4, nombre: 'Anillo Minimalista 4', precio: 110, imagen: anillo4, stock: 9, etiqueta: 'Nuevo', rating: 3 },
  { id: 5, nombre: 'Anillo Fino 5', precio: 200, imagen: anillo5, stock: 6, etiqueta: 'Descuento', rating: 5 },
  { id: 6, nombre: 'Anillo Vintage 6', precio: 130, imagen: anillo6, stock: 11, etiqueta: '', rating: 4 },
  { id: 7, nombre: 'Anillo Estrella 7', precio: 175, imagen: anillo7, stock: 5, etiqueta: 'Popular', rating: 5 },
  { id: 8, nombre: 'Anillo Moderno 8', precio: 140, imagen: anillo8, stock: 7, etiqueta: '', rating: 3 }
])

onMounted(() => {
  darkMode.value = window.matchMedia('(prefers-color-scheme: dark)').matches
})

const anillosFiltrados = computed(() =>
  anillos.value.filter(
    (a) =>
      a.nombre.toLowerCase().includes(busqueda.value.toLowerCase()) &&
      a.precio <= precioMax.value &&
      a.precio >= precioMin.value
  )
)

// Métodos
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

const agregarAlCarrito = (anillo) => {
  if (anillo.stock > 0) {
    cartStore.agregarProducto(anillo)
    toastVisible.value = true
    setTimeout(() => {
      toastVisible.value = false
    }, 2000)
  }
}
</script>

<style scoped>
/* Fondo y tema */
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
.icono-favorito.favorito {
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
.rating-text {
  font-size: 0.7rem;
  margin-left: 4px;
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

/* Toast */
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
