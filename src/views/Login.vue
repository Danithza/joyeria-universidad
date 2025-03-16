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
  background: linear-gradient(135deg, #ffdde1, #d4fcf7);
}

.login-card {
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

.btn-login {
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

.btn-login:hover {
  background: #92b4f4;
}

.forgot-password {
  display: block;
  margin-top: 10px;
  color: #92b4f4;
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
  color: #92b4f4;
  border: 2px solid #92b4f4;
  padding: 8px 12px;
  border-radius: 8px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
}

.btn-register:hover {
  background: #92b4f4;
  color: white;
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
