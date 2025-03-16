<template>
  <nav class="navbar">
    <button class="menu-btn" @click="$emit('toggleSidebar')">☰</button>
    
    <div class="logo-container">
      <img src="/logo-joyas-.png" alt="Logo" class="logo-img" />
      <h1 class="logo">Elegancia Digital en Línea</h1>
    </div>

    <div class="nav-icons">
      <router-link to="/" class="icon-group">
        <i class="fas fa-home"></i>
        <span>Inicio</span>
      </router-link>
      <router-link to="/soporte" class="icon-group"> 
        <i class="fas fa-headset"></i>
        <span>Soporte</span>
      </router-link>
      <router-link to="/login" class="icon-group">
        <i class="fas fa-user"></i>
      </router-link>
      <a href="#"><i class="fas fa-shopping-cart"></i><span>(0)</span></a>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600&display=swap');
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css');
@import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&family=Great+Vibes&family=Playfair+Display:wght@700&display=swap');

.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #f5f5f5;
  padding: 15px 30px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 1000;
}

.menu-btn {
  font-size: 1.8rem;
  background: #c90000;
  border: none;
  border-radius: 8px;
  padding: 10px 15px;
  cursor: pointer;
  color: white;
  transition: background 0.3s, transform 0.2s;
}

.menu-btn:hover {

  background: #a70000;
  transform: scale(1.1);
}

.logo-container {
  display: flex;
  align-items: center;
  gap: 10px;
}

.logo-img {
  width: 97px;
  height: auto;
  border-radius: 8px;
}

.logo {
  font-family: 'Great Vibes', cursive;
  font-size: 2.9rem;
  color: black;
  font-weight: bold;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
}

.nav-icons {
  display: flex;
  align-items: center;
  gap: 20px;
}

.nav-icons a,
.nav-icons router-link {
  
  font-size: 1.4rem;
  color: black;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: color 0.3s, transform 0.2s;
  font-family: 'Montserrat', sans-serif;
}

.nav-icons a:hover,
.nav-icons router-link:hover {
  color: #c90000;
  transform: scale(1.2);
}

.nav-icons span {
  font-size: 1rem;
  font-weight: bold;
}

.icon-group {
  display: flex;
  align-items: center;
  gap: 5px;
}

.icon-group i {
  font-size: 1.5rem;
}

.nav-icons a,
.nav-icons router-link {
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);
}
</style>
