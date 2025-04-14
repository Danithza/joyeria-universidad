<template>
  <div :class="['sidebar', isOpen ? 'open' : 'closed']">
    <ul>
      <li><router-link to="/anillos">Anillos</router-link></li>
      <li><router-link to="/pulseras">Pulseras</router-link></li>
      <li><router-link to="/cadenas">Cadenas</router-link></li>
      <li><router-link to="/relojes">Relojes</router-link></li>
      <li><router-link to="/piercing">Piercing</router-link></li>
      <li><router-link to="/joyeria-personalizada">Joyería Personalizada</router-link></li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    isOpen: Boolean, // Recibe el estado desde el componente padre
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600&display=swap');

.sidebar {
  position: fixed;
  top: 0;
  left: -250px; /* Oculto por defecto */
  width: 250px;
  height: 100vh;
  background: linear-gradient(to bottom, #fce8d8, #f7d9c4);
  padding: 20px;
  transition: left 0.3s ease-in-out;
  box-shadow: 5px 0 10px rgba(0, 0, 0, 0.5);
  z-index: 1000; /* Para asegurarse de que esté por encima de las imágenes */
}

.sidebar ul {
  list-style-type: disc; /* Asegura que todos los elementos tengan viñetas */
  padding-left: 20px; /* Ajusta la indentación */
  color: black; /* Hace que las viñetas sean negras */
  padding-top: 130px; /* Baja el contenido sin afectar la estructura */
}


.sidebar.open {
  left: 0; /* Se muestra al presionar el botón */
}

.sidebar ul {
  list-style-type: disc; /* Asegura que todos los elementos tengan viñetas */
  padding-left: 20px; /* Ajusta la indentación */
  color: black; /* Hace que las viñetas sean negras */
}

.sidebar ul li a {
  display: block;
  font-size: 1.8rem; /* Un poco más grande para mejor legibilidad */
  font-family: 'Cormorant Garamond', serif; /* Fuente más elegante */
  color: #8B5E3C; /* Marrón oscuro */
  font-weight: 600;
  padding: 10px 0; /* Baja los textos */
  text-decoration: none; /* Quita la línea debajo */
  transition: color 0.3s ease-in-out, transform 0.2s ease-in-out;
}

.sidebar ul li a:hover {
  color: black;
  transform: scale(1.05);
}
</style>
