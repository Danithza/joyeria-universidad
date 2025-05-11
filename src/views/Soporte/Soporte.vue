<template>
  <div class="support-container">
    <div class="support-card">
      <h2>Centro de Soporte</h2>
      <p>¿Tienes dudas o problemas? ¡Estamos para ayudarte!</p>

      <form @submit.prevent="submitSupport" class="support-form">
        <div class="input-group">
          <label for="name">Nombre</label>
          <input type="text" id="name" v-model="formData.name" required placeholder="Ingresa tu nombre completo" />
        </div>

        <div class="input-group">
          <label for="email">Correo</label>
          <input type="email" id="email" v-model="formData.email" required placeholder="correo@ejemplo.com" />
        </div>

        <div class="input-group">
          <label for="phone">Teléfono</label>
          <input type="tel" id="phone" v-model="formData.phone" required placeholder="(000) 000-0000" />
        </div>

        <div class="input-group">
          <label for="message">Mensaje</label>
          <textarea id="message" v-model="formData.message" rows="4" required placeholder="Escribe tu consulta..."></textarea>
        </div>

        <button type="submit" class="btn-submit" :disabled="loading">
          {{ loading ? 'Enviando...' : 'Enviar Mensaje' }}
        </button>
      </form>

      <!-- Modal de confirmación -->
      <div v-if="showModal" class="modal-overlay">
        <div class="modal-content">
          <h3>¡Mensaje enviado con éxito!</h3>
          <p>Hemos recibido tu solicitud y te responderemos a la brevedad.</p>
          <button @click="closeModal" class="btn-close">Aceptar</button>
        </div>
      </div>

      <div class="faq-section">
        <h3>Preguntas Frecuentes</h3>
        <ul>
          <li><strong>¿Cómo recuperar mi contraseña?</strong><br />Haz clic en "Olvidé mi contraseña" en la página de inicio de sesión.</li>
          <li><strong>¿Cómo contactar soporte?</strong><br />Llena este formulario o escríbenos directamente al correo ndlarrotta01@gmail.com.</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import emailjs from 'emailjs-com';

export default {
  name: "Support",
  data() {
    return {
      formData: {
        name: "",
        email: "",
        phone: "",
        message: ""
      },
      loading: false,
      error: null,
      showModal: false
    };
  },
  mounted() {
    emailjs.init('aLLW6NtjL_Xivl8c8');
  },
  methods: {
    async submitSupport() {
      if (!this.formData.name || !this.formData.email || !this.formData.message) {
        this.error = "Por favor complete los campos obligatorios";
        return;
      }

      this.loading = true;
      this.error = null;

      try {
        await emailjs.send(
          'service_ghxccd9',
          'template_ofnxskv',
          {
            name: this.formData.name.trim(),
            email: this.formData.email.trim(),
            phone: this.formData.phone.trim(),
            message: this.formData.message.trim(),
            reply_to: this.formData.email.trim()
          }
        );

        this.showModal = true;
        this.formData = { name: "", email: "", phone: "", message: "" };

      } catch (error) {
        this.error = "Error al enviar el mensaje. Por favor intente nuevamente.";
        console.error("Error al enviar:", error);
      } finally {
        this.loading = false;
      }
    },
    closeModal() {
      this.showModal = false;
    }
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');

.support-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 100px 20px;
  min-height: 100vh;
  background: #000000; /* Fondo negro */
  color: #ffffff; /* Texto blanco */
  padding-top: 110px;
}

.support-card {
  background-color: #1a1a1a; /* Fondo gris oscuro */
  padding: 50px 40px;
  border-radius: 20px;
  box-shadow: 0 8px 20px rgba(255, 255, 255, 0.05); /* Sombra clara */
  width: 100%;
  max-width: 600px;
  text-align: center;
  border: 1px solid #333; /* Borde gris */
  position: relative;
}

h2 {
  font-family: 'Poppins', sans-serif;
  font-size: 28px;
  font-weight: 700;
  color: #b88c3a; /* Dorado */
  margin-bottom: 10px;
}

p {
  color: #ccc; /* Texto gris claro */
  margin-bottom: 30px;
  font-size: 16px;
}

.support-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.input-group {
  display: flex;
  flex-direction: column;
  text-align: left;
}

.input-group label {
  font-weight: 600;
  color: #b88c3a; /* Dorado */
  margin-bottom: 8px;
}

.input-group input,
.input-group textarea {
  width: 100%;
  padding: 14px;
  border: 1px solid #444; /* Borde gris oscuro */
  border-radius: 14px;
  background: #2a2a2a; /* Fondo gris más oscuro */
  color: #ffffff; /* Texto blanco */
  font-size: 15px;
  transition: all 0.3s ease;
}

.input-group input::placeholder,
.input-group textarea::placeholder {
  color: #666; /* Placeholder gris */
}

.input-group input:focus,
.input-group textarea:focus {
  background: #333; /* Fondo gris al enfocar */
  box-shadow: 0 0 0 2px #b88c3a; /* Borde dorado al enfocar */
  outline: none;
}

.btn-submit {
  background: linear-gradient(135deg, #b88c3a, #d6a441); /* Degradado dorado */
  color: #fff;
  padding: 16px;
  border: none;
  border-radius: 14px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.btn-submit:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(184, 140, 58, 0.4); /* Sombra dorada */
}

.btn-submit:disabled {
  background: #444;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.faq-section {
  margin-top: 40px;
  text-align: left;
  font-size: 16px;
  color: #ccc; /* Texto gris claro */
}

.faq-section h3 {
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 15px;
  color: #b88c3a; /* Dorado */
}

.faq-section ul {
  list-style: none;
  padding: 0;
}

.faq-section li {
  margin-bottom: 20px;
  font-size: 15px;
  padding-bottom: 12px;
  border-bottom: 1px solid #444; /* Borde gris oscuro */
}

/* Estilos para el modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7); /* Fondo más oscuro */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: #1a1a1a; /* Fondo gris oscuro */
  padding: 30px;
  border-radius: 15px;
  max-width: 400px;
  width: 90%;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
  text-align: center;
  border: 1px solid #333;
}

.modal-content h3 {
  color: #4CAF50; /* Verde para éxito */
  margin-bottom: 15px;
}

.modal-content p {
  color: #ccc;
}

.btn-close {
  background: #b88c3a; /* Dorado */
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  margin-top: 20px;
  transition: background 0.3s ease;
}

.btn-close:hover {
  background: #d6a441; /* Dorado más claro */
}

@media (min-width: 768px) {
  .input-group {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
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