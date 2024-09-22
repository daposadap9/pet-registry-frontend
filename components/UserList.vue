<template class="bg-chat-background">
    <div :class="['bg-gray-800 text-white min-h-screen p-4 shadow-lg transition-all duration-300 ease-in-out', { 'w-full': isMobile, 'w-80': !isMobile }]">
      <h2 class="text-2xl font-bold mb-4">Usuarios</h2>
      <nav>
        <ul>
          <li v-for="user in users" :key="user.id" class="mb-2 bg-gray-800 border-b-2 border-b-slate-400 flex justify-between items-center">
            <a @click="$emit('select-user', user)" class="block px-4 py-2 rounded hover:bg-gray-700 flex items-center cursor-pointer user-item w-full">
              <img :src="user.profilePic" alt="Profile Picture" class="w-8 h-8 rounded-full mr-2">
              <div class="flex-1">
                <span>{{ user.alias }}</span>
                <p class="text-sm text-gray-400">{{ lastMessages[user.id] }}</p>
              </div>
              <span class="text-xs text-gray-400 ml-2">{{ formatDate(lastMessageDates[user.id]) }}</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </template>
  
  <script>
  export default {
    name: 'UserList',
    props: ['users', 'lastMessages', 'lastMessageDates'],
    data() {
      return {
        isMobile: false
      };
    },
    mounted() {
      this.checkViewport();
      window.addEventListener('resize', this.checkViewport);
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.checkViewport);
    },
    methods: {
      checkViewport() {
        this.isMobile = window.innerWidth < 1024;
      },
      formatDate(timestamp) {
        const date = new Date(timestamp);
        const today = new Date();
        const oneDay = 24 * 60 * 60 * 1000;
        const oneWeek = 7 * oneDay;
  
        if (date.toDateString() === today.toDateString()) {
          return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        } else if (today - date < oneWeek) {
          return date.toLocaleDateString('es-ES', { weekday: 'long' });
        } else {
          return date.toLocaleDateString();
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .user-item:hover {
    background-color: #4a5568; /* Color de hover */
    cursor: pointer;
  }
  </style>
  