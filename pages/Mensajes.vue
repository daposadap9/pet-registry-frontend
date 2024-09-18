<template>
    <div class="flex">
      <VerticalMenu />
      <div class="flex-1">
        <Header />
  
        <div class="container mx-auto px-4 py-6 mt-16 p-1 bg-gray-900">
          <h1 class="text-4xl font-bold text-center mb-6 text-white shadow-lg p-4 border-b-4 border-blue-500">Mensajes</h1>
  
          <!-- Lista de mensajes quemados -->
          <div v-for="message in messages" :key="message.id" :class="['message-container', message.sender === 'Usuario1' ? 'sent' : 'received']">
            <div class="flex items-center mb-2">
              <img :src="message.profilePic" alt="Profile Picture" class="w-8 h-8 rounded-full mr-2">
              <h2 class="text-sm font-bold text-white">{{ message.senderAlias }}</h2>
            </div>
            <p class="message-content">{{ message.content }}</p>
            <p class="message-timestamp">{{ message.timestamp }}</p>
          </div>
  
          <!-- Formulario para enviar mensajes -->
          <div class="message-form">
            <form @submit.prevent="sendMessage">
              <div class="flex items-center gap-1">
                <textarea v-model="newMessage.content" id="content" class="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800 text-white placeholder-gray-400" placeholder="Escribe un mensaje..." required></textarea>
                <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 flex items-center">
                  <svg class="w-6 h-6 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                  Enviar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import VerticalMenu from '~/components/VerticalMenu.vue';
  import Header from '../components/Header.vue';
  
  export default {
    components: {
      VerticalMenu,
      Header
    },
    data() {
      return {
        messages: [
          { id: 1, sender: 'Usuario1', senderAlias: 'Juan', profilePic: 'https://via.placeholder.com/150', content: 'Hola, ¿cómo estás?', timestamp: '2024-09-17 10:00' },
          { id: 2, sender: 'Usuario2', senderAlias: 'María', profilePic: 'https://via.placeholder.com/150', content: 'Todo bien, ¿y tú?', timestamp: '2024-09-17 10:05' },
          { id: 3, sender: 'Usuario1', senderAlias: 'Juan', profilePic: 'https://via.placeholder.com/150', content: 'Muy bien, gracias.', timestamp: '2024-09-17 10:10' }
        ],
        newMessage: {
          content: ''
        }
      };
    },
    methods: {
      sendMessage() {
        // Código comentado para enviar mensaje a la API
        /*
        axios.post('https://api.example.com/messages', this.newMessage, {
          headers: this.getAuthHeaders()
        }).then(response => {
          this.messages.push(response.data);
          this.newMessage.content = '';
        }).catch(error => {
          console.error('Error al enviar el mensaje:', error);
        });
        */
        
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
      logout() {
        localStorage.removeItem('token');
        this.$router.push('/login'); // Redirige al usuario a la página de login
      }
    }
  };
  </script>
  
  <style scoped>
  /* Estilos para la vista de mensajes */
  .message-container {
    @apply p-4 rounded-lg shadow mb-4 max-w-md;
    position: relative;
  }
  
  .message-container.sent {
    @apply bg-blue-800 self-end;
    align-self: flex-end;
  }
  
  .message-container.received {
    @apply bg-gray-700 self-start;
    align-self: flex-start;
  }
  
  .message-content {
    @apply text-white;
  }
  
  .message-timestamp {
    @apply text-gray-400 text-xs mt-2;
    position: absolute;
    bottom: 2px;
    right: 10px;
  }
  
  .message-form {
    @apply bg-gray-800 p-4 rounded-lg shadow mt-4;
  }
  
  textarea {
    @apply w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800 text-white placeholder-gray-400;
  }
  
  button {
    @apply bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 flex items-center;
  }
  </style>
  