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

        <router-link to="/forgot-password" class="forgot-password">
          ¿Olvidaste tu contraseña?
        </router-link>

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
  align-items: flex-start; /* Alinea arriba */
  min-height: 100vh;
  padding-top: 100px; /* Baja el formulario */
  background: #eeeeee; /* gris claro */
}

.login-card {
  background: #f5f5f5;
  padding: 30px 25px;
  border-radius: 14px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 100%;
  max-width: 340px; /* más angosto */
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
  transition: border 0.3s ease;
}

.input-group input:focus {
  background: #fff;
  box-shadow: 0 0 0 2px #b88c3a;
  outline: none;
}

.btn-login {
  background: linear-gradient(135deg, #b88c3a, #d6a441);
  color: #fff;
  border: none;
  padding: 12px;
  width: 100%;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s ease, transform 0.2s;
}

.btn-login:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 18px rgba(184, 140, 58, 0.3);
}

.forgot-password {
  display: block;
  margin-top: 10px;
  color: #b88c3a;
  text-decoration: none;
  font-weight: 600;
  text-align: right;
  font-size: 13px;
}

.forgot-password:hover {
  text-decoration: underline;
}

.register-section {
  margin-top: 18px;
}

.register-section p {
  margin: 0;
  font-size: 13px;
  color: #555;
}

.btn-register {
  display: inline-block;
  margin-top: 6px;
  background: transparent;
  color: #b88c3a;
  border: 2px solid #b88c3a;
  padding: 6px 10px;
  border-radius: 8px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  font-size: 14px;
}

.btn-register:hover {
  background: #b88c3a;
  color: #fff;
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
