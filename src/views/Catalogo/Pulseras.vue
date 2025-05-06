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
        <h2 class="titulo-filtros"><i class="fas fa-filter"></i> Filtrar Pulseras</h2>
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
            v-for="pulsera in pulserasFiltradas"
            :key="pulsera.id"
            class="tarjeta-producto horizontal"
          >
            <img
              :src="pulsera.imagen"
              :alt="pulsera.nombre"
              class="imagen-horizontal"
              @click="abrirModal(pulsera)"
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

    <!-- MODAL DE DETALLES -->
    <div v-if="modalAbierto" class="modal-overlay" @click.self="cerrarModal">
      <div class="modal-contenido">
        <button class="modal-cerrar" @click="cerrarModal">
          <i class="fas fa-times"></i>
        </button>
        <div class="modal-imagen-container">
          <img :src="pulseraSeleccionada.imagen" :alt="pulseraSeleccionada.nombre" class="modal-imagen" />
        </div>
        <div class="modal-info">
          <h2>{{ pulseraSeleccionada.nombre }}</h2>
          <div class="estrellas">
            <i
              v-for="n in 5"
              :key="n"
              class="fa-star"
              :class="n <= (pulseraSeleccionada.rating || 4) ? 'fas' : 'far'"
            ></i>
            <span class="rating-num">({{ pulseraSeleccionada.rating }}/5)</span>
          </div>
          <p class="modal-precio">${{ pulseraSeleccionada.precio.toLocaleString() }} COP</p>
          <p class="modal-descripcion">Pulseras ultramega radiantes</p>
          <div class="modal-botones">
            <button @click="agregarAlCarrito(pulseraSeleccionada)" class="modal-comprar">
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

// Importaciones actualizadas para coincidir con tus nombres de archivo
import pulsera1 from '@/assets/img-pulseras/pulsera1.jpg'
import pulsera2 from '@/assets/img-pulseras/pulsera2.jpg'
import pulsera3 from '@/assets/img-pulseras/pulsera3.jpg'
import pulsera4 from '@/assets/img-pulseras/pulsera4.jpg'
import pulsera5 from '@/assets/img-pulseras/pulsera5.jpg'
import pulsera6 from '@/assets/img-pulseras/pulsera6.jpg'
import pulsera7 from '@/assets/img-pulseras/pulsera7.jpg'
import pulsera8 from '@/assets/img-pulseras/pulsera8.jpg'

const cartStore = useCartStore()
const isSidebarOpen = ref(false)

const pulseras = ref([
  {
    id: 1,
    nombre: 'Pulsera Elegante Dorada',
    precio: 85000,
    imagen: pulsera1,
    rating: 4,
    descripcion: 'Pulsera dorada con detalles elegantes, perfecta para ocasiones especiales.'
  },
  {
    id: 2,
    nombre: 'Pulsera Plata Brillante',
    precio: 120000,
    imagen: pulsera2,
    rating: 5,
    descripcion: 'Pulsera de plata con acabado brillante que destaca en cualquier ocasión.'
  },
  {
    id: 3,
    nombre: 'Pulsera Minimalista',
    precio: 65000,
    imagen: pulsera3,
    rating: 4,
    descripcion: 'Diseño minimalista para quienes prefieren la elegancia sencilla.'
  },
  {
    id: 4,
    nombre: 'Pulsera Vintage',
    precio: 95000,
    imagen: pulsera4,
    rating: 5,
    descripcion: 'Estilo vintage con un toque retro que nunca pasa de moda.'
  },
  {
    id: 5,
    nombre: 'Pulsera Perlas Elegantes',
    precio: 110000,
    imagen: pulsera5,
    rating: 5,
    descripcion: 'Pulsera con perlas naturales que añaden un toque de sofisticación.'
  },
  {
    id: 6,
    nombre: 'Pulsera Corazón Romántica',
    precio: 75000,
    imagen: pulsera6,
    rating: 4,
    descripcion: 'Diseño romántico con detalles en forma de corazón, ideal para regalar.'
  },
  {
    id: 7,
    nombre: 'Pulsera Bohemia Colorida',
    precio: 88000,
    imagen: pulsera7,
    rating: 4,
    descripcion: 'Estilo bohemio con colores vibrantes para un look alegre y juvenil.'
  },
  {
    id: 8,
    nombre: 'Pulsera Diamante Lujoso',
    precio: 150000,
    imagen: pulsera8,
    rating: 5,
    descripcion: 'Pulsera con incrustaciones que simulan diamantes para ocasiones especiales.'
  }
])

const darkMode = ref(true)
const busqueda = ref('')
const precioMax = ref(1000000)
const precioMin = ref(0)
const modalAbierto = ref(false)
const pulseraSeleccionada = ref(null)

// Control del scroll al abrir/cerrar sidebar
watch(isSidebarOpen, (newVal) => {
  document.body.style.overflow = newVal ? 'hidden' : 'auto'
})

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

const abrirModal = (pulsera) => {
  pulseraSeleccionada.value = pulsera
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

.sidebar-filters {
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