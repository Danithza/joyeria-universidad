<template>
  <div class="support-container">
    <div class="support-card">
      <h2>Centro de Soporte</h2>
      <p>¿Tienes dudas o problemas? ¡Estamos para ayudarte!</p>

      <form @submit.prevent="submitSupport" class="support-form">
        <div class="input-group">
          <label for="name">Nombre</label>
          <input type="text" id="name" v-model="name" required placeholder="Ingresa tu nombre completo" />
        </div>

        <div class="input-group">
          <label for="email">Correo</label>
          <input type="email" id="email" v-model="email" required placeholder="correo@ejemplo.com" />
        </div>

        <div class="input-group">
          <label for="phone">Teléfono</label>
          <input type="tel" id="phone" v-model="phone" required placeholder="(000) 000-0000" />
        </div>

        <div class="input-group">
          <label for="message">Mensaje</label>
          <textarea id="message" v-model="message" rows="4" required placeholder="Escribe tu consulta..."></textarea>
        </div>

        <button type="submit" class="btn-submit">Enviar Mensaje</button>
      </form>

      <div class="faq-section">
        <h3>Preguntas Frecuentes</h3>
        <ul>
          <li><strong>¿Cómo recuperar mi contraseña?</strong><br />Haz clic en "Olvidé mi contraseña" en la página de inicio de sesión.</li>
          <li><strong>¿Cómo contactar soporte?</strong><br />Llena este formulario o escríbenos directamente al correo soporte@empresa.com.</li>
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
      console.log(`Enviando mensaje de soporte de ${this.name} (${this.email}, ${this.phone}): ${this.message}`);
      alert("Tu mensaje ha sido enviado exitosamente. ¡Gracias por contactarnos!");
    },
  },
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
  background: #eeeeee;
  padding-top: 110px;
}

.support-card {
  background-color: #f5f5f5;  /* blanco */
  padding: 50px 40px;
  border-radius: 20px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 600px;
  text-align: center;
  border: 1px solid #ddd;
}

h2 {
  font-family: 'Poppins', sans-serif;
  font-size: 28px;
  font-weight: 700;
  color: #b88c3a; /* dorado suave */
  margin-bottom: 10px;
}

p {
  color: #666;
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
  color: #b88c3a;
  margin-bottom: 8px;
}

.input-group input,
.input-group textarea {
  width: 100%;
  padding: 14px;
  border: 1px solid #ccc;
  border-radius: 14px;
  background: #fafafa;
  color: #333;
  font-size: 15px;
  transition: all 0.3s ease;
}

.input-group input:focus,
.input-group textarea:focus {
  background: #fff;
  box-shadow: 0 0 0 2px #b88c3a;
  outline: none;
}

.btn-submit {
  background: linear-gradient(135deg, #b88c3a, #d6a441); /* dorado degradado */
  color: #fff;
  padding: 6px;
  border: none;
  border-radius: 14px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.btn-submit:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(184, 140, 58, 0.4);
}

.faq-section {
  margin-top: 40px;
  text-align: left;
  font-size: 16px;
  color: #666;
}

.faq-section h3 {
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 15px;
  color: #b88c3a;
}

.faq-section ul {
  list-style: none;
  padding: 0;
}

.faq-section li {
  margin-bottom: 20px;
  font-size: 15px;
  padding-bottom: 12px;
  border-bottom: 1px solid #ddd;
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

