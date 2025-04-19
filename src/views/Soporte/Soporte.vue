<template>
  <div class="support-container">
    <div class="support-card">
      <h2>Soporte Técnico</h2>
      <p>¿Tienes problemas o dudas? Contáctanos y te ayudaremos.</p>
      
      <form @submit.prevent="submitSupport">
        <div class="input-group">
          <label for="name">Nombre Completo</label>
          <input type="text" id="name" v-model="name" required />
        </div>
        
        <div class="input-group">
          <label for="email">Correo Electrónico</label>
          <input type="email" id="email" v-model="email" required />
        </div>
        
        <div class="input-group">
          <label for="phone">Teléfono</label>
          <input type="tel" id="phone" v-model="phone" required />
        </div>
        
        <div class="input-group">
          <label for="message">Mensaje</label>
          <textarea id="message" v-model="message" rows="4" required></textarea>
        </div>
        
        <button type="submit" class="btn-submit">Enviar</button>
      </form>

      <div class="faq-section">
        <h3>Preguntas Frecuentes</h3>
        <ul>
          <li><strong>¿Cómo recupero mi contraseña?</strong> - Puedes restablecerla en la página de "Olvidé mi contraseña".</li>
          <li><strong>¿Cómo contacto al soporte?</strong> - Llena este formulario y te responderemos en 24 horas.</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Support",
  data() {
    return {
      name: "",
      email: "",
      phone: "",
      message: "",
    };
  },
  methods: {
    submitSupport() {
      console.log(`Enviando mensaje de soporte de ${this.name} (${this.email}, ${this.phone}): ${this.message}`);
      alert("Tu mensaje ha sido enviado. Te responderemos pronto.");
    },
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600&display=swap');

.support-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 80px 20px;
  min-height: 100vh;
  background-color: #000;
  padding-top: 190px;
}

.support-card {
  background: #1a1a1a;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  text-align: center;
  width: 100%;
  max-width: 600px;
  border: 1px solid #2b2b2b;
}

h2 {
  font-family: 'Montserrat', sans-serif;
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 20px;
  color: #FF6B00;
}

p {
  font-size: 16px;
  color: #ccc;
  margin-bottom: 30px;
}

.input-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  align-items: flex-start;
}

.input-group label {
  font-weight: 600;
  display: block;
  margin-bottom: 8px;
  color: #FF6B00;
}

.input-group input,
.input-group textarea {
  width: 100%;
  padding: 12px;
  border: 2px solid #444;
  border-radius: 8px;
  font-size: 16px;
  background: #2b2b2b;
  color: #fff;
  transition: border-color 0.3s ease;
}

.input-group input:focus,
.input-group textarea:focus {
  border-color: #FF6B00;
  outline: none;
}

.input-group textarea {
  resize: none;
}

.btn-submit {
  background: #FF6B00;
  color: white;
  border: none;
  padding: 15px;
  width: 100%;
  border-radius: 8px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s ease;
}

.btn-submit:hover {
  background: #e65c00;
}

.faq-section {
  margin-top: 30px;
  text-align: left;
  font-size: 16px;
  color: #ccc;
}

.faq-section h3 {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 15px;
  color: #FF6B00;
}

.faq-section ul {
  padding-left: 20px;
}

.faq-section li {
  margin-bottom: 10px;
  font-size: 14px;
}

@media (min-width: 768px) {
  .input-group {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .input-group label {
    width: 30%;
  }

  .input-group input,
  .input-group textarea {
    width: 65%;
  }
}
</style>
