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
  middleware: 'auth',
  data() {
    return {
      isAuthenticated: false
    };
  },
  async created() {
    if (process.client) {
      this.isAuthenticated = !!localStorage.getItem('token');
      if (!this.isAuthenticated) {
        this.$router.push('/login');
      }
    }
  }
};
</script>

<style scoped>
/* Estilos para la página principal */
</style>
