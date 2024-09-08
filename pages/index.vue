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
  middleware: 'auth', // Middleware maneja la redirección
  data() {
    return {
      isAuthenticated: false
    };
  },
  async created() {
    if (process.client) {
      // Verifica el token en el cliente y actualiza el estado
      this.isAuthenticated = !!localStorage.getItem('token');
    }
  }
};
</script>

<style scoped>
/* Estilos para la página principal */
</style>
