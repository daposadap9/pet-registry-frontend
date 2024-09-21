<template class="bg-chat-background">
    <div class="bg-gray-800 text-white w-64 min-h-screen p-4 shadow-lg transition-all duration-300 ease-in-out">
      <h2 class="text-2xl font-bold mb-4">Usuarios</h2>
      <nav>
        <ul>
          <li v-for="user in users" :key="user.id" class="mb-2">
            <a @click="$emit('select-user', user)" class="block px-4 py-2 rounded hover:bg-gray-700 flex items-center cursor-pointer user-item">
              <img :src="user.profilePic" alt="Profile Picture" class="w-8 h-8 rounded-full mr-2">
              <span>{{ user.alias }}</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </template>
  
  <script>
  export default {
    name: 'UserList',
    props: ['users']
  };
  </script>
  
  <style scoped>
  .user-item:hover {
    background-color: #4a5568; /* Color de hover */
    cursor: pointer;
  }
  </style>
  