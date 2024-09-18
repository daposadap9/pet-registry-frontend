<template>
    <div class="flex">
      <VerticalMenu class="z-10" />
      <div class="flex-1">
        <Header />
  
        <div class="container mx-auto px-4 py-6 mt-16 p-1 bg-gray-900">
          <div class="hidden md:flex">
            <UserList :users="users" @select-user="selectUser" />
            <Chat :messages="messages" :sendMessage="sendMessage" :newMessage="newMessage" />
          </div>
          <div class="md:hidden">
            <div class="tabs">
              <button @click="activeTab = 'users'" :class="{ 'active': activeTab === 'users' }">Usuarios</button>
              <button @click="activeTab = 'messages'" :class="{ 'active': activeTab === 'messages' }">Mensajes</button>
            </div>
            <div v-if="activeTab === 'users'">
              <UserList :users="users" @select-user="selectUser" />
            </div>
            <div v-if="activeTab === 'messages'">
              <Chat :messages="messages" :sendMessage="sendMessage" :newMessage="newMessage" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  
  <script>
import VerticalMenu from '~/components/VerticalMenu.vue';
import Header from '../components/Header.vue';
import UserList from '~/components/UserList.vue';
import Chat from '~/components/Chat.vue';

export default {
  components: {
    VerticalMenu,
    Header,
    UserList,
    Chat
  },
  data() {
    return {
      users: [
        { id: 1, alias: 'Juan', profilePic: 'https://via.placeholder.com/150' },
        { id: 2, alias: 'María', profilePic: 'https://via.placeholder.com/150' },
        { id: 3, alias: 'Carlos', profilePic: 'https://via.placeholder.com/150' }
      ],
      messages: [],
      newMessage: {
        content: ''
      },
      activeTab: 'users'
    };
  },
  methods: {
    sendMessage() {
      // Mensaje quemado para demostración
      const newId = this.messages.length + 1;
      const newMessage = {
        id: newId,
        sender: 'Usuario1',
        senderAlias: 'Juan',
        profilePic: 'https://via.placeholder.com/150',
        content: this.newMessage.content,
        timestamp: new Date().toISOString().slice(0, 19).replace('T', ' ')
      };
      this.messages.push(newMessage);
      this.newMessage.content = '';
    },
    selectUser(user) {
      // Datos quemados para cada usuario
      const chats = {
        1: [
          { id: 1, sender: 'Usuario1', senderAlias: 'Juan', profilePic: 'https://via.placeholder.com/150', content: 'Hola, ¿cómo estás?', timestamp: '2024-09-17 10:00' },
          { id: 2, sender: 'Usuario2', senderAlias: 'María', profilePic: 'https://via.placeholder.com/150', content: 'Todo bien, ¿y tú?', timestamp: '2024-09-17 10:05' },
          { id: 3, sender: 'Usuario1', senderAlias: 'Juan', profilePic: 'https://via.placeholder.com/150', content: 'Muy bien, gracias.', timestamp: '2024-09-17 10:10' }
        ],
        2: [
          { id: 1, sender: 'Usuario2', senderAlias: 'María', profilePic: 'https://via.placeholder.com/150', content: 'Hola, ¿qué tal?', timestamp: '2024-09-17 11:00' },
          { id: 2, sender: 'Usuario1', senderAlias: 'Juan', profilePic: 'https://via.placeholder.com/150', content: 'Todo bien, ¿y tú?', timestamp: '2024-09-17 11:05' },
          { id: 3, sender: 'Usuario2', senderAlias: 'María', profilePic: 'https://via.placeholder.com/150', content: 'Muy bien, gracias.', timestamp: '2024-09-17 11:10' }
        ],
        3: [
          { id: 1, sender: 'Usuario3', senderAlias: 'Carlos', profilePic: 'https://via.placeholder.com/150', content: 'Hola, ¿cómo te va?', timestamp: '2024-09-17 12:00' },
          { id: 2, sender: 'Usuario1', senderAlias: 'Juan', profilePic: 'https://via.placeholder.com/150', content: 'Todo bien, ¿y tú?', timestamp: '2024-09-17 12:05' },
          { id: 3, sender: 'Usuario3', senderAlias: 'Carlos', profilePic: 'https://via.placeholder.com/150', content: 'Muy bien, gracias.', timestamp: '2024-09-17 12:10' }
        ]
      };

      // Cargar mensajes del usuario seleccionado
      this.messages = chats[user.id] || [];
      this.activeTab = 'messages';
    },
    logout() {
      localStorage.removeItem('token');
      this.$router.push('/login'); // Redirige al usuario a la página de login
    }
  }
};
</script>

  
  <style scoped>
  /* Estilos para la vista de mensajes */
  .tabs {
    @apply flex justify-around bg-blue-800 text-white p-4;
  }
  
  .tabs button {
    @apply flex-1 text-center p-2 rounded hover:bg-gray-700;
  }
  
  .tabs button.active {
    @apply bg-gray-700;
  }
  </style>
  