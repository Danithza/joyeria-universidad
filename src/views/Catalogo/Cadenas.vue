<template>
  <div :class="['app-container', { 'dark-mode': darkMode }]">
    <!-- Navbar simplificado -->
    <nav class="navbar">
      <div class="navbar-left">
        <h1>Joyería Universidad</h1>
      </div>
      <div class="navbar-right">
        <button class="theme-toggle" @click="toggleTheme">
          <i :class="darkMode ? 'fas fa-sun' : 'fas fa-moon'"></i>
        </button>
        <div class="cart-icon">
          <i class="fas fa-shopping-cart"></i>
          <span class="cart-count">{{ cartCount }}</span>
        </div>
      </div>
    </nav>
    
    <!-- Contenido principal -->
    <main class="content-wrapper">
      <!-- Panel de filtros -->
      <aside class="filters-panel">
        <div class="filters-header">
          <h2>Filtros</h2>
          <button class="clear-filters" @click="resetFilters">
            <i class="fas fa-sync-alt"></i> Reiniciar
          </button>
        </div>
        
        <div class="filter-group">
          <label for="search">Buscar</label>
          <div class="search-input">
            <i class="fas fa-search"></i>
            <input 
              id="search"
              v-model="searchQuery" 
              placeholder="Buscar cadenas..." 
              type="search"
            />
          </div>
        </div>
        
        <div class="filter-group">
          <label>Rango de precios</label>
          <div class="price-range-display">
            <span>${{ priceRange[0] }}</span>
            <span>${{ priceRange[1] }}</span>
          </div>
          <div class="range-slider">
            <input 
              type="range" 
              v-model="priceRange[0]" 
              :min="0" 
              :max="1000"
              class="slider"
            >
            <input 
              type="range" 
              v-model="priceRange[1]" 
              :min="0" 
              :max="1000"
              class="slider"
            >
          </div>
        </div>
        
        <div class="filter-group">
          <label>Material</label>
          <div class="checkbox-group">
            <label v-for="material in materials" :key="material">
              <input 
                type="checkbox" 
                v-model="selectedMaterials" 
                :value="material"
              />
              {{ material }}
            </label>
          </div>
        </div>
        
        <div class="filter-group">
          <label>Ordenar por</label>
          <select v-model="sortBy" class="sort-select">
            <option value="default">Por defecto</option>
            <option value="price-asc">Precio: menor a mayor</option>
            <option value="price-desc">Precio: mayor a menor</option>
            <option value="rating">Mejor valorados</option>
            <option value="newest">Más nuevos</option>
          </select>
        </div>
      </aside>
      
      <!-- Galería de productos -->
      <section class="products-gallery">
        <div class="gallery-header">
          <h2>Cadenas de Oro</h2>
          <p class="results-count">{{ filteredChains.length }} productos encontrados</p>
        </div>
        
        <div v-if="loading" class="loading-overlay">
          <div class="spinner"></div>
        </div>
        
        <div v-if="filteredChains.length === 0" class="no-results">
          <i class="fas fa-search"></i>
          <h3>No se encontraron productos</h3>
          <p>Intenta ajustar tus filtros de búsqueda</p>
          <button @click="resetFilters">Limpiar todos los filtros</button>
        </div>
        
        <transition-group v-else name="fade-list" tag="div" class="products-grid">
          <div v-for="chain in filteredChains" :key="chain.id" class="product-card">
            <!-- Etiquetas -->
            <div v-if="chain.isNew" class="product-badge new">Nuevo</div>
            <div v-if="chain.isPopular" class="product-badge popular">Popular</div>
            
            <!-- Favorito -->
            <i 
              class="fas fa-heart favorite-icon" 
              :class="{ 'active': favorites.includes(chain.id) }"
              @click="toggleFavorite(chain.id)"
            ></i>
            
            <!-- Imagen del producto -->
            <div class="product-image-container">
              <img 
                :src="chain.image" 
                :alt="chain.name" 
                class="product-image"
                @click="showQuickView(chain)"
              >
            </div>
            
            <!-- Información del producto -->
            <div class="product-info">
              <h3 class="product-name">{{ chain.name }}</h3>
              
              <div class="product-rating">
                <i 
                  v-for="n in 5" 
                  :key="n"
                  :class="n <= Math.round(chain.rating) ? 'fas fa-star' : 'far fa-star'"
                ></i>
                <span>({{ chain.reviews }})</span>
              </div>
              
              <p class="product-price">${{ chain.price }}</p>
              
              <p class="product-stock" :class="{ 'out-of-stock': chain.stock === 0 }">
                {{ chain.stock === 0 ? 'Agotado' : `${chain.stock} disponibles` }}
              </p>
              
              <button 
                class="add-to-cart" 
                @click="addToCart(chain)"
                :disabled="chain.stock === 0"
              >
                <i class="fas fa-cart-plus"></i> Añadir al carrito
              </button>
            </div>
          </div>
        </transition-group>
      </section>
    </main>
    
    <!-- Toast notification -->
    <div v-if="toastVisible" class="toast-notification">
      <div class="toast-content">
        <i class="fas fa-check-circle"></i>
        <span>¡Producto añadido al carrito!</span>
      </div>
    </div>
    
    <!-- Quick View Modal -->
    <div v-if="quickViewProduct" class="modal-overlay" @click.self="quickViewProduct = null">
      <div class="quick-view-modal">
        <button class="close-modal" @click="quickViewProduct = null">
          <i class="fas fa-times"></i>
        </button>
        
        <div class="modal-content">
          <div class="modal-images">
            <img :src="quickViewProduct.image" :alt="quickViewProduct.name">
          </div>
          
          <div class="modal-info">
            <h2>{{ quickViewProduct.name }}</h2>
            
            <div class="modal-rating">
              <i 
                v-for="n in 5" 
                :key="n"
                :class="n <= Math.round(quickViewProduct.rating) ? 'fas fa-star' : 'far fa-star'"
              ></i>
              <span>{{ quickViewProduct.rating }} ({{ quickViewProduct.reviews }} reseñas)</span>
            </div>
            
            <p class="modal-price">${{ quickViewProduct.price }}</p>
            
            <p class="modal-description">{{ quickViewProduct.description }}</p>
            
            <div class="modal-details">
              <p><strong>Material:</strong> {{ quickViewProduct.material }}</p>
              <p><strong>Peso:</strong> {{ quickViewProduct.weight }}g</p>
              <p><strong>Longitud:</strong> {{ quickViewProduct.length }}cm</p>
            </div>
            
            <div class="modal-actions">
              <button 
                class="add-to-cart"
                @click="addToCart(quickViewProduct)"
                :disabled="quickViewProduct.stock === 0"
              >
                <i class="fas fa-cart-plus"></i> Añadir al carrito
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

