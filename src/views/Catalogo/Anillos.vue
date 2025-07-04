<template>
  <div :class="['app-container', darkMode ? 'dark' : '']">
    <!-- Navbar con el botón hamburguesa -->
    <Navbar 
      :cartCount="cartStore.totalItems" 
      @toggle-sidebar="isSidebarOpen = !isSidebarOpen" 
    />

    <!-- Sidebar controlado por isSidebarOpen -->
    <Sidebar 
      :isOpen="isSidebarOpen" 
      @close="isSidebarOpen = false" 
    />

    <div class="main-layout">
      <!-- FILTROS -->
      <aside class="sidebar">
        <h2 class="titulo-filtros"><i class="fas fa-filter"></i> Filtrar anillos</h2>
        <div class="card-filtro">
          <label><i class="fas fa-search"></i> Buscar:</label>
          <input v-model="busqueda" placeholder="Buscar anillo..." />
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
            v-for="anillo in anillosFiltrados"
            :key="anillo.id"
            class="tarjeta-producto horizontal"
          >
            <img
              :src="anillo.imagen"
              :alt="anillo.nombre"
              class="imagen-horizontal"
              @click="abrirModal(anillo)"
            />
            <div class="info-horizontal">
              <h3>{{ anillo.nombre }}</h3>
              <div class="estrellas">
                <i
                  v-for="n in 5"
                  :key="n"
                  class="fa-star"
                  :class="n <= (anillo.rating || 4) ? 'fas' : 'far'"
                ></i>
                <span class="rating-num">({{ anillo.rating }}/5)</span>
              </div>
              <p class="precio">${{ anillo.precio.toLocaleString() }} COP</p>
              <button @click="agregarAlCarrito(anillo)">
                <i class="fas fa-cart-plus"></i> Añadir al carrito
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>

    <!-- MODAL DE DETALLES -->
    <div v-if="modalAbierto" class="modal-overlay" @click.self="cerrarModal">
      <div class="modal-contenido">
        <button class="modal-cerrar" @click="cerrarModal">
          <i class="fas fa-times"></i>
        </button>
        <div class="modal-imagen-container">
          <img :src="anilloSeleccionado.imagen" :alt="anilloSeleccionado.nombre" class="modal-imagen" />
        </div>
        <div class="modal-info">
          <h2>{{ anilloSeleccionado.nombre }}</h2>
          <div class="estrellas">
            <i
              v-for="n in 5"
              :key="n"
              class="fa-star"
              :class="n <= (anilloSeleccionado.rating || 4) ? 'fas' : 'far'"
            ></i>
            <span class="rating-num">({{ anilloSeleccionado.rating }}/5)</span>
          </div>
          <p class="modal-precio">${{ anilloSeleccionado.precio.toLocaleString() }} COP</p>
          <p class="modal-descripcion">{{ anilloSeleccionado.descripcion }}</p>
          <div class="modal-botones">
            <button @click="agregarAlCarrito(anilloSeleccionado)" class="modal-comprar">
              <i class="fas fa-cart-plus"></i> Añadir al carrito
            </button>
            <button @click="cerrarModal" class="modal-cerrar-btn">
              <i class="fas fa-times"></i> Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useCartStore } from '@/stores/useCartStore'
import Navbar from '@/components/Layout/Navbar.vue'
import Sidebar from '@/components/Layout/Sidebar.vue'

import anillo1 from '@/assets/img-anillos/anillo1.jpeg'
import anillo2 from '@/assets/img-anillos/anillo2.jpeg'
import anillo3 from '@/assets/img-anillos/anillo3.jpeg'
import anillo4 from '@/assets/img-anillos/anillo4.jpeg'
import anillo5 from '@/assets/img-anillos/anillo5.jpeg'
import anillo6 from '@/assets/img-anillos/anillo6.jpeg'
import anillo7 from '@/assets/img-anillos/anillo7.jpeg'
import anillo8 from '@/assets/img-anillos/anillo8.jpeg'

const cartStore = useCartStore()
const isSidebarOpen = ref(false)

