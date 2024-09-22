<template>
    <div class="flex-1 bg-chat-background p-4 h-screen flex flex-col">
      <h1 class="text-4xl font-bold text-center mb-6 text-white shadow-lg p-4 border-b-4 border-blue-500">{{ messages.length > 0 ? messages[0].senderAlias : '' }}</h1>
  
      <!-- Lista de mensajes -->
      <div class="flex-1 overflow-y-hidden mb-20">
        <div
          v-for="message in messages"
          :key="message.id"
          :class="['message-container', message.sender === 'Usuario1' ? 'sent' : 'received']"
        >
          <div class="flex items-center mb-2">
            <img
              :src="message.profilePic"
              alt="Profile Picture"
              class="w-12 h-12 rounded-full mr-4"
            />
            <h2 class="text-lg font-bold text-white sm:text-md">{{ message.senderAlias }}</h2>
          </div>
          <p class="message-content text-lg sm:text-md">{{ message.content }}</p>
          <p class="message-timestamp">{{ message.timestamp }}</p>
        </div>
      </div>
  
      <!-- Formulario para enviar mensajes -->
      <div class="message-form fixed bottom-0 left-0 w-full bg-gray-800 p-4 z-10 mb-20 md:mb-0">
        <form @submit.prevent="sendMessage">
          <div class="flex items-center gap-2">
            <textarea
              v-model="newMessage.content"
              id="content"
              class="w-full border border-gray-300 p-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800 text-white placeholder-gray-400"
              placeholder="Escribe un mensaje..."
              required
            ></textarea>
            <button
              type="submit"
              class="bg-blue-500 text-white px-6 py-3 rounded-r-lg hover:bg-blue-600 flex items-center"
            >
              <svg
                class="w-8 h-8 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
              Enviar
            </button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Chat',
    props: ['messages', 'sendMessage', 'newMessage'],
  };
  </script>
  
  <style scoped>
  /* Estilos para la vista de mensajes */
  .message-container {
    @apply p-6 rounded-lg shadow-2xl mb-6 max-w-full; /* Permitir que se ajuste dinámicamente */
    position: relative;
  }
  
  .message-container.sent {
    @apply bg-blue-800 self-end ml-auto; /* Alineación a la derecha para mensajes enviados */
    max-width: 70%; /* Máximo ancho para mensajes enviados */
  }
  
  .message-container.received {
    @apply bg-gray-700 self-start mr-auto; /* Alineación a la izquierda para mensajes recibidos */
    max-width: 70%; /* Máximo ancho para mensajes recibidos */
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
    @apply bg-gray-800 p-6 rounded-lg shadow mt-4;
  }
  
  textarea {
    @apply w-full border border-gray-300 p-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800 text-white placeholder-gray-400;
  }
  
  button {
    @apply bg-blue-500 text-white px-6 py-3 rounded-r-lg hover:bg-blue-600 flex items-center;
  }
  </style>
  