// Estado de la aplicación
const darkMode = ref(false)
const cartCount = ref(0)
const loading = ref(false)
const toastVisible = ref(false)
const quickViewProduct = ref(null)

// Filtros
const searchQuery = ref('')
const priceRange = ref([0, 1000])
const selectedMaterials = ref([])
const sortBy = ref('default')
const favorites = ref([])

// Datos de productos
const chains = ref([
  {
    id: 1,
    name: 'Cadena de Oro Italiana 14k',
    price: 299,
    image: 'https://via.placeholder.com/300x300?text=Cadena+Oro+14k',
    stock: 15,
    material: 'Oro 14k',
    weight: 8.5,
    length: 50,
    rating: 4.8,
    reviews: 124,
    isNew: true,
    isPopular: true,
    description: 'Cadena de oro italiana de 14k con eslabones gruesos, ideal para uso diario o ocasiones especiales.'
  },
  {
    id: 2,
    name: 'Cadena de Oro Blanco 18k',
    price: 450,
    image: 'https://via.placeholder.com/300x300?text=Cadena+Oro+Blanco',
    stock: 8,
    material: 'Oro Blanco 18k',
    weight: 10.2,
    length: 45,
    rating: 4.6,
    reviews: 87,
    isNew: false,
    isPopular: true,
    description: 'Elegante cadena de oro blanco de 18k con acabado pulido para un look sofisticado.'
  },
  {
    id: 3,
    name: 'Cadena de Plata Sterling',
    price: 120,
    image: 'https://via.placeholder.com/300x300?text=Cadena+Plata',
    stock: 22,
    material: 'Plata',
    weight: 12.5,
    length: 55,
    rating: 4.3,
    reviews: 56,
    isNew: true,
    isPopular: false,
    description: 'Cadena de plata sterling 925 con diseño clásico y resistente para uso diario.'
  },
  {
    id: 4,
    name: 'Cadena de Oro Rolo 10k',
    price: 180,
    image: 'https://via.placeholder.com/300x300?text=Cadena+Oro+Rolo',
    stock: 0,
    material: 'Oro 10k',
    weight: 7.8,
    length: 60,
    rating: 4.0,
    reviews: 34,
    isNew: false,
    isPopular: false,
    description: 'Cadena de oro rolo de 10k con eslabones redondos y brillo intenso.'
  },
  {
    id: 5,
    name: 'Cadena de Oro Figaro 14k',
    price: 350,
    image: 'https://via.placeholder.com/300x300?text=Cadena+Figaro',
    stock: 12,
    material: 'Oro 14k',
    weight: 9.3,
    length: 50,
    rating: 4.9,
    reviews: 156,
    isNew: false,
    isPopular: true,
    description: 'Clásica cadena figaro de oro 14k con patrón distintivo y gran durabilidad.'
  },
  {
    id: 6,
    name: 'Cadena de Oro Cubana 24k',
    price: 850,
    image: 'https://via.placeholder.com/300x300?text=Cadena+Cubana',
    stock: 5,
    material: 'Oro 24k',
    weight: 22.7,
    length: 70,
    rating: 4.7,
    reviews: 42,
    isNew: true,
    isPopular: false,
    description: 'Lujosa cadena cubana de oro 24k con eslabones planos y gran presencia.'
  }
])

