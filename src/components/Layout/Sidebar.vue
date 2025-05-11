<template>
  <!-- Sidebar corregido con botón de menú visible -->
  <div>
    <button 
      class="menu-toggle"
      @click="$emit('toggle-sidebar')"
      aria-label="Toggle menu"
    >
      <i class="fas fa-bars"></i>
    </button>

    <aside 
      class="sidebar"
      :class="{ 'sidebar--open': isOpen }"
      aria-hidden="!isOpen"
    >
      <div class="sidebar__header">
        <h2 class="sidebar__title">Colecciones</h2>
      </div>
      <nav>
        <ul class="sidebar__list">
          <li 
            v-for="(item, index) in navLinks" 
            :key="index"
            class="sidebar__item"
          >
            <router-link 
              :to="item.to" 
              class="sidebar__link"
              @click="handleLinkClick"
              :aria-current="isCurrentRoute(item.to) ? 'page' : null"
            >
              <span class="sidebar__link-icon">
                <i :class="`fas fa-${item.icon}`"></i>
              </span>
              <span class="sidebar__link-text">{{ item.label }}</span>
              <span class="sidebar__link-arrow">
                <i class="fas fa-chevron-right"></i>
              </span>
            </router-link>
          </li>
        </ul>
      </nav>
    </aside>
  </div>
</template>

<script>
export default {
  props: {
    isOpen: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  emits: ['toggle-sidebar', 'close'],
  data() {
    return {
      navLinks: [
        { label: 'Anillos', to: '/anillos', icon: 'ring' },
        { label: 'Pulseras', to: '/pulseras', icon: 'link' }, // Cambiado a icono disponible
        { label: 'Cadenas', to: '/cadenas', icon: 'link' },
        { label: 'Relojes', to: '/relojes', icon: 'clock' },
        { label: 'Piercing', to: '/piercing', icon: 'bolt' },
      ],
    };
  },
  methods: {
    handleLinkClick() {
      this.$emit('close');
    },
    isCurrentRoute(routePath) {
      return this.$route.path === routePath;
    }
  },
};
</script>

<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600&family=Montserrat:wght@400;500;600&display=swap');
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');

/* Botón de toggle */
.menu-toggle {
  position: fixed;
  top: 20px;
  left: 20px;
  background: #1a1a1a;
  color: #d4af37;
  border: none;
  border-radius: 4px;
  padding: 10px 12px;
  font-size: 1.2rem;
  cursor: pointer;
  z-index: 999;
  transition: all 0.3s ease;
  
  &:hover {
    background: #d4af37;
    color: #1a1a1a;
  }
}

/* Sidebar */
.sidebar {
  --sidebar-width: 320px;
  --sidebar-bg: #1a1a1a;
  --sidebar-header-bg: #121212;
  --text-color: #e8e8e8;
  --text-active: #d4af37;
  --text-hover: #f0d07d;
  --border-color: rgba(212, 175, 55, 0.2);
  --transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
  --link-padding: 1.2rem 1.8rem;

  position: fixed;
  top: 0;
  left: calc(-1 * var(--sidebar-width));
  width: var(--sidebar-width);
  height: 100vh;
  background: var(--sidebar-bg);
  z-index: 1000;
  transition: var(--transition);
  will-change: transform;
  overflow-y: auto;
  box-shadow: 5px 0 30px rgba(0, 0, 0, 0.3);

  &--open {
    transform: translateX(var(--sidebar-width));
  }

  &__header {
    padding: 1.8rem 1.8rem 1rem;
    background: var(--sidebar-header-bg);
    border-bottom: 1px solid var(--border-color);
    margin-top: 60px; /* Espacio para el botón */
  }

  &__title {
    font-family: 'Playfair Display', serif;
    font-size: 1.6rem;
    font-weight: 600;
    color: var(--text-active);
    letter-spacing: 1px;
    margin: 0;
  }

  &__list {
    list-style: none;
    padding: 1rem 0;
    margin: 0;
  }

  &__item {
    border-bottom: 1px solid var(--border-color);
    transition: var(--transition);

    &:hover {
      background: rgba(212, 175, 55, 0.05);
    }
  }

  &__link {
    display: flex;
    align-items: center;
    padding: var(--link-padding);
    color: var(--text-color);
    text-decoration: none;
    font-family: 'Montserrat', sans-serif;
    font-size: 1.1rem;
    font-weight: 500;
    transition: var(--transition);
    position: relative;

    &:hover {
      color: var(--text-hover);
      
      .sidebar__link-icon {
        transform: scale(1.1);
      }
      
      .sidebar__link-arrow {
        opacity: 1;
        transform: translateX(3px);
      }
    }

    &[aria-current="page"] {
      color: var(--text-active);
      background: rgba(212, 175, 55, 0.08);

      &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        width: 3px;
        background: var(--text-active);
      }
    }
  }

  &__link-icon {
    font-size: 1.1rem;
    margin-right: 1.2rem;
    color: var(--text-active);
    transition: var(--transition);
    width: 24px;
    text-align: center;
  }

  &__link-text {
    flex: 1;
  }

  &__link-arrow {
    opacity: 0;
    font-size: 0.8rem;
    transition: var(--transition);
    color: var(--text-active);
  }
}

/* Responsive */
@media (max-width: 768px) {
  .menu-toggle {
    top: 15px;
    left: 15px;
    padding: 8px 10px;
  }

  .sidebar {
    --sidebar-width: 85vw;
    --link-padding: 1rem 1.5rem;

    &__header {
      margin-top: 50px;
    }

    &__title {
      font-size: 1.4rem;
    }

    &__link {
      font-size: 1rem;
    }
  }
}
</style>