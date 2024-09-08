<template>
  <div>
    <Home v-if="isAuthenticated"/>
    <p v-else>Redirigiendo a la página de inicio de sesión...</p>
  </div>
</template>

<script>
import Home from '~/pages/Home.vue';

export default {
  components: {
    Home
  },
  middleware: 'auth', // El middleware maneja la redirección
  computed: {
    isAuthenticated() {
      return !!localStorage.getItem('token');
    }
  }
};
</script>

<style scoped>
/* Estilos para la página principal */
</style>
