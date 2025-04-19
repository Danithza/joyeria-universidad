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
/* App.vue */
.app-container {
  display: flex;
  height: auto;
  flex-direction: row; /* Sidebar y contenido principal en fila */
}

.main-content {
  display: flex;
  flex-direction: column;
  flex: 1; /* Muy importante: hace que el contenido se expanda verticalmente */
  min-height: 100vh;
}

.footer {
  text-align: center;
  padding: 10px;
  background: #f8f8f8;
  border-top: 1px solid #ddd;
  margin-top: auto; /* Empuja el footer hacia abajo */
}

</style>
