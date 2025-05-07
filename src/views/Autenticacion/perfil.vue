<template>
    <div class="perfil-container">
      <div v-if="user" class="profile-card">
        <div class="user-info">
          <label for="file-upload" class="image-container">
            <img 
              v-if="user.foto" 
              :src="user.foto" 
              alt="Foto de perfil" 
              class="user-avatar"
            />
            <div v-else class="default-avatar">
              <span>Selecciona una imagen</span>
            </div>
            <div class="edit-overlay">
              {{ user.foto ? 'Cambiar imagen' : 'Seleccionar imagen' }}
            </div>
          </label>
          <input 
            id="file-upload" 
            type="file" 
            accept="image/*" 
            @change="handleFileChange" 
            class="file-input" 
          />
          
          <div class="user-details">
            <h2>Bienvenido, {{ user.nombre }}!</h2>
            <p><strong>Email:</strong> {{ user.email }}</p>
            <p><strong>Teléfono:</strong> {{ user.phone }}</p>
            <p><strong>Dirección:</strong> {{ user.address }}</p>
          </div>
        </div>
  
        <div class="purchase-history">
          <h3>Historial de Compras</h3>
          <div v-if="user.historialCompras && user.historialCompras.length > 0">
            <!-- Mostrar compras si existen -->
          </div>
          <div v-else>
            <p>No tienes historial de compras aún.</p>
          </div>
        </div>
      </div>
      <div v-else>
        <p>No has iniciado sesión. <router-link to="/login">Iniciar sesión</router-link></p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "Perfil",
    data() {
      return {
        user: null
      };
    },
    mounted() {
      const userData = localStorage.getItem("currentUser");
      if (userData) {
        this.user = JSON.parse(userData);
      } else {
        this.$router.push("/login");
      }
    },
    methods: {
      handleFileChange(event) {
        const file = event.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (e) => {
            this.user.foto = e.target.result;
            localStorage.setItem("currentUser", JSON.stringify(this.user));
            
            let users = JSON.parse(localStorage.getItem("users")) || [];
            users = users.map(u => {
              if (u.email === this.user.email) {
                return {...u, foto: e.target.result};
              }
              return u;
            });
            localStorage.setItem("users", JSON.stringify(users));
          };
          reader.readAsDataURL(file);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap');
  
  .perfil-container {
    font-family: 'Montserrat', sans-serif;
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
    color: #333;
  }
  
  .profile-card {
    background: white;
    border-radius: 16px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
    overflow: hidden;
    padding: 2.5rem;
    margin-top: 80px; 
  }
  
  .user-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    padding-bottom: 2rem;
    border-bottom: 1px solid #f0f0f0;
    margin-bottom: 2rem;
  }
  
  @media (min-width: 768px) {
    .user-info {
      flex-direction: row;
      align-items: flex-start;
    }
  }
  
  .image-container {
    position: relative;
    width: 180px;
    height: 180px;
    flex-shrink: 0;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .image-container:hover .edit-overlay {
    opacity: 1;
  }
  
  .image-container:hover .user-avatar {
    filter: brightness(0.7);
  }
  
  .user-avatar {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
    border: 4px solid #f8f8f8;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
  }
  
  .default-avatar {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: linear-gradient(135deg, #f5f5f5, #e0e0e0);
    display: flex;
    justify-content: center;
    align-items: center;
    color: #888;
    font-weight: 500;
    border: 4px solid #f8f8f8;
    text-align: center;
    padding: 1rem;
    box-sizing: border-box;
  }
  
  .edit-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.5);
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;
    transition: opacity 0.3s ease;
    font-weight: 500;
    text-align: center;
    padding: 1rem;
    box-sizing: border-box;
  }
  
  .file-input {
    display: none;
  }
  
  .user-details {
    flex-grow: 1;
  }
  
  .user-details h2 {
    font-size: 2rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
    color: #2c3e50;
    position: relative;
    display: inline-block;
  }
  
  .user-details h2::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 0;
    width: 50px;
    height: 4px;
    background: linear-gradient(90deg, #b88c3a, #d6a441);
    border-radius: 2px;
  }
  
  .user-details p {
    font-size: 1rem;
    margin-bottom: 0.8rem;
    line-height: 1.6;
  }
  
  .user-details strong {
    color: #b88c3a;
    font-weight: 600;
  }
  
  .purchase-history {
    margin-top: 2rem;
  }
  
  .purchase-history h3 {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
    color: #2c3e50;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid #f0f0f0;
  }
  
  .purchase-history p {
    color: #666;
    font-size: 0.95rem;
  }
  
  /* Estilos para cuando no hay usuario */
  .perfil-container > div:not(.profile-card) {
    text-align: center;
    padding: 2rem;
    background: white;
    border-radius: 16px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  }
  
  .perfil-container > div:not(.profile-card) p {
    font-size: 1.1rem;
    margin-bottom: 1rem;
  }
  
  .perfil-container > div:not(.profile-card) a {
    color: #b88c3a;
    font-weight: 600;
    text-decoration: none;
    transition: color 0.3s;
  }
  
  .perfil-container > div:not(.profile-card) a:hover {
    color: #d6a441;
    text-decoration: underline;
  }
  
  /* Efectos de transición */
  .profile-card {
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