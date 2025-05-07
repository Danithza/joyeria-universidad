<template>
  <div class="home-container">
    <!-- Carrusel de Bootstrap -->
    <div id="carouselExampleAutoplaying" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-inner">
        <div 
          class="carousel-item" 
          v-for="(image, index) in images" 
          :class="{ active: index === 0 }" 
          :key="index"
        >
          <img :src="image" class="d-block w-100" alt="Imagen de joya">
        </div>
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Anterior</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Siguiente</span>
      </button>
    </div>

    <!-- Slogan dinámico -->
    <div class="slogan">
      <transition name="fade" mode="out-in">
        <h1 :key="currentIndex">{{ phrases[currentIndex] }}</h1>
      </transition>
    </div>

    <!-- Nuestro Catálogo -->
    <section class="section">
      <h2 class="section-title">📚 Nuestro Catálogo</h2>
      <div class="icon-grid catalogo-grid">
        <div
          v-for="(item, index) in catalogo"
          :key="index"
          class="catalogo-item"
        >
          <router-link :to="item.link" class="catalogo-link">
            <img :src="item.imagen" :alt="item.nombre" />
            <div class="catalogo-label">{{ item.nombre }}</div>
          </router-link>
        </div>
      </div>
    </section>

    <!-- Anillos -->
    <section class="section">
      <h2 class="section-title">💍 Anillos</h2>
      <div class="icon-grid">
        <img src="@/assets/img-home/img-promo-anillos/1.png" alt="Anillo A" />
        <img src="@/assets/img-home/img-promo-anillos/2.png" alt="Anillo B" />
        <img src="@/assets/img-home/img-promo-anillos/3.png" alt="Anillo C" />
        <img src="@/assets/img-home/img-promo-anillos/4.png" alt="Anillo D" />
      </div>
    </section>

    <!-- Pulseras -->
    <section class="section">
      <h2 class="section-title">📿 Pulseras</h2>
      <div class="icon-grid">
        <img src="@/assets/img-home/img-promo-pulseras/1.png" alt="Pulsera A" />
        <img src="@/assets/img-home/img-promo-pulseras/2.png" alt="Pulsera B" />
        <img src="@/assets/img-home/img-promo-pulseras/3.png" alt="Pulsera C" />
        <img src="@/assets/img-home/img-promo-pulseras/4.png" alt="Pulsera D" />
      </div>
    </section>

    <!-- Cadenas -->
    <section class="section">
      <h2 class="section-title">📿 Cadenas</h2>
      <div class="icon-grid">
        <img src="@/assets/img-home/img-promos-cadenas/collar1.jpg" alt="Cadena A" />
        <img src="@/assets/img-home/img-promos-cadenas/collar2.jpg" alt="Cadena B" />
        <img src="@/assets/img-home/img-promos-cadenas/collar3.jpg" alt="Cadena C" />
        <img src="@/assets/img-home/img-promos-cadenas/collar4.jpg" alt="Cadena D" />
      </div>
    </section>
  </div>
</template>


<script>
export default {
  data() {
    return {
      images: [],
      phrases: [
        "✨ Encuentra la joya perfecta para cada ocasión",
        "💎 Elegancia que brilla contigo",
        "🎁 Regalos inolvidables para quien amas",
        "👑 Tu estilo merece lo mejor"
      ],
      catalogo: [],
      currentIndex: 0
    };
  },
  created() {
    const imageFiles = import.meta.glob('@/assets/img-home/*.{jpg,jpeg,png,webp}', { eager: true });
    this.images = Object.values(imageFiles).map(img => img.default);

    // Configuración estática y clara
    const catalogoConfig = [
      { nombre: "Anillos", archivo: "anillos.webp", ruta: "/anillos" },
      { nombre: "Cadenas", archivo: "collar.jpg", ruta: "/cadenas" },
      { nombre: "Piercing", archivo: "piercing.jpg", ruta: "/piercing" },
      { nombre: "Pulseras", archivo: "pulceras.jpg", ruta: "/pulseras" },  // ojo: sin mayúscula ni tilde
      { nombre: "Relojes", archivo: "reloj.jpg", ruta: "/relojes" }       // ojo: sin mayúscula
    ];

    const catalogoImages = import.meta.glob('@/assets/img-home/catalogo/*.{jpg,jpeg,png,webp}', { eager: true });

    this.catalogo = catalogoConfig.map(item => {
      const ruta = Object.keys(catalogoImages).find(path =>
        path.toLowerCase().includes(item.archivo.toLowerCase())
      );
      return {
        nombre: item.nombre,
        imagen: catalogoImages[ruta]?.default || '',
        link: item.ruta
      };
    });

    // Frases animadas
    setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.phrases.length;
    }, 2000);
  }
}
</script>


<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');

.catalogo-item {
  width: 180px;
  height: 220px;
  background: #d1d1d1; /* Gris clarito para la base */
  border-radius: 20px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.2);
  overflow: hidden;
  transition: transform 0.3s;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}

.catalogo-item:hover {
  transform: scale(1.05);
}

.catalogo-link {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color: inherit;
  width: 100%;
  height: 100%;
  margin-top: 13px;
}

.catalogo-label {
  margin-top: 12px;
  font-weight: bold;
  font-size: 1.1rem;
  color: #333;
}

.home-container {
  background: linear-gradient(to bottom, #ffffff, #e0e0e0);
  color: #333;
  font-family: 'Poppins', sans-serif;
  text-align: center;
  padding-top: 80px; /* separado del navbar */
}

.carousel-inner img {
  object-fit: cover;
  border-radius: 10px;
}

.carousel {
  margin-bottom: 30px;
  max-width: 99%;
  margin-left: auto;
  margin-right: auto;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

/* Slogan */
.slogan {
  top: 100px;
  margin-bottom: 50px;
}

.slogan h1 {
  font-size: 2.2rem;
  font-weight: 600;
  color: #b88c3a;
}

/* Secciones */
.section {
  margin: 60px 20px;
}

.section-title {
  font-size: 2rem;
  margin-bottom: 15px;
  color: #444;
}

.section-text {
  font-size: 1.1rem;
  color: #666;
  max-width: 600px;
  margin: 0 auto 40px;
}

.icon-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  margin-top: 20px;
}

/* Estilos para las imágenes dentro del catálogo */
.catalogo-grid img {
  width: 160px;
  height: 160px;
  border-radius: 20px;
}

/* Estilos para las imágenes de anillos, pulseras, métodos de pago */
.icon-grid > img {
  width: 228px;
  height: 299px;
  object-fit: cover;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s;
}

.icon-grid > img:hover {
  transform: scale(1.05);
}


/* Responsivo */
@media (max-width: 768px) {
  .carousel-inner img {
    height: 300px;
  }

  .slogan h1 {
    font-size: 1.7rem;
  }

}

@media (max-width: 480px) {
  .carousel-inner img {
    height: 200px;
  }

  .icon-grid img {
    width: 100px;
    height: 100px;
  }
}

/* Transición entre frases */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.8s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
