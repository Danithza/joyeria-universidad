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
  align-items: flex-start;
  min-height: 100vh;
  padding-top: 100px;
  background: #eeeeee; /* Fondo gris claro */
}

.register-card {
  background: #f5f5f5;
  padding: 40px 30px;
  border-radius: 20px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 700px;
  border: 1px solid #ddd;
  text-align: center;
}

h2 {
  font-family: 'Montserrat', sans-serif;
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 30px;
  color: #b88c3a;
}

.form-row {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

.input-group {
  display: flex;
  flex-direction: column;
  width: 100%;
}

@media (min-width: 768px) {
  .input-group {
    width: 48%;
  }
}

.input-group label {
  font-weight: 600;
  margin-bottom: 8px;
  color: #b88c3a;
  font-size: 14px;
  text-align: left;
}

.input-group input {
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 14px;
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

.button-group {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  margin-top: 25px;
}

.btn-register, .btn-back {
  background: linear-gradient(135deg, #b88c3a, #d6a441);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 14px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.btn-register:hover, .btn-back:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 18px rgba(184, 140, 58, 0.3);
}
</style>
