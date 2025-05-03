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
<<<<<<< HEAD
=======
          <label for="phone">Teléfono</label>
          <input type="tel" id="phone" v-model="phone" required placeholder="(000) 000-0000" />
        </div>

        <div class="input-group">
>>>>>>> 0ad0209818e0bfbbea897939a049b05633a89cab
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
<<<<<<< HEAD
      console.log(`Enviando mensaje de soporte de ${this.name} (${this.email}): ${this.message}`);
      alert("Tu mensaje ha sido enviado. Te responderemos pronto.");
=======
      console.log(`Enviando mensaje de soporte de ${this.name} (${this.email}, ${this.phone}): ${this.message}`);
      alert("Tu mensaje ha sido enviado exitosamente. ¡Gracias por contactarnos!");
>>>>>>> 0ad0209818e0bfbbea897939a049b05633a89cab
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
<<<<<<< HEAD
  height: 100vh;
  background: linear-gradient(135deg, #fbe7c6, #ffdde1);
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
  color: #ff9aa2;
}

.input-group {
  text-align: left;
  margin-bottom: 15px;
=======
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
>>>>>>> 0ad0209818e0bfbbea897939a049b05633a89cab
}

.input-group label {
  font-weight: 600;
<<<<<<< HEAD
  display: block;
  margin-bottom: 5px;
  color: #ff758f;
=======
  color: #b88c3a;
  margin-bottom: 8px;
>>>>>>> 0ad0209818e0bfbbea897939a049b05633a89cab
}

.input-group input,
.input-group textarea {
  width: 100%;
<<<<<<< HEAD
  padding: 10px;
  border: 2px solid #ffb7b2;
  border-radius: 8px;
  font-size: 16px;
  background: #fff5f5;
  color: #333;
  transition: border 0.3s ease;
=======
  padding: 14px;
  border: 1px solid #ccc;
  border-radius: 14px;
  background: #fafafa;
  color: #333;
  font-size: 15px;
  transition: all 0.3s ease;
>>>>>>> 0ad0209818e0bfbbea897939a049b05633a89cab
}

.input-group input:focus,
.input-group textarea:focus {
<<<<<<< HEAD
  border-color: #ff9aa2;
=======
  background: #fff;
  box-shadow: 0 0 0 2px #b88c3a;
>>>>>>> 0ad0209818e0bfbbea897939a049b05633a89cab
  outline: none;
}

.btn-submit {
<<<<<<< HEAD
  background: #ffb7b2;
  color: white;
  border: none;
  padding: 12px;
  width: 100%;
  border-radius: 8px;
=======
  background: linear-gradient(135deg, #b88c3a, #d6a441); /* dorado degradado */
  color: #fff;
  padding: 6px;
  border: none;
  border-radius: 14px;
>>>>>>> 0ad0209818e0bfbbea897939a049b05633a89cab
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.btn-submit:hover {
<<<<<<< HEAD
  background: #ff9aa2;
}

.faq-section {
  margin-top: 20px;
  text-align: left;
}

.faq-section h3 {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 10px;
=======
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
>>>>>>> 0ad0209818e0bfbbea897939a049b05633a89cab
}

.faq-section ul {
  list-style: none;
  padding: 0;
}

.faq-section li {
<<<<<<< HEAD
  margin-bottom: 5px;
  font-size: 14px;
  color: #555;
=======
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
>>>>>>> 0ad0209818e0bfbbea897939a049b05633a89cab
}
</style>

