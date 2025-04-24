<template>
  <div class="home-container">
    <!-- Título de bienvenida -->
    <div class="welcome-container" data-aos="fade-down" data-aos-mirror="fade-up">
      <h1 class="welcome-title">
        ¡Bienvenido a nuestra joyería!
        <span class="diamond">💎</span>
      </h1>
      <p class="slogan">{{ currentSlogan }}</p>
    </div>

    <!-- Carrusel de Bootstrap -->
    <div id="carouselExampleAutoplaying" class="carousel slide" data-bs-ride="carousel" data-aos="fade-up" data-aos-mirror="fade-down">
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

    <!-- Nuestro catálogo -->
    <section class="section" data-aos="fade-right" data-aos-mirror="fade-left">
      <h2 class="section-title">📚 Nuestro Catálogo</h2>
      <p class="section-text">Explora nuestras colecciones de joyas con diseño único y materiales de calidad.</p>
    </section>

    <!-- Ofertas destacadas -->
    <section class="section" data-aos="fade-left" data-aos-mirror="fade-right">
      <h2 class="section-title">🔥 Ofertas Destacadas</h2>
      <p class="section-text">No te pierdas las promociones especiales por tiempo limitado.</p>
      <div class="payment-icons">
        <img src="@/assets/img-home/img-promos-detacadas/a.png" alt="A" data-aos="zoom-in" data-aos-delay="100"/>
        <img src="@/assets/img-home/img-promos-detacadas/b.png" alt="B" data-aos="zoom-in" data-aos-delay="200"/>
        <img src="@/assets/img-home/img-promos-detacadas/c.png" alt="C" data-aos="zoom-in" data-aos-delay="300"/>
        <img src="@/assets/img-home/img-promos-detacadas/d.png" alt="D" data-aos="zoom-in" data-aos-delay="400"/>
      </div>
    </section>

    <!-- Anillos -->
    <section class="section" data-aos="fade-up-right" data-aos-mirror="fade-up-left">
      <h2 class="section-title">💍 Anillos</h2>
      <p class="section-text">Descubre nuestra colección de anillos elegantes y modernos.</p>
      <div class="ring-icons">
        <img src="@/assets/img-home/img-promo-anillos/ani1.jpeg" alt="Anillo A" data-aos="flip-left" data-aos-delay="100"/>
        <img src="@/assets/img-home/img-promo-anillos/ani2.jpeg" alt="Anillo B" data-aos="flip-left" data-aos-delay="200"/>
        <img src="@/assets/img-home/img-promo-anillos/ani3.jpeg" alt="Anillo C" data-aos="flip-left" data-aos-delay="300"/>
        <img src="@/assets/img-home/img-promo-anillos/ani4.jpeg" alt="Anillo D" data-aos="flip-left" data-aos-delay="400"/>
      </div>
    </section>

    <!-- Pulseras -->
    <section class="section" data-aos="fade-up-left" data-aos-mirror="fade-up-right">
      <h2 class="section-title">📿 Pulseras</h2>
      <p class="section-text">Descubre nuestra colección de pulseras elegantes y modernas.</p>
      <div class="bracelet-icons">
        <img src="@/assets/img-home/img-promo-pulseras/pul1.jpeg" alt="Pulsera A" data-aos="flip-right" data-aos-delay="100"/>
        <img src="@/assets/img-home/img-promo-pulseras/pul2.jpeg" alt="Pulsera B" data-aos="flip-right" data-aos-delay="200"/>
        <img src="@/assets/img-home/img-promo-pulseras/pul3.jpeg" alt="Pulsera C" data-aos="flip-right" data-aos-delay="300"/>
        <img src="@/assets/img-home/img-promo-pulseras/pul4.jpeg" alt="Pulsera D" data-aos="flip-right" data-aos-delay="400"/>
      </div>
    </section>

    <!-- Métodos de pago -->
    <section class="section payment-methods" data-aos="zoom-in" data-aos-mirror="zoom-out">
      <h2 class="section-title">💳 Métodos de Pago</h2>
      <div class="payment-icons">
        <img src="@/assets/img-home/img-metodos-pago/bancolombia.jpg" alt="Bancolombia" data-aos="fade-up" data-aos-delay="100"/>
        <img src="@/assets/img-home/img-metodos-pago/nequi.avif" alt="Nequi" data-aos="fade-up" data-aos-delay="200"/>
        <img src="@/assets/img-home/img-metodos-pago/pse-.png" alt="Pse" data-aos="fade-up" data-aos-delay="300"/>
      </div>
    </section>
  </div>