const materials = ['Oro 10k', 'Oro 14k', 'Oro 18k', 'Oro 24k', 'Plata', 'Oro Blanco']

// Computed
const filteredChains = computed(() => {
  let results = chains.value.filter(chain => {
    // Filtro de búsqueda
    const matchesSearch = chain.name.toLowerCase().includes(searchQuery.value.toLowerCase()) || 
                         chain.description.toLowerCase().includes(searchQuery.value.toLowerCase())
    
    // Filtro de precio
    const matchesPrice = chain.price >= priceRange.value[0] && chain.price <= priceRange.value[1]
    
    // Filtro de material
    const matchesMaterial = selectedMaterials.value.length === 0 || 
                           selectedMaterials.value.includes(chain.material)
    
    return matchesSearch && matchesPrice && matchesMaterial
  })
  
  // Ordenamiento
  switch(sortBy.value) {
    case 'price-asc':
      return results.sort((a, b) => a.price - b.price)
    case 'price-desc':
      return results.sort((a, b) => b.price - a.price)
    case 'rating':
      return results.sort((a, b) => b.rating - a.rating)
    case 'newest':
      return results.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0))
    default:
      return results.sort((a, b) => (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0))
  }
})

// Métodos
const toggleTheme = () => {
  darkMode.value = !darkMode.value
}

const resetFilters = () => {
  searchQuery.value = ''
  priceRange.value = [0, 1000]
  selectedMaterials.value = []
  sortBy.value = 'default'
}

const toggleFavorite = (id) => {
  const index = favorites.value.indexOf(id)
  if (index > -1) {
    favorites.value.splice(index, 1)
  } else {
    favorites.value.push(id)
  }
  // Guardar en localStorage
  localStorage.setItem('favorites', JSON.stringify(favorites.value))
}

const addToCart = (product) => {
  if (product.stock > 0) {
    cartCount.value += 1
    toastVisible.value = true
    setTimeout(() => toastVisible.value = false, 3000)
  }
}

const showQuickView = (product) => {
  quickViewProduct.value = product
}

// Lifecycle
onMounted(() => {
  // Simular carga de datos
  loading.value = true
  setTimeout(() => loading.value = false, 800)
  
  // Cargar favoritos del localStorage
  const savedFavorites = localStorage.getItem('favorites')
  if (savedFavorites) {
    favorites.value = JSON.parse(savedFavorites)
  }
})
</script>

<style scoped>
/* Variables CSS para el tema */
:root {
  --bg-color: #f8f9fa;
  --text-color: #333333;
  --card-bg: #ffffff;
  --border-color: #e0e0e0;
  --secondary-text: #666666;
  --input-bg: #ffffff;
  --hover-bg: #f5f5f5;
  --primary-color: #1976d2;
  --primary-hover: #1565c0;
  --success-color: #4caf50;
  --danger-color: #f44336;
  --warning-color: #ff9800;
  --star-color: #ffc107;
}

