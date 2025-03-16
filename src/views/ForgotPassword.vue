<template>
  <div class="forgot-password-container">
    <div class="forgot-password-card">
      <h2>Recuperar Contraseña</h2>
      
      <div v-if="emailSent" class="success-message">
        ¡Correo enviado! Revisa tu bandeja de entrada.
      </div>

      <form v-else @submit.prevent="recoverPassword">
        <div class="input-group">
          <label for="email">Correo Electrónico</label>
          <input type="email" id="email" v-model="email" required />
        </div>

        <button type="submit" class="btn-recover">Enviar Instrucciones</button>
        <router-link to="/login" class="back-to-login">Volver al inicio de sesión</router-link>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "ForgotPassword",
  data() {
    return {
      email: "",
      emailSent: false,
    };
  },
  methods: {
    recoverPassword() {
      console.log(`Enviando recuperación a ${this.email}`);
      this.emailSent = true;
    },
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600&display=swap');

.forgot-password-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #ffdde1, #d4fcf7);
}

.forgot-password-card {
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 350px;
}

h2 {
  font-family: 'Montserrat', sans-serif;
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 20px;
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

.input-group input {
  width: 100%;
  padding: 10px;
  border: 2px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
  transition: border 0.3s ease;
}

.input-group input:focus {
  border-color: #a1c4fd;
  outline: none;
}

.btn-recover {
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

.btn-recover:hover {
  background: #92b4f4;
}

.back-to-login {
  display: block;
  margin-top: 10px;
  color: #92b4f4;
  text-decoration: none;
  font-weight: 600;
}

.back-to-login:hover {
  text-decoration: underline;
}

.success-message {
  background: #a1e3a1;
  color: white;
  padding: 10px;
  border-radius: 8px;
  font-weight: 600;
  margin-bottom: 15px;
}
</style>
