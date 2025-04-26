<template>
  <div class="app-container">
    <SidebarComponent :isOpen="sidebarOpen" @close="sidebarOpen = false" />

    <div class="main-content">
      <NavbarComponent @toggle-sidebar="toggleSidebar" />

      <router-view />

      <FooterComponent class="footer" />
    </div>
  </div>
</template>

<script>
import NavbarComponent from "./components/Layout/Navbar.vue";
import SidebarComponent from "./components/Layout/Sidebar.vue";
import FooterComponent from "./components/Layout/footer.vue";

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
  methods: {
    toggleSidebar() {
      this.sidebarOpen = !this.sidebarOpen;
    },
  },
  watch: {
    $route() {
      this.sidebarOpen = false; // Cierra sidebar al navegar
    }
  }
};
</script>

<style scoped>
.app-container {
  display: flex;
  height: auto;
  flex-direction: row;
}
.main-content {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 100vh;
}
.footer {
  text-align: center;
  padding: 10px;
  background: #f8f8f8;
  border-top: 1px solid #ddd;
  margin-top: auto;
}
</style>
