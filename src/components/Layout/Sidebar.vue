<template>
  <!-- Botón de menú visible (fuera del aside) -->
  <div>
    <button 
      class="menu-toggle"
      @click="$emit('toggle-sidebar')"
      aria-label="Abrir menú"
      :aria-expanded="isOpen"
    >
      <i class="fas fa-bars"></i>
    </button>

    <!-- Overlay para cerrar al hacer clic fuera -->
    <div 
      class="sidebar-overlay"
      :class="{ 'sidebar-overlay--visible': isOpen }"
      @click="$emit('close')"
      v-if="isOpen"
    ></div>

    <!-- Sidebar lateral -->
    <aside 
      class="sidebar"
      :class="{ 'sidebar--open': isOpen }"
      :aria-hidden="!isOpen"
      role="navigation"
    >
      <!-- Botón para cerrar -->
      <button 
        class="sidebar__close"
        @click="$emit('close')"
        aria-label="Cerrar menú"
      >
        <i class="fas fa-times"></i>
      </button>

      <!-- Encabezado -->
      <div class="sidebar__header">
        <h2 class="sidebar__title">Colecciones</h2>
      </div>

      <!-- Navegación -->
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
        { label: 'Anillos', to: '/anillos', icon: 'gem' },
        { label: 'Pulseras', to: '/pulseras', icon: 'circle-notch' },
        { label: 'Cadenas', to: '/cadenas', icon: 'link' },
        { label: 'Relojes', to: '/relojes', icon: 'clock' },
        { label: 'Piercing', to: '/piercing', icon: 'star-of-life' },
      ]
    };
  },
  methods: {
    handleLinkClick() {
      this.$emit('close');
    },
    isCurrentRoute(routePath) {
      return this.$route.path === routePath;
    }
  }
};
</script>

<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600&family=Montserrat:wght@400;500;600&display=swap');
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');

/* Variables globales */
:root {
  --sidebar-width: 320px;
  --sidebar-bg: #1a1a1a;
  --sidebar-header-bg: #121212;
  --text-color: #e8e8e8;
  --text-active: #d4af37;
  --text-hover: #f0d07d;
  --border-color: rgba(212, 175, 55, 0.2);
  --transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  --link-padding: 1.2rem 1.8rem;
  --overlay-bg: rgba(0, 0, 0, 0.5);
}

/* Botón de toggle */
.menu-toggle {
  position: fixed;
  top: 4px;
  left: 20px;
  background: var(--sidebar-bg);
  color: var(--text-active);
  border: none;
  border-radius: 6px;
  padding: 10px 12px;
  font-size: 1.2rem;
  cursor: pointer;
  z-index: 999;
  transition: var(--transition);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);

  &:hover {
    background: var(--text-active);
    color: var(--sidebar-bg);
    transform: scale(1.05);
  }

  &:focus {
    outline: 2px solid var(--text-hover);
    outline-offset: 2px;
  }
}

/* Overlay para fondo oscuro */
.sidebar-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--overlay-bg);
  z-index: 999;
  opacity: 0;
  transition: opacity 0.3s ease;
  backdrop-filter: blur(3px);

  &--visible {
    opacity: 1;
  }
}

