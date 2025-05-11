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
  padding-top: 100px;
  background: #eeeeee;
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

.btn-register,
.btn-back {
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

.btn-register:hover,
.btn-back:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 18px rgba(184, 140, 58, 0.3);
}

.success-message {
  color: #4caf50;
  font-weight: 600;
  margin-bottom: 15px;
}

.error-message {
  color: #e53935;
  font-weight: 600;
  margin-bottom: 15px;
}
</style>