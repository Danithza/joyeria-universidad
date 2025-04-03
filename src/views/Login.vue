<template>
  <div class="login-container">
    <div class="login-card">
      <h2>Iniciar Sesión</h2>

      <div v-if="loginSuccess" class="success-message">
        ¡Inicio de sesión exitoso! Redirigiendo...
      </div>

      <form v-else @submit.prevent="login">
        <div class="input-group">
          <label for="email">Correo Electrónico</label>
          <input type="email" id="email" v-model="email" required />
        </div>

        <div class="input-group">
          <label for="password">Contraseña</label>
          <input type="password" id="password" v-model="password" required />
        </div>

        <button type="submit" class="btn-login">Ingresar</button>
        <router-link to="/forgot-password" class="forgot-password">¿Olvidaste tu contraseña?</router-link>

        <div class="register-section">
          <p>¿No tienes cuenta?</p>
          <router-link to="/register" class="btn-register">Regístrate</router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      loginSuccess: false,
    };
  },
  methods: {
    login() {
      console.log(`Iniciando sesión con ${this.email}`);
      this.loginSuccess = true;
      this.$router.push("/home");
    },
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600&display=swap');

.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #fbe7c6, #ffdde1);
}

.login-card {
  background: #fff;
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
  color: #ff9aa2;
}

.input-group {
  text-align: left;
  margin-bottom: 15px;
}

.input-group label {
  font-weight: 600;
  display: block;
  margin-bottom: 5px;
  color: #ff758f;
}

.input-group input {
  width: 100%;
  padding: 10px;
  border: 2px solid #ffb7b2;
  border-radius: 8px;
  font-size: 16px;
  background: #fff5f5;
  color: #333;
  transition: border 0.3s ease;
}

.input-group input:focus {
  border-color: #ff9aa2;
  outline: none;
}

.btn-login {
  background: #ffb7b2;
  color: #fff;
  border: none;
  padding: 12px;
  width: 100%;
  border-radius: 8px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s ease;
}

.btn-login:hover {
  background: #ff9aa2;
}

.forgot-password {
  display: block;
  margin-top: 10px;
  color: #ff758f;
  text-decoration: none;
  font-weight: 600;
}

.forgot-password:hover {
  text-decoration: underline;
}

.register-section {
  margin-top: 15px;
}

.register-section p {
  margin: 0;
  font-size: 14px;
  color: #666;
}

.btn-register {
  display: inline-block;
  margin-top: 8px;
  background: transparent;
  color: #ff758f;
  border: 2px solid #ff758f;
  padding: 8px 12px;
  border-radius: 8px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
}

.btn-register:hover {
  background: #ff758f;
  color: #fff;
}

.success-message {
  background: #b5e7a0;
  color: #333;
  padding: 10px;
  border-radius: 8px;
  font-weight: 600;
  margin-bottom: 15px;
}
</style>
