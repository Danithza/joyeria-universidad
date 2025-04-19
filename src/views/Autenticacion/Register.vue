<template>
  <div class="register-container">
    <div class="register-card">
      <h2>Registro</h2>
      <form @submit.prevent="register">
        <div class="form-row">
          <div class="input-group">
            <label for="name">Nombre Completo</label>
            <input type="text" id="name" v-model="name" required />
          </div>

          <div class="input-group">
            <label for="email">Correo Electrónico</label>
            <input type="email" id="email" v-model="email" required />
          </div>

          <div class="input-group">
            <label for="phone">Teléfono</label>
            <input type="tel" id="phone" v-model="phone" required />
          </div>

          <div class="input-group">
            <label for="address">Dirección</label>
            <input type="text" id="address" v-model="address" required />
          </div>

          <div class="input-group">
            <label for="password">Contraseña</label>
            <input type="password" id="password" v-model="password" required />
          </div>

          <div class="input-group">
            <label for="confirmPassword">Confirmar Contraseña</label>
            <input type="password" id="confirmPassword" v-model="confirmPassword" required />
          </div>
        </div>

        <div class="button-group">
          <button type="submit" class="btn-register">Registrarse</button>
          <button type="button" class="btn-back" @click="goToLogin">Volver al inicio</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      name: "",
      email: "",
      phone: "",
      address: "",
      password: "",
      confirmPassword: "",
    };
  },
  methods: {
    register() {
      if (this.password !== this.confirmPassword) {
        alert("Las contraseñas no coinciden");
        return;
      }
      console.log(`Registrando a ${this.name} con ${this.email}, Teléfono: ${this.phone}, Dirección: ${this.address}`);
    },
    goToLogin() {
      this.$router.push("/login");
    }
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600&display=swap');

.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #000; /* Fondo negro */
  padding: 20px;
}

.register-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #1a1a1a; /* Fondo oscuro */
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.5);
  width: 90%;
  max-width: 1000px;
}

h2 {
  font-family: 'Montserrat', sans-serif;
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 20px;
  color: #FF6B00;
}

.form-row {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  width: 100%;
}

.input-group {
  display: flex;
  flex-direction: column;
  width: 45%;
}

.input-group label {
  font-weight: 600;
  margin-bottom: 5px;
  color: #FF6B00;
}

.input-group input {
  padding: 10px;
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

.button-group {
  display: flex;
  gap: 10px;
  justify-content: center;
  width: 100%;
  margin-top: 20px;
}

.btn-register, .btn-back {
  background: #FF6B00;
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s ease;
}

.btn-register:hover, .btn-back:hover {
  background: #e65c00;
}
</style>
