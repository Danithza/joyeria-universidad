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

    <!-- Botón flotante de WhatsApp -->
    <a href="https://wa.me/573106164105" class="whatsapp-button" target="_blank" rel="noopener noreferrer">
      <img src="https://cdn-icons-png.flaticon.com/512/3670/3670051.png" alt="WhatsApp">
    </a>
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
      { nombre: "Pulseras", archivo: "pulceras.jpg", ruta: "/pulseras" },
      { nombre: "Relojes", archivo: "reloj.jpg", ruta: "/relojes" }
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

.home-container {
  background: linear-gradient(to bottom, #121212, #000000);
  color: #ffffff;
  font-family: 'Poppins', sans-serif;
  text-align: center;
  padding-top: 80px;
  min-height: 100vh;
}

/* Carrusel */
.carousel-inner img {
  height: 500px;
  object-fit: cover;
  border-radius: 10px;
  border: 1px solid #333;
}

.carousel {
  margin-bottom: 40px;
  max-width: 99%;
  margin-left: auto;
  margin-right: auto;
  box-shadow: 0 4px 20px rgba(255, 255, 255, 0.1);
}

.carousel-control-prev-icon,
.carousel-control-next-icon {
  filter: invert(1);
}

/* Slogan */
.slogan {
  margin: 40px 0 60px;
}

.slogan h1 {
  font-size: 2.5rem;
  font-weight: 600;
  color: #d4af37;
  padding: 0 20px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
}

/* Secciones */
.section {
  margin: 70px 20px;
}

.section-title {
  font-size: 2.2rem;
  margin-bottom: 25px;
  color: #ffffff;
}

.section-text {
  font-size: 1.2rem;
  color: #cccccc;
  max-width: 700px;
  margin: 0 auto 50px;
}

/* Grid de imágenes */
.icon-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  justify-content: center;
  margin-top: 30px;
  padding: 0 20px;
}

/* Imágenes de productos */
.icon-grid > img {
  width: 300px;
  height: 400px;
  object-fit: cover;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(255, 255, 255, 0.1);
  border: 1px solid #333;
  transition: all 0.3s ease;
}

.icon-grid > img:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 20px rgba(255, 255, 255, 0.2);
  border-color: #d4af37;
}

/* Estilos para el catálogo */
.catalogo-item {
  width: 200px;
  height: 250px;
  background: #1e1e1e;
  border-radius: 20px;
  box-shadow: 0 4px 12px rgba(255, 255, 255, 0.05);
  overflow: hidden;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  border: 1px solid #333;
}

.catalogo-item:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 18px rgba(255, 255, 255, 0.1);
  border-color: #d4af37;
}

.catalogo-link {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color: #ffffff;
  width: 100%;
  height: 100%;
  padding-top: 15px;
}

.catalogo-grid img {
  width: 180px;
  height: 180px;
  border-radius: 20px;
  object-fit: cover;
  border: 1px solid #333;
}

.catalogo-label {
  margin-top: 15px;
  font-weight: bold;
  font-size: 1.2rem;
  color: #ffffff;
}

/* Transición entre frases */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.8s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

/* Botón de WhatsApp flotante */
.whatsapp-button {
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 60px;
  height: 60px;
  background-color: #25D366;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(37, 211, 102, 0.3);
  z-index: 1000;
  transition: all 0.3s ease;
}

.whatsapp-button:hover {
  transform: scale(1.1);
  box-shadow: 0 6px 16px rgba(37, 211, 102, 0.4);
}

.whatsapp-button img {
  width: 36px;
  height: 36px;
}

/* ------------------------- */
/* MEDIA QUERIES RESPONSIVE */
/* ------------------------- */

/* Tablets grandes (1025px - 1200px) */
@media (max-width: 1200px) {
  .icon-grid > img {
    width: 280px;
    height: 380px;
  }
}

/* Tablets (768px - 1024px) */
@media (max-width: 1024px) {
  .carousel-inner img {
    height: 400px;
  }

  .slogan h1 {
    font-size: 2rem;
  }

  .section-title {
    font-size: 1.9rem;
  }

  .icon-grid > img {
    width: 240px;
    height: 320px;
  }

  .catalogo-item {
    width: 180px;
    height: 230px;
  }

  .catalogo-grid img {
    width: 160px;
    height: 160px;
  }
}

/* Tablets pequeñas (600px - 767px) */
@media (max-width: 767px) {
  .home-container {
    padding-top: 70px;
  }

  .carousel-inner img {
    height: 300px;
  }

  .slogan h1 {
    font-size: 1.6rem;
  }

  .section {
    margin: 50px 15px;
  }

  .section-title {
    font-size: 1.7rem;
  }

  .icon-grid {
    gap: 25px;
  }

  .icon-grid > img {
    width: 220px;
    height: 300px;
  }

  .catalogo-item {
    width: 160px;
    height: 210px;
  }

  .catalogo-grid img {
    width: 140px;
    height: 140px;
  }

  .whatsapp-button {
    width: 50px;
    height: 50px;
    bottom: 20px;
    right: 20px;
  }
  
  .whatsapp-button img {
    width: 30px;
    height: 30px;
  }
}

/* Móviles (480px - 599px) */
@media (max-width: 599px) {
  .icon-grid > img {
    width: 180px;
    height: 250px;
  }

  .catalogo-item {
    width: 140px;
    height: 190px;
  }

  .catalogo-grid img {
    width: 120px;
    height: 120px;
  }

  .catalogo-label {
    font-size: 1.1rem;
  }
}

/* Móviles pequeños (hasta 479px) */
@media (max-width: 479px) {
  .carousel-inner img {
    height: 250px;
  }

  .slogan h1 {
    font-size: 1.4rem;
  }

  .section-title {
    font-size: 1.5rem;
  }

  .icon-grid {
    gap: 20px;
  }

  .icon-grid > img {
    width: 160px;
    height: 220px;
  }

  .catalogo-item {
    width: 130px;
    height: 180px;
  }

  .catalogo-grid img {
    width: 110px;
    height: 110px;
  }

  .catalogo-label {
    font-size: 1rem;
  }
}
</style>