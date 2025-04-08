import { defineStore } from 'pinia'; 
import { ref, computed } from 'vue';
export const useCartStore = defineStore('cart', () => {
    const carrito = ref([])
  
    const totalCarrito = computed(() =>
      carrito.value.reduce((total, item) => total + item.precio, 0)
    )
  
    const cantidadCarrito = computed(() =>
      carrito.value.length
    )
  
    function agregarAlCarrito(producto) {
      carrito.value.push(producto)
    }
  
    function removeFromCart(index) {
      carrito.value.splice(index, 1)
    }
  
    function vaciarCarrito() {
      carrito.value = []
    }
  
    return {
      carrito,
      totalCarrito,
      cantidadCarrito,
      agregarAlCarrito,
      removeFromCart,
      vaciarCarrito
    }
  })
  