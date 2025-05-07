// stores/cart.js
import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'

export const useCartStore = defineStore('cart', () => {
  const items = ref([])

  // Cargar carrito desde localStorage
  if (typeof window !== 'undefined') {
    const savedCart = localStorage.getItem('cartItems')
    if (savedCart) items.value = JSON.parse(savedCart)
  }

  // Guardar cambios en localStorage
  watch(items, (newVal) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cartItems', JSON.stringify(newVal))
    }
  }, { deep: true })

  // Agregar producto al carrito
  const agregarProducto = (producto) => {
    const existe = items.value.find(item => item.id === producto.id)
    if (existe) {
      existe.cantidad += 1 // Incrementar cantidad si ya existe
    } else {
      items.value.push({ ...producto, cantidad: 1 }) // Agregar nuevo producto con cantidad 1
    }
  }

  // Eliminar producto del carrito
  const eliminarProducto = (id) => {
    items.value = items.value.filter(item => item.id !== id)
  }

  // Limpiar el carrito
  const limpiarCarrito = () => {
    items.value = []
    if (typeof window !== 'undefined') {
      localStorage.removeItem('cartItems') // Limpiar localStorage también
    }
  }

  // Total de productos en el carrito
  const totalItems = computed(() =>
    items.value.reduce((total, item) => total + item.cantidad, 0)
  )

  // Precio total del carrito
  const precioTotal = computed(() =>
    items.value.reduce((total, item) => total + (item.precio * item.cantidad), 0)
  )

  return {
    items,
    agregarProducto,
    eliminarProducto,
    limpiarCarrito,
    totalItems,
    precioTotal
  }
})
