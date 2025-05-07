import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null, // Guardará la información del usuario
  }),
  actions: {
    setUser(user) {
      this.user = user;
    },
    clearUser() {
      this.user = null;
    },
  },
});
