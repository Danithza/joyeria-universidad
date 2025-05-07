<template>
  <!-- Sidebar controlado solo por clases -->
  <div 
    class="sidebar"
    :class="{ open: isOpen }"
  >
    <ul>
      <li v-for="(item, index) in links" :key="index">
        <router-link :to="item.to" @click="handleLinkClick">
          {{ item.label }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    isOpen: Boolean,
  },
  emits: ['close'],
  data() {
    return {
      links: [
        { label: 'Anillos', to: '/anillos' },
        { label: 'Pulseras', to: '/pulseras' },
        { label: 'Cadenas', to: '/cadenas' },
        { label: 'Relojes', to: '/relojes' },
        { label: 'Piercing', to: '/piercing' },
      ],
    };
  },
  methods: {
    handleLinkClick() {
      this.$emit('close'); // Cierra el sidebar al hacer click en un enlace
    },
  },
};
</script>

<style scoped>
.sidebar {
  position: fixed;
  top: 0;
  left: -250px; /* Oculto por defecto */
  width: 250px;
  height: 100vh;
  background: linear-gradient(to bottom, #ffffff, #e0e0e0);
  padding: 20px;
  box-shadow: 5px 0 12px rgba(0, 0, 0, 0.4);
  z-index: 1000;
  transition: left 0.3s ease-in-out;
}

.sidebar.open {
  left: 0; /* Se muestra */
}

.sidebar ul {
  list-style: none;
  padding: 0;
  margin-top: 130px;
}

.sidebar ul li {
  margin-bottom: 20px;
}

.sidebar ul li a {
  font-size: 1.6rem;
  color: #b88c3a;
  text-decoration: none;
  font-weight: 600;
}
</style>
