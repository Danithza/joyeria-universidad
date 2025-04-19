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
  background: #000; /* Fondo negro */
}

.login-card {
  background: #1a1a1a; /* Oscuro profundo */
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.7);
  text-align: center;
  width: 100%;
  max-width: 380px;
}

h2 {
  font-family: 'Montserrat', sans-serif;
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 20px;
  color: #FF6B00; /* Naranja fuerte */
}

.input-group {
  text-align: left;
  margin-bottom: 20px;
}

.input-group label {
  font-weight: 600;
  display: block;
  margin-bottom: 8px;
  color: #FF6B00; /* Naranja */
}

.input-group input {
  width: 100%;
  padding: 12px;
  border: 2px solid #444;
  border-radius: 8px;
  font-size: 16px;
  background: #2b2b2b;
  color: #fff;
  transition: border 0.3s ease;
}

.input-group input:focus {
  border-color: #FF6B00;
  outline: none;
}

.btn-login {
  background: #FF6B00;
  color: #fff;
  border: none;
  padding: 14px;
  width: 100%;
  border-radius: 8px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s ease;
}

.btn-login:hover {
  background: #e65c00;
}

.forgot-password {
  display: block;
  margin-top: 12px;
  color: #FF6B00;
  text-decoration: none;
  font-weight: 600;
}

.forgot-password:hover {
  text-decoration: underline;
}

.register-section {
  margin-top: 20px;
}

.register-section p {
  margin: 0;
  font-size: 14px;
  color: #ccc;
}

.btn-register {
  display: inline-block;
  margin-top: 8px;
  background: transparent;
  color: #FF6B00;
  border: 2px solid #FF6B00;
  padding: 8px 12px;
  border-radius: 8px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
}

.btn-register:hover {
  background: #FF6B00;
  color: #fff;
}

.success-message {
  background: #4caf50;
  color: #fff;
  padding: 12px;
  border-radius: 8px;
  font-weight: 600;
  margin-bottom: 20px;
}
</style>
