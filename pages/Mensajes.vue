<template>
    <div class="flex">
      <VerticalMenu class="z-10" />
      <div class="flex-1">
        <Header />
        <div class="mx-auto px-4 py-6 mt-16 p-1 h-full bg-gray-900">
          <div class="hidden lg:flex">
            <UserList :users="users" :lastMessages="lastMessages" :lastMessageDates="lastMessageDates" @select-user="selectUser" />
            <Chat :messages="messages" :sendMessage="sendMessage" :newMessage="newMessage" />
          </div>
          <div class="lg:hidden bg-blue-700">
            <div class="tabs w-5" v-if="activeTab === 'messages'"> <!-- Mostrar el botón solo en la vista de mensajes -->
              <button @click="activeTab = 'users'" :class="{ 'active': activeTab === 'users' }">
                <img src="~/assets/back.png" alt="Regresar" class="tab-icon" />
                Regresar
              </button>
            </div>
            <div class="bg-chat-background" v-if="activeTab === 'users'">
              <UserList :users="users" :lastMessages="lastMessages" :lastMessageDates="lastMessageDates" @select-user="selectUser" />
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
        activeTab: 'users',
        lastMessages: {},
        lastMessageDates: {},
        selectedUserAlias: ''
      };
    },
    watch: {
      messages: {
        handler() {
          this.updateLastMessages();
        },
        deep: true
      }
    },
    methods: {
      sendMessage() {
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
        this.updateLastMessage('Usuario1', newMessage);
        this.newMessage.content = '';
      },
      selectUser(user) {
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
  
        this.messages = chats[user.id] || [];
        this.selectedUserAlias = user.alias;
        this.activeTab = 'messages';
      },
      updateLastMessage(userId, message) {
        this.$set(this.lastMessages, userId, message.content);
        this.$set(this.lastMessageDates, userId, message.timestamp);
      },
      updateLastMessages() {
        this.users.forEach(user => {
          const userMessages = this.messages.filter(message => message.sender === user.alias || message.senderAlias === user.alias);
          if (userMessages.length > 0) {
            const lastMessage = userMessages[userMessages.length - 1];
            this.updateLastMessage(user.id, lastMessage);
          }
        });
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
      },
      logout() {
        localStorage.removeItem('token');
        this.$router.push('/login'); 
      }
    }
  };
  </script>
  
  <style scoped>
  .bg-chat-background {
    background-image: url('~/assets/background.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    min-height: 100vh;
  }
  
  .tabs {
    @apply flex justify-around text-white p-4 ;
  }
  
  .tabs button {
    @apply flex-1 text-center p-2 rounded bg-blue-500 hover:bg-gray-500;
  }
  
  .tabs button.active {
    @apply bg-blue-700;
  } 
  
  .tab-icon {
    width: 24px;
    height: 24px;
    margin-right: 8px;
  }
  </style>
  