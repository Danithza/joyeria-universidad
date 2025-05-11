<template>
  <div class="register-container">
    <div class="register-card">
      <h2>Cambiar Contraseña</h2>

      <!-- Mensaje de éxito -->
      <div v-if="successMessage" class="success-message">
        {{ successMessage }}
      </div>

      <!-- Mensaje de error -->
      <div v-if="errorMessage" class="error-message">
        {{ errorMessage }}
      </div>

      <form @submit.prevent="changePassword">
        <div class="form-row">
          <div class="input-group">
            <label for="email">Correo Electrónico</label>
            <input type="email" id="email" v-model="email" required />
          </div>

          <div class="input-group">
            <label for="currentPassword">Contraseña Actual</label>
            <input type="password" id="currentPassword" v-model="currentPassword" required />
          </div>

          <div class="input-group">
            <label for="newPassword">Nueva Contraseña</label>
            <input type="password" id="newPassword" v-model="newPassword" required />
          </div>

          <div class="input-group">
            <label for="confirmPassword">Confirmar Nueva Contraseña</label>
            <input type="password" id="confirmPassword" v-model="confirmPassword" required />
          </div>
        </div>

        <div class="button-group">
          <button type="submit" class="btn-register">Cambiar Contraseña</button>
          <button
            v-if="successMessage"
            type="button"
            class="btn-back"
            @click="goToLogin"
          >
            Ir al Login
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "ChangePassword",
  data() {
    return {
      email: "",
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
      successMessage: "",
      errorMessage: "",
    };
  },
  methods: {
    changePassword() {
      this.successMessage = "";
      this.errorMessage = "";

      if (this.newPassword !== this.confirmPassword) {
        this.errorMessage = "Las nuevas contraseñas no coinciden.";
        return;
      }

      const users = JSON.parse(localStorage.getItem("users")) || [];

      const userIndex = users.findIndex(
        (user) => user.email === this.email && user.password === this.currentPassword
      );

      if (userIndex === -1) {
        this.errorMessage = "Correo o contraseña actual incorrectos.";
        return;
      }

      users[userIndex].password = this.newPassword;
      localStorage.setItem("users", JSON.stringify(users));

      this.successMessage = "¡Contraseña actualizada correctamente!";
      this.email = this.currentPassword = this.newPassword = this.confirmPassword = "";
    },
    goToLogin() {
      this.$router.push("/login");
    },
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

.button-group {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  margin-top: 25px;
}

.btn-register,
.btn-back {
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

.btn-register:hover,
.btn-back:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 18px rgba(184, 140, 58, 0.3); /* Sombra dorada */
}

.success-message {
  color: #4caf50; /* Verde para éxito */
  font-weight: 600;
  margin-bottom: 15px;
  background: rgba(76, 175, 80, 0.1); /* Fondo verde muy transparente */
  padding: 10px;
  border-radius: 8px;
}

.error-message {
  color: #f44336; /* Rojo para error */
  font-weight: 600;
  margin-bottom: 15px;
  background: rgba(244, 67, 54, 0.1); /* Fondo rojo muy transparente */
  padding: 10px;
  border-radius: 8px;
}
</style>