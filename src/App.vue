<template>
  <div class="app-container">
    <!-- Sidebar -->
    <SidebarComponent :isOpen="sidebarOpen" />

    <div class="main-content">
      <!-- Navbar con evento -->
      <NavbarComponent @toggle-sidebar="sidebarOpen = !sidebarOpen" />

      <!-- Contenido dinámico -->
      <router-view />

      <!-- Footer -->
      <FooterComponent class="footer" />
    </div>
  </div>
</template>

<script>
import NavbarComponent from "./components/Layout/Navbar.vue";
import SidebarComponent from "./components/Layout/Sidebar.vue";
import FooterComponent from "./components/Layout/footer.vue"; // Ruta corregida

export default {
  components: {
    NavbarComponent,
    SidebarComponent,
    FooterComponent, 
  },
  data() {
    return {
      sidebarOpen: false, 
    };
  },
};
</script>

<style scoped>
/* Layout principal */
.app-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

/* Contenedor principal */
.main-content {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  margin-left: 0; /* Ajuste dinámico */
}

/* Asegurar que el footer esté al final */
.footer {
  text-align: center;
  padding: 10px;
  background: #f8f8f8;
  border-top: 1px solid #ddd;
  margin-top: auto;
}
</style>