/* Sidebar */
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  width: var(--sidebar-width);
  height: 100vh;
  background: var(--sidebar-bg);
  transform: translateX(-100%);
  transition: var(--transition);
  z-index: 1000;
  overflow-y: auto;
  box-shadow: 6px 0 30px rgba(0, 0, 0, 0.3);
  overscroll-behavior: contain;

  &--open {
    transform: translateX(0);
  }

  &__close {
    position: absolute;
    top: 20px;
    right: 20px;
    background: transparent;
    border: none;
    color: var(--text-active);
    font-size: 1.3rem;
    cursor: pointer;
    transition: var(--transition);
    z-index: 10;
    padding: 8px;
    border-radius: 50%;

    &:hover {
      color: var(--text-hover);
      transform: rotate(90deg);
      background: rgba(255, 255, 255, 0.1);
    }

    &:focus {
      outline: 2px solid var(--text-hover);
      outline-offset: 2px;
    }
  }

  &__header {
    padding: 2.2rem 1.8rem 1rem;
    background: var(--sidebar-header-bg);
    border-bottom: 1px solid var(--border-color);
    margin-top: 60px;
    position: sticky;
    top: 0;
    z-index: 5;
  }

  &__title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(1.4rem, 2vw, 1.6rem);
    font-weight: 600;
    color: var(--text-active);
    margin: 0;
    letter-spacing: 1px;
  }

  &__list {
    list-style: none;
    padding: 1rem 0;
    margin: 0;
  }

  &__item {
    border-bottom: 1px solid var(--border-color);
    transition: var(--transition);
    backdrop-filter: blur(4px);

    &:hover {
      background: rgba(212, 175, 55, 0.08);
      backdrop-filter: blur(6px);
    }

    &:last-child {
      border-bottom: none;
    }
  }

  &__link {
    display: flex;
    align-items: center;
    padding: var(--link-padding);
    color: var(--text-color);
    text-decoration: none;
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(1rem, 1.5vw, 1.1rem);
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
        transform: translateX(4px);
      }
    }

    &:focus {
      outline: 2px solid var(--text-hover);
      outline-offset: -2px;
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
        width: 4px;
        background: var(--text-active);
      }

      .sidebar__link-icon {
        background: rgba(212, 175, 55, 0.3);
      }
    }
  }

  &__link-icon {
    font-size: 1.1rem;
    margin-right: 1rem;
    background: rgba(212, 175, 55, 0.15);
    border-radius: 50%;
    padding: 6px;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--text-active);
    transition: var(--transition);
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

/* Media Queries para diferentes tamaños de pantalla */
@media (max-width: 768px) {
  :root {
    --sidebar-width: 280px;
    --link-padding: 1rem 1.5rem;
  }

  .menu-toggle {
    top: 15px;
    left: 15px;
    padding: 8px 10px;
    font-size: 1.1rem;
  }

  .sidebar {
    &__header {
      margin-top: 50px;
      padding: 1.8rem 1.5rem 1rem;
    }

    &__close {
      top: 15px;
      right: 15px;
      font-size: 1.2rem;
    }
  }
}

@media (max-width: 480px) {
  :root {
    --sidebar-width: 85vw;
    --link-padding: 0.9rem 1.2rem;
  }

  .menu-toggle {
    top: 12px;
    left: 12px;
    padding: 7px 9px;
    font-size: 1rem;
  }

  .sidebar {
    &__header {
      margin-top: 45px;
      padding: 1.5rem 1.2rem 0.8rem;
    }

    &__link-icon {
      width: 28px;
      height: 28px;
      font-size: 1rem;
      margin-right: 0.8rem;
    }
  }
}

/* Para pantallas muy pequeñas (ej. Galaxy Fold) */
@media (max-width: 320px) {
  :root {
    --sidebar-width: 90vw;
    --link-padding: 0.8rem 1rem;
  }

  .sidebar {
    &__link {
      font-size: 0.95rem;
    }

    &__link-icon {
      width: 26px;
      height: 26px;
      padding: 5px;
    }
  }
}

/* Para tablets en orientación horizontal */
@media (min-width: 769px) and (max-width: 1024px) and (orientation: landscape) {
  :root {
    --sidebar-width: 300px;
  }
}

/* Para dispositivos con altura reducida (ej. móviles en landscape) */
@media (max-height: 500px) {
  .sidebar {
    &__header {
      margin-top: 40px;
      padding: 1.5rem 1.8rem 0.8rem;
    }

    &__title {
      font-size: 1.3rem;
    }

    &__link {
      padding: 0.8rem 1.8rem;
    }
  }
}
</style>