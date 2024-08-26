<template>
    <transition name="fade">
      <div v-if="show" class="fixed top-10 inset-x-0 flex items-center justify-center z-50">
        <div :class="['max-w-sm w-full p-4 rounded-lg shadow-2xl', notificationClass]">
          <div class="flex items-center">
            <svg v-if="success" class="w-6 h-6 mr-3 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            <svg v-else class="w-6 h-6 mr-3 text-red-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
            <p class="text-lg">{{ message }}</p>
          </div>
        </div>
      </div>
    </transition>
  </template>
  
  <script>
  export default {
    props: {
      show: {
        type: Boolean,
        default: false
      },
      message: {
        type: String,
        default: ''
      },
      success: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      notificationClass() {
        return this.success ? 'bg-green-100 border-green-400 text-green-700 border' : 'bg-red-100 border-red-400 text-red-700 border';
      }
    },
    watch: {
      show(newValue) {
        if (newValue) {
          setTimeout(() => {
            this.$emit('update:show', false);
          }, 3000); // Desaparecer después de 3 segundos
        }
      }
    }
  }
  </script>
  
  <style scoped>
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
  </style>
  