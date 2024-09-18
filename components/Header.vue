<template>
  <header class="bg-blue-600 text-white p-4 fixed top-0 left-0 w-full z-20">
    <div class="container mx-auto flex justify-between items-center">
      <h1 class="text-2xl font-bold">Mi Aplicación</h1>
      <button @click="logout" class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">
        Cerrar Sesión
      </button>
    </div>
  </header>
</template>

<script>
export default {
  methods: {
    logout() {
      // Eliminar el token de localStorage
      localStorage.removeItem('token');

      // Redirigir a la página de login
      this.$router.push('/login');
    }
  }
};
</script>

<style scoped>
/* Estilos opcionales para el header */
</style>
