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

      // Crear el nuevo usuario
      const newUser = {
        nombre: this.name,
        email: this.email,
        phone: this.phone,
        address: this.address,
        password: this.password,
        foto: null,
        historialCompras: []
      };

      // Guardar en localStorage
      let users = JSON.parse(localStorage.getItem("users")) || [];
      
      // Verificar si el usuario ya existe
      const userExists = users.some(user => user.email === newUser.email);
      if (userExists) {
        alert("Este correo electrónico ya está registrado");
        return;
      }
      
      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));

      alert("¡Registro exitoso! Serás redirigido al login");
      this.$router.push("/login");
    },
    goToLogin() {
      this.$router.push("/login");
    }
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600&display=swap');

.register-container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 100vh;
  padding-top: 200px;
  background: #000000; /* Fondo negro */
  color: #ffffff; /* Texto blanco */
}

.register-card {
  background: #1a1a1a; /* Fondo gris oscuro */
  padding: 40px 30px;
  border-radius: 20px;
  box-shadow: 0 8px 20px rgba(255, 255, 255, 0.05); /* Sombra clara */
  width: 100%;
  max-width: 700px;
  border: 1px solid #333; /* Borde gris */
  text-align: center;
}

h2 {
  font-family: 'Montserrat', sans-serif;
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 30px;
  color: #b88c3a; /* Dorado */
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
  color: #b88c3a; /* Dorado */
  font-size: 14px;
  text-align: left;
}

.input-group input {
  padding: 12px;
  border: 1px solid #444; /* Borde gris oscuro */
  border-radius: 14px;
  font-size: 14px;
  background: #2a2a2a; /* Fondo gris más oscuro */
  color: #ffffff; /* Texto blanco */
  transition: all 0.3s ease;
}

.input-group input:focus {
  background: #333; /* Fondo gris al enfocar */
  box-shadow: 0 0 0 2px #b88c3a; /* Borde dorado al enfocar */
  outline: none;
}

.input-group input::placeholder {
  color: #666; /* Color del placeholder */
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
  background: linear-gradient(135deg, #b88c3a, #d6a441); /* Degradado dorado */
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
  box-shadow: 0 6px 18px rgba(184, 140, 58, 0.3); /* Sombra dorada */
}

/* Efecto de animación para la tarjeta */
.register-card {
  animation: fadeIn 0.6s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>