.dark-mode {
  --bg-color: #121212;
  --text-color: #ffffff;
  --card-bg: #1e1e1e;
  --border-color: #333;
  --secondary-text: #b0b0b0;
  --input-bg: #2d2d2d;
  --hover-bg: #2a2a2a;
}

/* Estilos base */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  line-height: 1.6;
}

.app-container {
  min-height: 100vh;
  background-color: var(--bg-color);
  color: var(--text-color);
  transition: background-color 0.3s ease, color 0.3s ease;
}

/* Navbar */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: var(--card-bg);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
}

.navbar h1 {
  font-size: 1.5rem;
  color: var(--primary-color);
}

.navbar-right {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.theme-toggle {
  background: none;
  border: none;
  color: var(--text-color);
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0.5rem;
}

.cart-icon {
  position: relative;
  font-size: 1.2rem;
  cursor: pointer;
}

.cart-count {
  position: absolute;
  top: -8px;
  right: -8px;
  background-color: var(--primary-color);
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.7rem;
  font-weight: bold;
}

/* Layout principal */
.content-wrapper {
  display: flex;
  max-width: 1400px;
  margin: 0 auto;
  padding: 6rem 20px 20px;
  gap: 30px;
}

/* Panel de filtros */
.filters-panel {
  width: 280px;
  flex-shrink: 0;
  background: var(--card-bg);
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  border: 1px solid var(--border-color);
  height: fit-content;
}

.dark-mode .filters-panel {
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

.filters-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.filters-header h2 {
  font-size: 1.3rem;
  font-weight: 600;
  margin: 0;
}

.clear-filters {
  background: none;
  border: none;
  color: var(--primary-color);
  cursor: pointer;
  font-size: 0.85rem;
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 5px;
}

.clear-filters:hover {
  text-decoration: underline;
}

.filter-group {
  margin-bottom: 25px;
}

.filter-group label {
  display: block;
  font-weight: 500;
  margin-bottom: 8px;
  font-size: 0.95rem;
}

.search-input {
  position: relative;
  display: flex;
  align-items: center;
}

.search-input i {
  position: absolute;
  left: 12px;
  color: var(--secondary-text);
}

.search-input input {
  width: 100%;
  padding: 10px 15px 10px 35px;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  background: var(--input-bg);
  color: var(--text-color);
  font-size: 0.9rem;
}

.price-range-display {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  font-size: 0.85rem;
  color: var(--secondary-text);
}

.range-slider {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 10px;
}

.slider {
  width: 100%;
  height: 6px;
  border-radius: 3px;
  background: var(--border-color);
  outline: none;
  -webkit-appearance: none;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: var(--primary-color);
  cursor: pointer;
}

.slider::-moz-range-thumb {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: var(--primary-color);
  cursor: pointer;
}

.checkbox-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.checkbox-group label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: normal;
  cursor: pointer;
  font-size: 0.9rem;
}

.checkbox-group input {
  accent-color: var(--primary-color);
}

.sort-select {
  width: 100%;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid var(--border-color);
  background: var(--input-bg);
  color: var(--text-color);
  font-size: 0.9rem;
  cursor: pointer;
}

/* Galería de productos */
.products-gallery {
  flex: 1;
}

.gallery-header {
  margin-bottom: 25px;
}

.gallery-header h2 {
  font-size: 1.5rem;
  margin: 0 0 5px 0;
  color: var(--text-color);
}

.results-count {
  color: var(--secondary-text);
  font-size: 0.9rem;
  margin: 0;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

/* Tarjeta de producto */
.product-card {
  position: relative;
  background: var(--card-bg);
  border-radius: 12px;
  padding: 15px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  overflow: hidden;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.product-badge {
  position: absolute;
  top: 10px;
  left: 10px;
  padding: 3px 8px;
  border-radius: 4px;
  font-size: 0.7rem;
  font-weight: bold;
  z-index: 1;
}

.product-badge.new {
  background-color: var(--primary-color);
  color: white;
}

.product-badge.popular {
  background-color: var(--success-color);
  color: white;
}

.favorite-icon {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 1.2rem;
  color: var(--secondary-text);
  cursor: pointer;
  z-index: 1;
  transition: color 0.2s ease;
}

.favorite-icon.active {
  color: var(--danger-color);
}

.favorite-icon:hover {
  color: var(--danger-color);
}

.product-image-container {
  width: 100%;
  height: 200px;
  margin-bottom: 15px;
  overflow: hidden;
  border-radius: 8px;
  cursor: pointer;
}

.product-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.product-image:hover {
  transform: scale(1.05);
}

.product-info {
  padding: 0 5px;
}

.product-name {
  font-size: 1rem;
  margin-bottom: 8px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.product-rating {
  display: flex;
  align-items: center;
  gap: 5px;
  margin-bottom: 8px;
  color: var(--star-color);
}

.product-rating i {
  font-size: 0.9rem;
}

.product-rating span {
  font-size: 0.8rem;
  color: var(--secondary-text);
}

.product-price {
  font-size: 1.1rem;
  font-weight: bold;
  margin-bottom: 5px;
  color: var(--text-color);
}

.product-stock {
  font-size: 0.85rem;
  margin-bottom: 12px;
  color: var(--secondary-text);
}

.product-stock.out-of-stock {
  color: var(--danger-color);
}

.add-to-cart {
  width: 100%;
  padding: 10px;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.add-to-cart:hover {
  background-color: var(--primary-hover);
}

.add-to-cart:disabled {
  background-color: var(--secondary-text);
  cursor: not-allowed;
}

/* Loading overlay */
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 5px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: var(--primary-color);
  animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* No results */
.no-results {
  text-align: center;
  padding: 50px 20px;
  color: var(--secondary-text);
}

.no-results i {
  font-size: 3rem;
  margin-bottom: 20px;
  color: var(--secondary-text);
}

.no-results h3 {
  font-size: 1.3rem;
  margin-bottom: 10px;
  color: var(--text-color);
}

.no-results p {
  margin-bottom: 20px;
}

.no-results button {
  background: var(--primary-color);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
}

.no-results button:hover {
  background: var(--primary-hover);
}

/* Toast notification */
.toast-notification {
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 1000;
  animation: slideIn 0.3s ease-out;
}

.toast-content {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 20px;
  background-color: var(--success-color);
  color: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.toast-content i {
  font-size: 1.2rem;
}

@keyframes slideIn {
  from { transform: translateX(100%); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
}

/* Modal de vista rápida */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.quick-view-modal {
  background-color: var(--card-bg);
  border-radius: 12px;
  width: 90%;
  max-width: 900px;
  max-height: 90vh;
  overflow-y: auto;
  padding: 20px;
  position: relative;
}

.close-modal {
  position: absolute;
  top: 15px;
  right: 15px;
  background: none;
  border: none;
  font-size: 1.2rem;
  color: var(--secondary-text);
  cursor: pointer;
}

.modal-content {
  display: flex;
  gap: 30px;
}

.modal-images {
  flex: 1;
}

.modal-images img {
  width: 100%;
  max-height: 400px;
  object-fit: contain;
  border-radius: 8px;
}

.modal-info {
  flex: 1;
  padding: 10px;
}

.modal-info h2 {
  margin-bottom: 15px;
  font-size: 1.5rem;
}

.modal-rating {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 15px;
  color: var(--star-color);
}

.modal-price {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 15px;
  color: var(--text-color);
}

.modal-description {
  margin-bottom: 20px;
  color: var(--secondary-text);
  line-height: 1.6;
}

.modal-details {
  margin-bottom: 20px;
}

.modal-details p {
  margin-bottom: 8px;
}

.modal-actions {
  margin-top: 25px;
}

/* Transiciones */
.fade-list-move,
.fade-list-enter-active,
.fade-list-leave-active {
  transition: all 0.5s ease;
}

.fade-list-enter-from,
.fade-list-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

.fade-list-leave-active {
  position: absolute;
}

/* Responsive */
@media (max-width: 1024px) {
  .content-wrapper {
    flex-direction: column;
  }
  
  .filters-panel {
    width: 100%;
  }
  
  .modal-content {
    flex-direction: column;
  }
}

@media (max-width: 768px) {
  .products-grid {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
  
  .navbar {
    padding: 1rem;
  }
  
  .navbar h1 {
    font-size: 1.2rem;
  }
}

@media (max-width: 480px) {
  .products-grid {
    grid-template-columns: 1fr;
  }
  
  .content-wrapper {
    padding: 6rem 15px 15px;
  }
  
  .quick-view-modal {
    width: 95%;
    padding: 15px;
  }
}
</style>