</template>

<script>
import AOS from 'aos';
import 'aos/dist/aos.css';

export default {
  data() {
    return {
      images: [],
      slogans: [
        "Brilla con nuestra joyería.",
        "Cada joya cuenta una historia.",
        "Lujo y elegancia a tu alcance.",
        "Descubre la belleza en cada detalle."
      ],
      currentSlogan: "Brilla con nuestra joyería."
    };
  },
  created() {
    const imageFiles = import.meta.glob('@/assets/img-home/*.png', { eager: true });
    this.images = Object.values(imageFiles).map(img => img.default);
    setInterval(() => {
      this.currentSlogan = this.slogans[Math.floor(Math.random() * this.slogans.length)];
    }, 1000);
  },
  mounted() {
    AOS.init({
      duration: 800,
      once: false,
      mirror: true,
      easing: 'ease-in-out-back',
      offset: 120,
      delay: 50
    });
  },
  updated() {
    AOS.refresh();
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600&display=swap');

.home-container {
  background: #000;
  color: #fff;
  text-align: center;
  padding-top: 80px;
  font-family: 'Montserrat', sans-serif;
}

.welcome-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.welcome-title {
  margin-top: 5%;
  font-size: 2.5rem;
  font-weight: bold;
  opacity: 0;
  transform: translateY(-30px);
  animation: fadeInSlide 1.5s ease-out forwards;
  display: flex;
  align-items: center;
  gap: 10px;
  color: #FF6B00;
}

.diamond {
  font-size: 2.5rem;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;
}

.diamond:hover {
  transform: rotate(360deg) scale(1.2);
}

.slogan {
  font-size: 1.2rem;
  font-style: italic;
  margin-top: 10px;
  animation: fadeIn 1s ease-in-out;
  color: #f5f5f5;
}

.section {
  margin-top: 60px;
  padding: 20px;
}

.section-title {
  font-size: 2rem;
  margin-bottom: 10px;
  color: #FF6B00;
}

.section-text {
  font-size: 1.1rem;
  max-width: 600px;
  margin: 0 auto;
  color: #ccc;
}

.carousel-inner img {
  max-height: 500px;
  object-fit: contain;
  width: 100%;
  border-radius: 0;
  background-color: #000;
  padding: 20px;
}

.carousel {
  margin: 30px auto;
  max-width: 90%;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(255, 255, 255, 0.2);
}

.payment-methods {
  padding-bottom: 60px;
}

.payment-icons {
  margin-top: 15px;
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
}

.payment-icons img {
  width: 60px;
  height: auto;
  filter: brightness(1.2);
  transition: transform 0.3s;
}

.payment-icons img:hover {
  transform: scale(1.1);
}

.section:nth-of-type(2) .payment-icons {
  justify-content: center;
  gap: 40px;
  flex-wrap: wrap;
  margin-top: 30px;
  padding: 10px 20px;
}

.section:nth-of-type(2) .payment-icons img {
  width: 350px;
  height: auto;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(255, 255, 255, 0.25);
  transition: transform 0.3s ease;
  object-fit: cover;
}

.section:nth-of-type(2) .payment-icons img:hover {
  transform: scale(1.1);
}

.btn-home {
  display: inline-block;
  margin-top: 40px;
  background: #FF6B00;
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  transition: background 0.3s ease;
}

.btn-home:hover {
  background: #e65c00;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes fadeInSlide {
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.ring-icons {
  margin-top: 30px;
  display: flex;
  justify-content: center;
  gap: 40px;
  flex-wrap: wrap;
  padding: 10px 20px;
}

.ring-icons img {
  width: 350px;
  height: auto;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(255, 255, 255, 0.25);
  transition: transform 0.3s ease;
  object-fit: cover;
}

.ring-icons img:hover {
  transform: scale(1.1);
}

.bracelet-icons {
  margin-top: 30px;
  display: flex;
  justify-content: center;
  gap: 40px;
  flex-wrap: wrap;
  padding: 10px 20px;
}

.bracelet-icons img {
  width: 350px;
  height: auto;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(255, 255, 255, 0.25);
  transition: transform 0.3s ease;
  object-fit: cover;
}

.bracelet-icons img:hover {
  transform: scale(1.1);
}

/* Ajustes para animaciones AOS */
[data-aos] {
  transition-property: transform, opacity;
}
</style>