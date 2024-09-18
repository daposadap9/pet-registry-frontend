<template>
    <div>
      <DesktopMenu class="hidden md:block" />
      <MobileMenu class="md:hidden" />
    </div>
  </template>
  
  <script>
  import DesktopMenu from './DesktopMenu.vue';
  import MobileMenu from './MobileMenu.vue';
  
  export default {
    name: 'VerticalMenu',
    components: {
      DesktopMenu,
      MobileMenu
    }
  };
  </script>
  
  <style scoped>
  /* Estilos adicionales si es necesario */
  </style>
  