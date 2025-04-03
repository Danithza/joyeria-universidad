<template>
  <div class="home-container">
    <div class="welcome-container">
      <h1 class="welcome-title">
        ¡Bienvenido a nuestra joyería!
        <span class="diamond">💎</span>
      </h1>
      <p class="slogan">{{ currentSlogan }}</p>
    </div>

    <!-- Galería de imágenes -->
    <div class="image-gallery">
      <div class="gallery-item" v-for="(image, index) in images" :key="index">
        <img :src="image" alt="Joya" class="gallery-image">
      </div>
    </div>

    <!-- Sección Sobre Nosotros, Misión y Visión en una fila -->
    <section class="info-container">
      <div class="info-box">
        <h2>Sobre Nosotros</h2>
        <p>Descubre nuestras joyas únicas y elegantes que reflejan la belleza y el estilo de quienes las usan.</p>
      </div>
      <div class="info-box">
        <h2>Misión</h2>
        <p>Brindar joyas de alta calidad que resalten la personalidad y el estilo de cada cliente.</p>
      </div>
      <div class="info-box">
        <h2>Visión</h2>
        <p>Ser la joyería de referencia en el mercado por nuestra exclusividad y diseño innovador.</p>
      </div>
    </section>

    <!-- Sección Ofertas y Promociones -->
    <section class="offers">
      <h2>Ofertas y Promociones</h2>
      <p>Encuentra descuentos exclusivos en nuestras colecciones más recientes. ¡No te lo pierdas!</p>
    </section>

<!-- Sección Contacto -->
<div class="contact-container">
  <h2 class="contact-title">Contáctanos</h2>

  <!-- Formulario de Contacto -->
  <form class="contact-form">
    <div class="input-group">
      <label for="name">Nombre</label>
      <input type="text" id="name" name="name" placeholder="Ingresa tu nombre" required>
    </div>

    <div class="input-group">
      <label for="email">Correo Electrónico</label>
      <input type="email" id="email" name="email" placeholder="Tu correo electrónico" required>
    </div>

    <div class="input-group">
      <label for="message">Mensaje</label>
      <textarea id="message" name="message" rows="4" placeholder="Escribe tu mensaje aquí..." required></textarea>
    </div>

    <button type="submit" class="submit-btn">Enviar Mensaje</button>
  </form>

  <!-- Redes Sociales -->
  <div class="social-icons">
    <a href="#" class="social-icon"><i class="fab fa-facebook-f"></i></a>
    <a href="#" class="social-icon"><i class="fab fa-instagram"></i></a>
    <a href="#" class="social-icon"><i class="fab fa-twitter"></i></a>
    <a href="#" class="social-icon"><i class="fab fa-whatsapp"></i></a>
  </div>
</div>
</div>
</template>

<script>
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
    // Importar todas las imágenes de la carpeta 'assets/img-home'
    const imageFiles = import.meta.glob('@/assets/img-home/*.jpg', { eager: true });
    
    // Convertir el objeto en un array de URLs
    this.images = Object.values(imageFiles).map(img => img.default);
    
    // Cambiar el slogan cada 2 segundos
    setInterval(() => {
      this.currentSlogan = this.slogans[Math.floor(Math.random() * this.slogans.length)];
    }, 1500);
  }
};
</script>

<style scoped>

.contact-container {
  background: #fff;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 500px;
  margin: 40px auto;
}

.contact-title {
  font-size: 24px;
  font-weight: bold;
  color: #a67b5b;
  margin-bottom: 20px;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.input-group {
  text-align: left;
}

.input-group label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
  color: #5a4743;
}

.input-group input,
.input-group textarea {
  width: 100%;
  padding: 12px;
  border: 2px solid #a67b5b;
  border-radius: 8px;
  font-size: 16px;
  transition: all 0.3s ease-in-out;
}

.input-group input:focus,
.input-group textarea:focus {
  border-color: #8c654a;
  outline: none;
  box-shadow: 0 0 8px rgba(166, 123, 91, 0.3);
}

.submit-btn {
  background: #a67b5b;
  color: white;
  padding: 12px;
  font-size: 18px;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
}

.submit-btn:hover {
  background: #8c654a;
}

.social-icons {
  margin-top: 20px;
}

.social-icon {
  font-size: 24px;
  margin: 0 10px;
  color: #a67b5b;
  text-decoration: none;
  transition: color 0.3s;
}

.social-icon:hover {
  color: #7a5c4f;
}

/* Contenedor principal */
.home-container {
  background: linear-gradient(to bottom, #fae3d9, #fbe8dc);
  color: #5a4743;
  text-align: center;
  padding-top: 80px;
}

/* Contenedor del título y el diamante */
.welcome-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

/* Título con animación */
.welcome-title {
  margin-top: 5%;
  font-size: 2.5rem;
  font-weight: bold;
  color: #a67b5b;
  opacity: 0;
  transform: translateY(-30px);
  animation: fadeInSlide 1.5s ease-out forwards;
  display: flex;
  align-items: center;
  gap: 10px;
}

/* Diamante interactivo */
.diamond {
  font-size: 2.5rem;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;
}

.diamond:hover {
  transform: rotate(360deg) scale(1.2);
}

/* Slogan animado */
.slogan {
  font-size: 1.2rem;
  font-style: italic;
  color: #7a5c4f;
  margin-top: 10px;
  animation: fadeIn 1s ease-in-out;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.image-gallery {
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* 4 columnas fijas */
  grid-template-rows: repeat(3, 1fr); /* 3 filas */
  gap: 15px;
  width: 90%;
  margin: 30px auto;
  padding: 20px;
}

/* Estilos para la fila de información */
.info-container {
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  margin: 40px auto;
  padding: 20px;
  max-width: 90%;
  gap: 20px;
}

.info-box {
  flex: 1;
  background: rgba(255, 255, 255, 0.8);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.gallery-item {
  width: 100%;
  height: 460px; /* Todas las imágenes con la misma altura */
  overflow: hidden;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.gallery-image {
  width: 100%;
  height: 100%;
  object-fit: cover; /* Evita distorsiones */
  border-radius: 10px;
  transition: transform 0.3s ease-in-out, filter 0.3s ease-in-out;
}

/* Efecto de escala y opacidad al pasar el cursor */
.gallery-item:hover .gallery-image {
  transform: scale(1.1); /* Aumenta un poco el tamaño */
  filter: brightness(0.8) contrast(1.2); /* Ajusta brillo y contraste */
}

/* Keyframes para la animación */
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
</style>
