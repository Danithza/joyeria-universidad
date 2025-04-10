import { defineStore } from 'pinia';
import { ref, computed, onMounted, watch } from 'vue';


export const useCartStore = defineStore('cart', () => {
  const items = ref([]);

  // Cargar carrito desde localStorage al iniciar
  onMounted(() => {
    const savedCart = localStorage.getItem('cartItems');
    if (savedCart) items.value = JSON.parse(savedCart);
  });

  // Guardar cambios en localStorage
  watch(items, (newVal) => {
    localStorage.setItem('cartItems', JSON.stringify(newVal));
  }, { deep: true });

  // Añadir producto
  const agregarProducto = (producto) => {
    const existe = items.value.find(item => item.id === producto.id);
    if (existe) {
      existe.cantidad += 1;
    } else {
      items.value.push({ ...producto, cantidad: 1 });
    }
  };

  // Eliminar producto
  const eliminarProducto = (id) => {
    items.value = items.value.filter(item => item.id !== id);
  };

  // Total de items (contador)
  const totalItems = computed(() => {
    return items.value.reduce((total, item) => total + item.cantidad, 0);
  });

  // Precio total
  const precioTotal = computed(() => {
    return items.value.reduce((total, item) => total + (item.precio * item.cantidad), 0);
  });

  return { items, agregarProducto, eliminarProducto, totalItems, precioTotal };
});