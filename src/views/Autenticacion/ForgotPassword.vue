<template>
  <div class="password-container">
    <div class="password-card">
      <h2><i class="fas fa-key"></i> Cambiar Contraseña</h2>
      
      <div v-if="successMessage" class="success-message">
        <i class="fas fa-check-circle"></i> {{ successMessage }}
      </div>
      
      <div v-if="errorMessage" class="error-message">
        <i class="fas fa-exclamation-circle"></i> {{ errorMessage }}
      </div>

      <form @submit.prevent="handleSubmit" class="password-form">
        <div class="input-group">
          <label for="current-password"><i class="fas fa-lock"></i> Contraseña Actual</label>
          <input type="password" id="current-password" v-model="form.current" required />
        </div>
        
        <div class="input-group">
          <label for="new-password"><i class="fas fa-key"></i> Nueva Contraseña</label>
          <input type="password" id="new-password" v-model="form.new" required minlength="8"/>
          <small class="hint">Mínimo 8 caracteres</small>
        </div>
        
        <div class="input-group">
          <label for="confirm-password"><i class="fas fa-check-circle"></i> Confirmar Contraseña</label>
          <input type="password" id="confirm-password" v-model="form.confirm" required minlength="8"/>
        </div>
        
        <button type="submit" class="btn-submit" :disabled="isLoading">
          <i class="fas" :class="{'fa-spinner fa-pulse': isLoading, 'fa-key': !isLoading}"></i> 
          {{ isLoading ? 'Procesando...' : 'Cambiar Contraseña' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "PasswordChange",
  data() {
    return {
      form: {
        current: "",
        new: "",
        confirm: ""
      },
      isLoading: false,
      successMessage: null,
      errorMessage: null
    };
  },
  methods: {    
    async handleSubmit() {
      // Validación básica
      if (this.form.new.length < 8) {
        this.errorMessage = "La nueva contraseña debe tener al menos 8 caracteres";
        return;
      }
      
      if (this.form.new !== this.form.confirm) {
        this.errorMessage = "Las contraseñas no coinciden";
        return;
      }

      this.isLoading = true;
      this.errorMessage = null;

      try {
        const response = await axios.post('/api/auth/change-password', {
          currentPassword: this.form.current,
          newPassword: this.form.new
        }, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (response.data.success) {
          this.successMessage = "¡Contraseña cambiada exitosamente!";
          this.form = { current: "", new: "", confirm: "" };
          setTimeout(() => this.successMessage = null, 5000);
        } else {
          this.errorMessage = response.data.message || "Error al cambiar la contraseña";
        }
      } catch (error) {
        this.errorMessage = error.response?.data?.message || 
                           "Error al procesar la solicitud";
      } finally {
        this.isLoading = false;
      }
    }
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css');

.password-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #eeeeee;
  padding: 20px;
}

.password-card {
  margin-top: 7%;
  background: #f5f5f5;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 450px;
  text-align: center;
  border: 1px solid #ddd;
}

h2 {
  font-family: 'Poppins', sans-serif;
  font-size: 24px;
  font-weight: 700;
  color: #b88c3a;
  margin-bottom: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.password-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.input-group {
  text-align: left;
}

.input-group label {
  font-weight: 600;
  color: #b88c3a;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
}

.input-group input {
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #ccc;
  border-radius: 10px;
  font-size: 15px;
  background: #fafafa;
  transition: all 0.3s ease;
}

.input-group input:focus {
  border-color: #b88c3a;
  box-shadow: 0 0 0 2px rgba(184, 140, 58, 0.2);
  background: #fff;
  outline: none;
}

.hint {
  color: #666;
  font-size: 12px;
  margin-top: 5px;
  display: block;
}

.btn-submit {
  background: linear-gradient(135deg, #b88c3a, #d6a441);
  color: white;
  border: none;
  padding: 12px;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.btn-submit:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(184, 140, 58, 0.3);
}

.btn-submit:disabled {
  background: #cccccc;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.success-message {
  background: #4CAF50;
  color: white;
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.error-message {
  background: #f44336;
  color: white;
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

@media (max-width: 480px) {
  .password-card {
    padding: 20px;
  }
  
  h2 {
    font-size: 20px;
  }
}
</style>