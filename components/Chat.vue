<template>
    <div class="flex-1 bg-gray-900 p-4">
      <h1 class="text-4xl font-bold text-center mb-6 text-white shadow-lg p-4 border-b-4 border-blue-500">Mensajes</h1>
  
      <!-- Lista de mensajes -->
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
  </template>
  
  
  <script>
  export default {
    name: 'Chat',
    props: ['messages', 'sendMessage', 'newMessage']
  };
  </script>
  
  <style scoped>
/* Estilos para la vista de mensajes */
.message-container {
  @apply p-4 rounded-lg shadow mb-4 max-w-md;
  position: relative;
  display: flex;
  flex-direction: column;
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
