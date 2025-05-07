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
        <h2 class="titulo-filtros"><i class="fas fa-filter"></i> Filtrar collares</h2>
        <div class="card-filtro">
          <label><i class="fas fa-search"></i> Buscar:</label>
          <input v-model="busqueda" placeholder="Buscar collar..." />
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
            v-for="collar in collaresFiltrados"
            :key="collar.id"
            class="tarjeta-producto horizontal"
          >
            <img
              :src="collar.imagen"
              :alt="collar.nombre"
              class="imagen-horizontal"
              @click="abrirModal(collar)"
            />
            <div class="info-horizontal">
              <h3>{{ collar.nombre }}</h3>
              <div class="estrellas">
                <i
                  v-for="n in 5"
                  :key="n"
                  class="fa-star"
                  :class="n <= (collar.rating || 4) ? 'fas' : 'far'"
                ></i>
                <span class="rating-num">({{ collar.rating }}/5)</span>
              </div>
              <p class="precio">${{ collar.precio.toLocaleString() }} COP</p>
              <button @click="agregarAlCarrito(collar)">
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
          <img :src="collarSeleccionado.imagen" :alt="collarSeleccionado.nombre" class="modal-imagen" />
        </div>
        <div class="modal-info">
          <h2>{{ collarSeleccionado.nombre }}</h2>
          <div class="estrellas">
            <i
              v-for="n in 5"
              :key="n"
              class="fa-star"
              :class="n <= (collarSeleccionado.rating || 4) ? 'fas' : 'far'"
            ></i>
            <span class="rating-num">({{ collarSeleccionado.rating }}/5)</span>
          </div>
          <p class="modal-precio">${{ collarSeleccionado.precio.toLocaleString() }} COP</p>
          <p class="modal-descripcion">{{ collarSeleccionado.descripcion }}</p>
          <div class="modal-botones">
            <button @click="agregarAlCarrito(collarSeleccionado)" class="modal-comprar">
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

import collar1 from '@/assets/img-collares/collar1.jpg'
import collar2 from '@/assets/img-collares/collar2.jpg'
import collar3 from '@/assets/img-collares/collar3.jpg'
import collar4 from '@/assets/img-collares/collar4.jpg'
import collar5 from '@/assets/img-collares/collar5.jpg'
import collar6 from '@/assets/img-collares/collar6.jpg'
import collar7 from '@/assets/img-collares/collar7.jpg'
import collar8 from '@/assets/img-collares/collar8.jpg'

const cartStore = useCartStore()
const isSidebarOpen = ref(false)

const collares = ref([
  {
    id: 1,
    nombre: 'collar Clásico Oro',
    precio: 80000,
    imagen: collar1,
    rating: 4,
    descripcion: 'collar en oro de 18k con diseño clásico y elegante, perfecto para cualquier ocasión.'
  },
  {
    id: 2,
    nombre: 'collar Diamante Solitario',
    precio: 250000,
    imagen: collar2,
    rating: 5,
    descripcion: 'collar con diamante solitario en montura de plata esterlina, ideal para compromisos.'
  },
  {
    id: 3,
    nombre: 'collar Plata Grabado',
    precio: 140000,
    imagen: collar3,
    rating: 4,
    descripcion: 'collar de plata con grabados artesanales y detalles únicos.'
  },
  {
    id: 4,
    nombre: 'collar Moderno Oro Blanco',
    precio: 190000,
    imagen: collar4,
    rating: 4,
    descripcion: 'Diseño contemporáneo en oro blanco con líneas limpias y sofisticadas.'
  },
  {
    id: 5,
    nombre: 'collar Piedras Preciosas',
    precio: 200000,
    imagen: collar5,
    rating: 5,
    descripcion: 'collar con combinación de piedras preciosas en diversos colores.'
  },
  {
    id: 6,
    nombre: 'collar Minimalista Plata',
    precio: 170000,
    imagen: collar6,
    rating: 4,
    descripcion: 'Diseño minimalista en plata pura para un look discreto pero elegante.'
  },
  {
    id: 7,
    nombre: 'collar Vintage',
    precio: 45000,
    imagen: collar7,
    rating: 4,
    descripcion: 'Estilo vintage inspirado en diseños antiguos con un toque romántico.'
  },
  {
    id: 8,
    nombre: 'collar Boda Oro Amarillo',
    precio: 190000,
    imagen: collar8,
    rating: 5,
    descripcion: 'collar de boda en oro amarillo de 18k con acabado pulido brillante.'
  }
])

const darkMode = ref(true)
const busqueda = ref('')
const precioMax = ref(1000000)
const precioMin = ref(0)
const modalAbierto = ref(false)
const collarSeleccionado = ref(null)

// Control del scroll al abrir/cerrar sidebar
watch(isSidebarOpen, (newVal) => {
  document.body.style.overflow = newVal ? 'hidden' : 'auto'
})

onMounted(() => {
  darkMode.value = window.matchMedia('(prefers-color-scheme: dark)').matches
})

const collaresFiltrados = computed(() =>
collares.value.filter(
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

const agregarAlCarrito = (collar) => {
  cartStore.agregarProducto(collar)
}

const abrirModal = (collar) => {
  collarSeleccionado.value = collar
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
  min-height: 100vh;
  background-color: #f5f5f5;
}

.main-layout {
  display: flex;
  padding: 20px;
  margin-top: 80px; /* Ajuste para el navbar fijo */
}

.sidebar {
  width: 250px;
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-right: 20px;
}

.galeria {
  flex: 1;
}

</style>

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

/* Estilos del Modal */
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
  
  .modal-contenido {
    flex-direction: column;
    width: 90%;
    max-height: 90vh;
  }
  
  .modal-imagen-container {
    padding: 1rem;
  }
  
  .modal-info {
    padding: 1.5rem;
  }
  
  .modal-botones {
    flex-direction: column;
  }
}
</style>