<template>
  <!-- Contenedor principal con clase dinámica para modo oscuro -->
  <div :class="['app-container', darkMode ? 'dark' : '']">
    <!-- Componente Navbar con el número de items en el carrito -->
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
    <Navbar :cartCount="cartStore.totalItems" />

    <!-- Layout principal con sidebar y galería -->
    <div class="main-layout">
      <!-- Sidebar con filtros -->
      <aside class="sidebar">
        <h2 class="titulo-filtros">Filtrar relojes</h2>

        <!-- Filtro de búsqueda -->
        <div class="filtro">
          <label for="busqueda">Buscar</label>
          <input v-model="busqueda" id="busqueda" placeholder="Buscar reloj..." />
        </div>

        <!-- Filtro de precio con rango -->
        <div class="filtro">
          <label>Precio</label>
          <div class="rangos">
            <input type="range" v-model="precioMin" min="0" max="100000" />
            <input type="range" v-model="precioMax" min="0" max="100000" />
          </div>
          <div class="valores-precio">
            <span>Mín: ${{ precioMin }}</span>
            <span>Máx: ${{ precioMax }}</span>
          </div>
        </div>

        <!-- Botón para limpiar filtros -->
        <button class="btn-limpiar" @click="limpiarFiltros">Limpiar filtros</button>
      </aside>

      <!-- Sección de galería de productos -->
      <section class="galeria">
        <!-- Lista de productos con animación de transición -->
        <transition-group name="fade" tag="div" class="productos-grid">
          <!-- Tarjeta de producto individual -->
          <div
            v-for="reloj in relojesFiltrados"
            :key="reloj.id"
            class="tarjeta-producto"
            @click="verDetalles(reloj)"
          >
            <!-- Icono de favoritos -->
            <i
              class="fas fa-heart icono-favorito"
              :class="{ favorito: favoritos.includes(reloj.id) }"
              @click.stop="toggleFavorito(reloj.id)"
              title="Añadir a favoritos"
            ></i>

            <!-- Imagen del producto -->
            <img :src="reloj.imagen" :alt="reloj.nombre" class="imagen-reloj" />
            <h3>{{ reloj.nombre }}</h3>

            <!-- Valoración con estrellas -->
            <div class="estrellas">
              <i v-for="n in 5" :key="n" class="fa-star" :class="n <= (reloj.rating || 4) ? 'fas' : 'far'"></i>
              <span class="rating-text">({{ reloj.rating || 4 }}/5)</span>
            </div>

            <!-- Precio del producto -->
            <p class="precio">${{ reloj.precio.toLocaleString('es-MX') }}</p>

            <!-- Botón para añadir al carrito -->
            <button @click.stop="agregarAlCarrito(reloj)">
              <i class="fas fa-cart-plus"></i> Añadir al carrito
            </button>
          </div>
        </transition-group>
      </section>
    </div>

    <!-- Modal para detalles del producto -->
    <div v-if="modalVisible" class="modal-overlay" @click.self="cerrarModal">
      <div class="modal-content">
        <!-- Botón para cerrar el modal -->
        <button class="modal-close" @click="cerrarModal">&times;</button>
        
        <!-- Cuerpo del modal -->
        <div class="modal-body">
          <!-- Contenedor de la imagen -->
          <div class="modal-image-container">
            <img :src="relojSeleccionado.imagen" :alt="relojSeleccionado.nombre" class="modal-image" />
          </div>
          
          <!-- Detalles del producto -->
          <div class="modal-details">
            <h2>{{ relojSeleccionado.nombre }}</h2>
            
            <!-- Fila de detalle: Precio -->
            <div class="detail-row">
              <span class="detail-label">Precio:</span>
              <span class="detail-value">${{ relojSeleccionado.precio.toLocaleString('es-MX') }}</span>
            </div>
            
            <!-- Fila de detalle: Material -->
            <div class="detail-row">
              <span class="detail-label">Material:</span>
              <span class="detail-value">{{ relojSeleccionado.material }}</span>
            </div>
            
            <!-- Fila de detalle: Tamaño -->
            <div class="detail-row">
              <span class="detail-label">Tamaño:</span>
              <span class="detail-value">{{ relojSeleccionado.tamano }}</span>
            </div>
            
            <!-- Fila de detalle: Descripción -->
            <div class="detail-row description">
              <span class="detail-label">Descripción:</span>
              <p class="detail-value">{{ relojSeleccionado.descripcion }}</p>
            </div>
            
            <!-- Acciones del modal -->
            <div class="modal-actions">
              <button class="btn-add-to-cart" @click="agregarAlCarrito(relojSeleccionado)">
                <i class="fas fa-cart-plus"></i> Añadir al carrito
              </button>
              <button class="btn-close" @click="cerrarModal">Cerrar</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Notificación toast para añadir al carrito -->
    <div v-if="toastVisible" class="toast">¡Producto añadido al carrito!</div>
  </div>
