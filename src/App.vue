<template>
  <div class="app-container">
    <!-- Sidebar -->
    <SidebarComponent :isOpen="sidebarOpen" />

    <div class="main-content">
      <!-- Navbar con evento -->
      <NavbarComponent @toggle-sidebar="sidebarOpen = !sidebarOpen" />

      <!-- Contenido dinámico -->
      <router-view />
    </div>
  </div>
</template>

<script>
import NavbarComponent from "./components/Navbar.vue";
import SidebarComponent from "./components/Sidebar.vue";

export default {
  components: {
    NavbarComponent,
    SidebarComponent,
  },
  data() {
    return {
      sidebarOpen: false, // Estado inicial del sidebar
    };
  },
};
</script>

<style scoped>
/* Layout principal */
.app-container {
  display: flex;
  height: 100vh;
}

/* Contenedor principal */
.main-content {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  margin-left: 0; /* Ajuste dinámico */
}
</style>
