<template>
    <nav class="bg-gray-800 text-white fixed bottom-0 left-0 w-full flex justify-around shadow-lg">
      <router-link to="/" class="flex-1 text-center p-4 hover:bg-gray-700" :class="{ 'bg-gray-700': $route.path === '/' }">
        <svg class="w-6 h-6 mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 19.121a1.5 1.5 0 002.121 0L12 14.364l4.758 4.757a1.5 1.5 0 002.121-2.121L14.364 12l4.757-4.758a1.5 1.5 0 00-2.121-2.121L12 9.636 7.242 4.879a1.5 1.5 0 00-2.121 2.121L9.636 12l-4.757 4.758a1.5 1.5 0 000 2.121z"></path></svg>
        <span class="block">Mascotas</span>
      </router-link>
      <router-link to="/mensajes" class="flex-1 text-center p-4 hover:bg-gray-700" :class="{ 'bg-gray-700': $route.path === '/mensajes' }">
        <svg class="w-6 h-6 mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 10.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 11-7.6-11.4 8.38 8.38 0 013.8.9L21 3v7.5z"></path></svg>
        <span class="block">Mensajes</span>
      </router-link>
    </nav>
  </template>
  
  <script>
  export default {
    name: 'MobileMenu'
  };
  </script>
  
  <style scoped>
  /* Estilos para el menú móvil */
  </style>
  