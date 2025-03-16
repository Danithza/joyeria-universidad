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
        message: "",
      };
    },
    methods: {
      submitSupport() {
        console.log(`Enviando mensaje de soporte de ${this.name} (${this.email}): ${this.message}`);
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
    height: 100vh;
    background: linear-gradient(135deg, #ffdde1, #d4fcf7);
  }
  
  .support-card {
    background: white;
    padding: 30px;
    border-radius: 12px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    text-align: center;
    width: 400px;
  }
  
  h2 {
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 10px;
    color: #444;
  }
  
  .input-group {
    text-align: left;
    margin-bottom: 15px;
  }
  
  .input-group label {
    font-weight: 600;
    display: block;
    margin-bottom: 5px;
    color: #666;
  }
  
  .input-group input,
  .input-group textarea {
    width: 100%;
    padding: 10px;
    border: 2px solid #ccc;
    border-radius: 8px;
    font-size: 16px;
    transition: border 0.3s ease;
  }
  
  .input-group input:focus,
  .input-group textarea:focus {
    border-color: #a1c4fd;
    outline: none;
  }
  
  .btn-submit {
    background: #a1c4fd;
    color: white;
    border: none;
    padding: 12px;
    width: 100%;
    border-radius: 8px;
    font-size: 18px;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.3s ease;
  }
  
  .btn-submit:hover {
    background: #92b4f4;
  }
  
  .faq-section {
    margin-top: 20px;
    text-align: left;
  }
  
  .faq-section h3 {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 10px;
  }
  
  .faq-section ul {
    padding-left: 20px;
  }
  
  .faq-section li {
    margin-bottom: 5px;
    font-size: 14px;
    color: #555;
  }
  </style>
  