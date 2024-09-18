<template>
    <aside class="bg-gray-800 text-white w-64 min-h-screen p-4 shadow-lg transition-all duration-300 ease-in-out mt-16">
      <h2 class="text-2xl font-bold mb-4">Menú</h2>
      <nav>
        <ul>
          <li class="mb-2">
            <router-link to="/" class="block px-4 py-2 rounded hover:bg-gray-700 flex items-center" :class="{ 'bg-gray-700': $route.path === '/' }">
              <svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 19.121a1.5 1.5 0 002.121 0L12 14.364l4.758 4.757a1.5 1.5 0 002.121-2.121L14.364 12l4.757-4.758a1.5 1.5 0 00-2.121-2.121L12 9.636 7.242 4.879a1.5 1.5 0 00-2.121 2.121L9.636 12l-4.757 4.758a1.5 1.5 0 000 2.121z"></path></svg>
              Mascotas
            </router-link>
          </li>
          <li class="mb-2">
            <router-link to="/mensajes" class="block px-4 py-2 rounded hover:bg-gray-700 flex items-center" :class="{ 'bg-gray-700': $route.path === '/mensajes' }">
              <svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 10.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 11-7.6-11.4 8.38 8.38 0 013.8.9L21 3v7.5z"></path></svg>
              Mensajes
            </router-link>
          </li>
        </ul>
      </nav>
    </aside>
  </template>
  
  <script>
  export default {
    name: 'DesktopMenu'
  };
  </script>
  
  <style scoped>
  /* Estilos para el menú de escritorio */
  </style>
  