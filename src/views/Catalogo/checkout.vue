<template>
  <div class="checkout-form">
    <h1>Formulario de Pago</h1>

    <!-- Contacto destacado -->
    <section class="contacto-section">
      <h2>Información de Contacto</h2>
      <label>
        Correo o Teléfono:
        <input type="text" v-model="contacto" required />
      </label>
    </section>

    <!-- Formulario principal -->
    <form @submit.prevent="pagar">
      <div class="nombre-apellido">
        <label>
          <input type="text" v-model="nombre" placeholder="Nombre" required />
        </label>
        <label>
          <input type="text" v-model="apellido" placeholder="Apellido" required />
        </label>
      </div>

      <label>
        <input type="text" v-model="numeroNit" placeholder="Número de identificación" required />
      </label>

      <label>
        <input type="text" v-model="direccion" placeholder="Dirección" required />
      </label>

      <label>
        <input type="text" v-model="direccionEspe" placeholder="Casa, apartamento, etc (opcional)" />
      </label>

      <div class="ubicacion">
        <label>
          <input type="text" v-model="ciudad" placeholder="Ciudad" required />
        </label>

        <label>
          <select v-model="provincia" required>
            <option value="" disabled selected>Provincia / Estado</option>
            <option value="amazonas">Amazonas</option>
            <option value="antoquia">Antioquia</option>
            <option value="bolivar">Bolívar</option>
            <option value="boyaca">Boyacá</option>
            <option value="bogota">Bogotá</option>
            <option value="honda">Honda</option>
            <option value="caldas">Caldas</option>
            <option value="cesar">Cesar</option>
            <option value="huila">Huila</option>
            <option value="meta">Meta</option>
            <option value="nariño">Nariño</option>
            <option value="tolima">Tolima</option>
            <option value="sucre">Sucre</option>
            <option value="valle">Valle del Cauca</option>
          </select>
        </label>

        <label>
          <input type="text" v-model="codigoPostal" placeholder="Código Postal (opcional)" />
        </label>
      </div>

      <label>
        <input type="text" v-model="telefono" placeholder="Teléfono" required />
      </label>

      <label>
        Tarjeta:
        <input type="text" v-model="tarjeta" required />
      </label>

      <!-- Resumen del carrito -->
      <section class="resumen-carrito" v-if="cartStore.items.length">
        <h2>Resumen de tu compra</h2>
        <ul>
          <li v-for="(item, index) in cartStore.items" :key="index">
            {{ item.nombre }} (x{{ item.cantidad }}) - ${{ item.precio * item.cantidad }}
          </li>
        </ul>
        <div class="totales">
          <p>Subtotal: ${{ subtotal }}</p>
          <p>Envío: ${{ envio }}</p>
          <p><strong>Total: ${{ total }}</strong></p>
        </div>
      </section>

      <button type="submit">Pagar Ahora</button>
    </form>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useCartStore } from '../../stores/useCartStore'

const cartStore = useCartStore()

// Datos del formulario
const contacto = ref('')
const nombre = ref('')
const apellido = ref('')
const direccion = ref('')
const tarjeta = ref('')
const numeroNit = ref('')
const direccionEspe = ref('')
const ciudad = ref('')
const provincia = ref('')
const codigoPostal = ref('')
const telefono = ref('')
const opcionesElegidas = ref([])

const envio = 8000

const subtotal = computed(() =>
  cartStore.items.reduce((acc, item) => acc + item.precio * item.cantidad, 0)
)

const total = computed(() => subtotal.value + envio)

const pagar = () => {
  alert('¡Compra exitosa! Gracias por tu pago.')

  // Limpiar campos del formulario
  contacto.value = ''
  nombre.value = ''
  apellido.value = ''
  direccion.value = ''
  tarjeta.value = ''
  numeroNit.value = ''
  direccionEspe.value = ''
  ciudad.value = ''
  provincia.value = ''
  codigoPostal.value = ''
  telefono.value = ''
  opcionesElegidas.value = []

  // Limpiar carrito
  cartStore.clearCart()
}
</script>

<style scoped>
.checkout-form {
  padding: 2rem;
  max-width: 700px;
  margin: 7rem auto;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: #f7f7f7;
  border-radius: 12px;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  color: #333;
  margin-bottom: 1rem;
}

h2 {
  font-size: 1.2rem;
  color: #444;
  margin-bottom: 0.5rem;
}

.contacto-section {
  background-color: #ececec;
  padding: 1rem;
  border-radius: 10px;
  margin-top: 3.5rem;
  margin-bottom: 1.5rem;
}

form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

input,
select {
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  width: 100%;
  box-sizing: border-box;
}

button {
  padding: 0.75rem;
  background-color: #252323;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #444;
}

.nombre-apellido {
  display: flex;
  gap: 1rem;
}

.nombre-apellido label {
  flex: 1;
}

.ubicacion {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.ubicacion label {
  flex: 1;
  min-width: 150px;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.95rem;
}

.resumen-carrito {
  margin-top: 2rem;
  background-color: #ffffff;
  padding: 1rem;
  border-radius: 10px;
  border: 1px solid #ccc;
}

.resumen-carrito ul {
  list-style: none;
  padding-left: 0;
}

.resumen-carrito li {
  margin-bottom: 0.5rem;
}

.totales p {
  margin: 0.3rem 0;
  font-weight: 500;
}
</style>