</template>

<script setup>
// Importaciones de Vue y componentes
import { ref, computed, onMounted, watch } from 'vue'
import { useCartStore } from '@/stores/useCartStore'
import Navbar from '@/components/Layout/Navbar.vue'

// Importación de imágenes de relojs
import reloj1 from '@/assets/img-collares/collar1.jpg'
import reloj2 from '@/assets/img-collares/collar2.jpg'
import reloj3 from '@/assets/img-collares/collar3.jpg'
import reloj4 from '@/assets/img-collares/collar4.jpg'
import reloj5 from '@/assets/img-collares/collar5.jpg'
import reloj6 from '@/assets/img-collares/collar6.jpg'
import reloj7 from '@/assets/img-collares/collar7.jpg'
import reloj8 from '@/assets/img-collares/collar8.jpg'

// Inicialización del store del carrito
const cartStore = useCartStore()

// Variables reactivas
const darkMode = ref(true) // Control del modo oscuro
const busqueda = ref('') // Texto de búsqueda
const precioMax = ref(100000) // Precio máximo para filtrar
const precioMin = ref(0) // Precio mínimo para filtrar
const toastVisible = ref(false) // Visibilidad del toast
const modalVisible = ref(false) // Visibilidad del modal
const relojSeleccionado = ref({}) // reloj seleccionado para el modal

// Favoritos almacenados en localStorage
const favoritos = ref(JSON.parse(localStorage.getItem('favoritos') || '[]'))

// Watcher para guardar favoritos en localStorage
watch(favoritos, (val) => {
  localStorage.setItem('favoritos', JSON.stringify(val))
}, { deep: true })

// Lista de relojs disponibles
const relojes = ref([
  { id: 1, nombre: 'Cadena Oro Brillante Clásica', precio: 95000, imagen: reloj1, material: 'Oro', tamano: 'Tamaño Único', descripcion: 'Una cadena de oro tradicional con eslabones finos y acabado pulido. Ideal para quienes buscan elegancia sin excesos. Perfecta para uso diario o combinar con dijes delicados.', rating: 5 },
  { id: 2, nombre: 'Cadena de Oro Gruesa Trenzada', precio: 920000, imagen: reloj2, material: 'Oro Rosa', tamano: 'Tamaño 7', descripcion: 'Diseño robusto y llamativo con trenzado artesanal. Esta cadena impone presencia y estilo, ideal para quienes buscan destacar en cualquier ocasión.', rating: 4 },
  { id: 3, nombre: 'Cadena Oro Rosa Minimalista', precio: 75000, imagen: reloj3, material: 'Oro', tamano: 'Tamaño 6', descripcion: 'Fina, delicada y moderna. El tono suave del oro rosa la convierte en la elección ideal para quienes aprecian los detalles sutiles y el diseño contemporáneo.', rating: 4 },
  { id: 4, nombre: 'Cadena de Oro con Dije de Cruz', precio: 82000, imagen: reloj4, material: 'Oro', tamano: 'Tamaño 8', descripcion: 'Cadena delgada de oro de 14k con un dije de cruz elegante. Representa estilo y espiritualidad con un diseño clásico y duradero.', rating: 3 },
  { id: 5, nombre: 'Cadena de Oro Cubana Maciza', precio: 83500, imagen: reloj5, material: 'Oro Blanco', tamano: 'Tamaño 6', descripcion: 'Cadena de eslabones anchos tipo cubana, pulida a mano. El complemento perfecto para un look urbano con clase, resistente y con peso real.', rating: 5 },
  { id: 6, nombre: 'Cadena de Oro con Eslabón Figaro', precio: 98000, imagen: reloj6, material: 'Oro', tamano: 'Tamaño 7', descripcion: 'Combinación de eslabones largos y cortos en un patrón tradicional italiano. Un estilo sofisticado que nunca pasa de moda.', rating: 4 },
  { id: 7, nombre: 'Cadena de Oro Texturizada Mate', precio: 64900, imagen: reloj7, material: 'Oro', tamano: 'Tamaño 9', descripcion: 'Un diseño único con acabado mate y detalles texturizados. Ideal para quienes prefieren un estilo sobrio y elegante. .', rating: 5 },
  { id: 8, nombre: 'Cadena de Oro con Chapa Personalizada', precio: 79800, imagen: reloj8, material: 'Oro', tamano: 'Tamaño 7', descripcion: 'Cadena delicada que incluye una chapa para grabado. Perfecta para regalar con iniciales, nombres o fechas especiales.', rating: 3 }
])