const anillos = ref([
  {
    id: 1,
    nombre: 'Anillo Clásico Oro',
    precio: 120000,
    imagen: anillo1,
    rating: 4,
    descripcion: 'Anillo en oro de 18k con diseño clásico y elegante, perfecto para cualquier ocasión.'
  },
  {
    id: 2,
    nombre: 'Anillo Diamante Solitario',
    precio: 250000,
    imagen: anillo2,
    rating: 5,
    descripcion: 'Anillo con diamante solitario en montura de plata esterlina, ideal para compromisos.'
  },
  {
    id: 3,
    nombre: 'Anillo Plata Grabado',
    precio: 85000,
    imagen: anillo3,
    rating: 4,
    descripcion: 'Anillo de plata con grabados artesanales y detalles únicos.'
  },
  {
    id: 4,
    nombre: 'Anillo Moderno Oro Blanco',
    precio: 180000,
    imagen: anillo4,
    rating: 4,
    descripcion: 'Diseño contemporáneo en oro blanco con líneas limpias y sofisticadas.'
  },
  {
    id: 5,
    nombre: 'Anillo Piedras Preciosas',
    precio: 150000,
    imagen: anillo5,
    rating: 5,
    descripcion: 'Anillo con combinación de piedras preciosas en diversos colores.'
  },
  {
    id: 6,
    nombre: 'Anillo Minimalista Plata',
    precio: 70000,
    imagen: anillo6,
    rating: 4,
    descripcion: 'Diseño minimalista en plata pura para un look discreto pero elegante.'
  },
  {
    id: 7,
    nombre: 'Anillo Vintage',
    precio: 95000,
    imagen: anillo7,
    rating: 4,
    descripcion: 'Estilo vintage inspirado en diseños antiguos con un toque romántico.'
  },
  {
    id: 8,
    nombre: 'Anillo Boda Oro Amarillo',
    precio: 200000,
    imagen: anillo8,
    rating: 5,
    descripcion: 'Anillo de boda en oro amarillo de 18k con acabado pulido brillante.'
  }
])

const darkMode = ref(true)
const busqueda = ref('')
const precioMax = ref(1000000)
const precioMin = ref(0)
const modalAbierto = ref(false)
const anilloSeleccionado = ref(null)

// Control del scroll al abrir/cerrar sidebar
watch(isSidebarOpen, (newVal) => {
  document.body.style.overflow = newVal ? 'hidden' : 'auto'
})

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

const limpiarFiltros = () => {
  busqueda.value = ''
  precioMax.value = 1000000
  precioMin.value = 0
}

const agregarAlCarrito = (anillo) => {
  cartStore.agregarProducto(anillo)
}

const abrirModal = (anillo) => {
  anilloSeleccionado.value = anillo
  modalAbierto.value = true
  document.body.style.overflow = 'hidden'
}

const cerrarModal = () => {
  modalAbierto.value = false
  document.body.style.overflow = isSidebarOpen.value ? 'hidden' : 'auto'
}
</script>

<style scoped>
.app-container {
  background-color: #f5f5f5;
  min-height: 100vh;
  padding-top: 80px;
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
  cursor: pointer;
  transition: transform 0.3s;
}
.imagen-horizontal:hover {
  transform: scale(1.05);
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

/* MODAL */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
.modal-contenido {
  background: #fff;
  border-radius: 16px;
  width: 80%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
  display: flex;
  position: relative;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
}
.dark .modal-contenido {
  background: #1e1e1e;
  color: #fff;
}
.modal-cerrar {
  position: absolute;
  top: 15px;
  right: 15px;
  background: transparent;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #666;
}
.dark .modal-cerrar {
  color: #aaa;
}
.modal-cerrar:hover {
  color: #000;
}
.dark .modal-cerrar:hover {
  color: #fff;
}

.modal-imagen-container {
  flex: 1;
  padding: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal-imagen {
  max-width: 100%;
  max-height: 400px;
  border-radius: 12px;
  object-fit: contain;
}
.modal-info {
  flex: 1;
  padding: 2rem;
  display: flex;
  flex-direction: column;
}
.modal-precio {
  font-size: 1.5rem;
  font-weight: bold;
  margin: 1rem 0;
  color: #333;
}
.dark .modal-precio {
  color: #ddd;
}
.modal-descripcion {
  margin: 1rem 0;
  line-height: 1.6;
  color: #666;
}
.dark .modal-descripcion {
  color: #aaa;
}
.modal-botones {
  display: flex;
  gap: 1rem;
  margin-top: auto;
}
.modal-comprar {
  background: #e91e63;
  color: white;
  flex: 1;
  padding: 0.8rem;
}
.modal-comprar:hover {
  background: #c2185b;
}
.modal-cerrar-btn {
  background: #666;
  color: white;
  flex: 1;
  padding: 0.8rem;
}
.modal-cerrar-btn:hover {
  background: #555;
}
.dark .modal-cerrar-btn {
  background: #444;
}
.dark .modal-cerrar-btn:hover {
  background: #333;
}

/* RESPONSIVE */
@media (max-width: 1200px) {
  .grid-horizontal {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 1024px) {
  .main-layout {
    flex-direction: column;
  }
  .sidebar {
    width: 100%;
  }
  .grid-horizontal {
    grid-template-columns: 1fr;
  }
  .modal-contenido {
    flex-direction: column;
    width: 90%;
  }
  .modal-imagen-container,
  .modal-info {
    padding: 1rem;
  }
  .modal-botones {
    flex-direction: column;
  }
}
@media (max-width: 600px) {
  .imagen-horizontal {
    width: 100px;
    height: 100px;
  }
  .tarjeta-producto.horizontal {
    flex-direction: column;
    align-items: flex-start;
  }
  .modal-imagen {
    max-height: 250px;
  }
}
</style>