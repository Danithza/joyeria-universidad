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
  align-items: flex-start;
  min-height: 100vh;
  padding-top: 100px;
  background: #eeeeee; /* gris clarito */
}

.forgot-password-card {
  background: #f5f5f5;
  padding: 30px 25px;
  border-radius: 14px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 100%;
  max-width: 340px;
  border: 1px solid #ddd;
}

h2 {
  font-family: 'Montserrat', sans-serif;
  font-size: 26px;
  font-weight: 600;
  margin-bottom: 18px;
  color: #b88c3a;
}

.input-group {
  text-align: left;
  margin-bottom: 18px;
}

.input-group label {
  font-weight: 600;
  display: block;
  margin-bottom: 6px;
  color: #b88c3a;
  font-size: 14px;
}

.input-group input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 10px;
  font-size: 14px;
  background: #fafafa;
  color: #333;
  transition: all 0.3s ease;
}

.input-group input:focus {
  background: #fff;
  box-shadow: 0 0 0 2px #b88c3a;
  outline: none;
}

.btn-recover {
  background: linear-gradient(135deg, #b88c3a, #d6a441);
  color: #fff;
  border: none;
  padding: 12px;
  width: 100%;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.btn-recover:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 18px rgba(184, 140, 58, 0.3);
}

.back-to-login {
  display: block;
  margin-top: 10px;
  color: #b88c3a;
  text-decoration: none;
  font-weight: 600;
  font-size: 13px;
}

.back-to-login:hover {
  text-decoration: underline;
}

.success-message {
  background: #4caf50;
  color: #fff;
  padding: 10px;
  border-radius: 8px;
  font-weight: 600;
  margin-bottom: 18px;
  font-size: 14px;
}
</style>