// Al montar el componente, verificar preferencia de modo oscuro del sistema
onMounted(() => {
  darkMode.value = window.matchMedia('(prefers-color-scheme: dark)').matches
})

// Computed: Filtra los relojes según búsqueda y rango de precios
const relojesFiltrados = computed(() =>
relojes.value.filter(
    (a) =>
      a.nombre.toLowerCase().includes(busqueda.value.toLowerCase()) &&
      a.precio <= precioMax.value &&
      a.precio >= precioMin.value
  )
)

// Función para limpiar todos los filtros
const limpiarFiltros = () => {
  busqueda.value = ''
  precioMax.value = 100000
  precioMin.value = 0
}

// Función para alternar un reloj como favorito
const toggleFavorito = (id) => {
  favoritos.value = favoritos.value.includes(id)
    ? favoritos.value.filter(f => f !== id)
    : [...favoritos.value, id]
}

// Función para añadir un reloj al carrito
const agregarAlCarrito = (reloj) => {
  cartStore.agregarProducto(reloj)
  toastVisible.value = true
  setTimeout(() => {
    toastVisible.value = false
  }, 2000)
}

// Función para mostrar detalles de un reloj en el modal
const verDetalles = (reloj) => {
  relojSeleccionado.value = reloj
  modalVisible.value = true
}

// Función para cerrar el modal
const cerrarModal = () => {
  modalVisible.value = false
}
</script>

<style scoped>
/* Estilos del contenedor principal */
.app-container {
  background-color: #f5f5f5;
  min-height: 100vh;
  padding-top: 100px;
}

/* Estilos para modo oscuro */
.dark {
  background-color: #121212;
  color: #fff;
}

/* Layout principal */
.main-layout {
  display: flex;
  gap: 2rem;
  padding: 2rem;
  flex-wrap: wrap;
}

/* Estilos del sidebar */
.sidebar {
  width: 250px;
  background: #1c1c1c;
  padding: 1.5rem;
  border-radius: 12px;
  color: #fff;
}

/* Título de los filtros */
.titulo-filtros {
  font-size: 1.2rem;
  margin-bottom: 1rem;
}

/* Estilos de cada filtro */
.filtro {
  margin-bottom: 1.5rem;
}

/* Etiquetas de los filtros */
.filtro label {
  display: block;
  margin-bottom: 0.3rem;
  font-weight: bold;
}

/* Input de texto para búsqueda */
.filtro input[type="text"] {
  width: 100%;
  padding: 0.5rem;
  border-radius: 8px;
  border: none;
}

/* Contenedor de rangos de precio */
.rangos input {
  width: 100%;
  margin-bottom: 0.3rem;
}

/* Valores de precio mínimo y máximo */
.valores-precio {
  display: flex;
  justify-content: space-between;
  font-size: 0.85rem;
  margin-top: 0.3rem;
}

/* Botón para limpiar filtros */
.btn-limpiar {
  width: 100%;
  padding: 0.6rem;
  border-radius: 8px;
  border: none;
  background-color: crimson;
  color: #fff;
  font-weight: bold;
  cursor: pointer;
}

/* Estilos de la galería */
.galeria {
  flex: 1;
}

/* Grid de productos */
.productos-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
}

/* Tarjeta de producto individual */
.tarjeta-producto {
  position: relative;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
  padding: 1rem;
  text-align: center;
  transition: transform 0.3s ease;
  cursor: pointer;
}

/* Efecto hover en tarjeta de producto */
.tarjeta-producto:hover {
  transform: scale(1.05);
}

/* Modo oscuro para tarjetas de producto */
.dark .tarjeta-producto {
  background: #1e1e1e;
  color: #fff;
}

/* Imagen del reloj */
.imagen-reloj {
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 0.5rem;
  transition: transform 0.4s ease;
}

/* Efecto hover en imagen */
.tarjeta-producto:hover .imagen-reloj {
  transform: scale(1.1);
}

/* Estilos del precio */
.precio {
  font-weight: bold;
  color: #333;
}

/* Modo oscuro para precio */
.dark .precio {
  color: #ddd;
}

/* Estilos generales de botones */
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

/* Botón deshabilitado */
button:disabled {
  background: #888;
  cursor: not-allowed;
}

/* Efecto hover en botones */
button:hover {
  background: #444;
}

