<template>
  <div class="checkout-form">
    <h1>Formulario de Pago</h1>

    <form @submit.prevent="pagar">
      <label>
        Correo:
        <input type="email" v-model="contacto" required />
      </label>

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
          <select v-model="ciudad" required>
            <option disabled value="">Seleccione una ciudad</option>
            <option value="Bogotá">Bogotá</option>
            <option value="Medellín">Medellín</option>
            <option value="Cali">Cali</option>
            <option value="Barranquilla">Barranquilla</option>
            <option value="Ibagué">Ibagué</option>
            <option value="Cartagena">Cartagena</option>
            <option value="Pereira">Pereira</option>
            <option value="Manizales">Manizales</option>
          </select>
        </label>

        <label>
          <select v-model="provincia" required>
            <option value="" disabled>Provincia / Estado</option>
            <option value="Amazonas">Amazonas</option>
            <option value="Antioquia">Antioquia</option>
            <option value="Bolívar">Bolívar</option>
            <option value="Boyacá">Boyacá</option>
            <option value="Caldas">Caldas</option>
            <option value="Tolima">Tolima</option>
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
        Método de Pago:
        <select v-model="metodoPago" required>
          <option disabled value="">Seleccione un método</option>
          <option value="tarjeta">Tarjeta de Crédito/Débito</option>
          <option value="pse">PSE</option>
          <option value="efectivo">Efectivo contra entrega</option>
        </select>
      </label>

      <label v-if="metodoPago === 'tarjeta'">
        Número de Tarjeta:
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

      <p v-if="compraExitosa" class="mensaje-exito">
        ¡Compra exitosa! Gracias por tu pago.
      </p>
    </form>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useCartStore } from '../../stores/useCartStore'

const cartStore = useCartStore()

const contacto = ref('')
const nombre = ref('')
const apellido = ref('')
const direccion = ref('')
const numeroNit = ref('')
const direccionEspe = ref('')
const ciudad = ref('')
const provincia = ref('')
const codigoPostal = ref('')
const telefono = ref('')
const metodoPago = ref('')
const tarjeta = ref('')
const compraExitosa = ref(false)

const envio = 8000
const subtotal = computed(() =>
  cartStore.items.reduce((acc, item) => acc + item.precio * item.cantidad, 0)
)
const total = computed(() => subtotal.value + envio)

const pagar = () => {
  compraExitosa.value = true

  // Limpiar formulario
  contacto.value = ''
  nombre.value = ''
  apellido.value = ''
  direccion.value = ''
  numeroNit.value = ''
  direccionEspe.value = ''
  ciudad.value = ''
  provincia.value = ''
  codigoPostal.value = ''
  telefono.value = ''
  metodoPago.value = ''
  tarjeta.value = ''
  
  cartStore.limpiarCarrito()
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

.mensaje-exito {
  color: green;
  font-weight: bold;
  margin-top: 1rem;
  text-align: center;
}
</style>