/* Icono de favoritos */
.icono-favorito {
  position: absolute;
  top: 10px;
  right: 10px;
  color: #bbb;
  transition: color 0.3s;
  cursor: pointer;
}

/* Estado activo de favoritos */
.icono-favorito.favorito {
  color: crimson;
}

/* Estilos de valoración con estrellas */
.estrellas {
  color: gold;
  margin: 0.3rem 0;
}

/* Estilos individuales de estrellas */
.fa-star {
  margin: 0 1px;
}

/* Texto de rating */
.rating-text {
  font-size: 0.7rem;
  margin-left: 4px;
}

/* Animaciones de transición */
.fade-enter-active, .fade-leave-active {
  transition: opacity 1s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

/* Estilos del modal overlay */
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
  backdrop-filter: blur(5px);
  animation: fadeIn 0.3s ease;
}

/* Contenido del modal */
.modal-content {
  background: #fff;
  border-radius: 12px;
  width: 90%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
  position: relative;
  animation: slideUp 0.4s ease;
}

/* Modo oscuro para modal */
.dark .modal-content {
  background: #2a2a2a;
  color: #fff;
}

/* Botón para cerrar modal */
.modal-close {
  position: absolute;
  top: 15px;
  right: 15px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #666;
  transition: color 0.2s;
  z-index: 10;
}

/* Efecto hover en botón de cerrar */
.modal-close:hover {
  color: #000;
}

/* Modo oscuro para botón de cerrar */
.dark .modal-close {
  color: #aaa;
}

.dark .modal-close:hover {
  color: #fff;
}

/* Cuerpo del modal */
.modal-body {
  display: flex;
  flex-direction: column;
  padding: 2rem;
}

/* Contenedor de imagen en modal */
.modal-image-container {
  margin-bottom: 1.5rem;
  text-align: center;
}

/* Imagen en modal */
.modal-image {
  max-width: 100%;
  max-height: 300px;
  border-radius: 8px;
  object-fit: contain;
}

/* Detalles del producto en modal */
.modal-details {
  flex: 1;
}

/* Título en modal */
.modal-details h2 {
  margin-bottom: 1.5rem;
  color: #333;
  font-size: 1.8rem;
}

/* Modo oscuro para título en modal */
.dark .modal-details h2 {
  color: #fff;
}

/* Fila de detalle */
.detail-row {
  display: flex;
  margin-bottom: 1rem;
  align-items: flex-start;
}

/* Fila de descripción */
.detail-row.description {
  flex-direction: column;
}

/* Etiqueta de detalle */
.detail-label {
  font-weight: bold;
  min-width: 120px;
  color: #555;
}

/* Modo oscuro para etiqueta */
.dark .detail-label {
  color: #ccc;
}

/* Valor de detalle */
.detail-value {
  flex: 1;
  color: #333;
}

/* Modo oscuro para valor */
.dark .detail-value {
  color: #eee;
}

/* Acciones del modal */
.modal-actions {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  justify-content: flex-end;
}

/* Botón para añadir al carrito */
.btn-add-to-cart {
  background-color: #4CAF50;
  color: white;
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

/* Efecto hover en botón de añadir */
.btn-add-to-cart:hover {
  background-color: #3e8e41;
}

/* Botón para cerrar modal */
.btn-close {
  background-color: #f44336;
  color: white;
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s;
}

/* Efecto hover en botón de cerrar */
.btn-close:hover {
  background-color: #d32f2f;
}

/* Animación de fade in */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* Animación de slide up */
@keyframes slideUp {
  from { 
    opacity: 0;
    transform: translateY(20px);
  }
  to { 
    opacity: 1;
    transform: translateY(0);
  }
}

/* Estilos responsivos */
@media (max-width: 768px) {
  .modal-body {
    flex-direction: column;
  }
  
  .modal-image {
    max-height: 200px;
  }
  
  .modal-actions {
    flex-direction: column;
  }
  
  .btn-add-to-cart, .btn-close {
    width: 100%;
    justify-content: center;
  }
}

/* Estilos del toast */
.toast {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #4CAF50;
  color: white;
  padding: 12px 24px;
  border-radius: 4px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  animation: slideIn 0.3s ease, fadeOut 0.5s ease 1.5s forwards;
}

/* Animación de slide in para toast */
@keyframes slideIn {
  from { bottom: -50px; opacity: 0; }
  to { bottom: 20px; opacity: 1; }
}

/* Animación de fade out para toast */
@keyframes fadeOut {
  from { opacity: 1; }
  to { opacity: 0; }
}
</style>