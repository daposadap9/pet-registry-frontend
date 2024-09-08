<template>
  <div class="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-500 p-6">
    <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <h2 class="text-2xl font-bold mb-6 text-center">Iniciar Sesión</h2>
      <form @submit.prevent="login">
        <div class="mb-4">
          <label class="block text-gray-700">Correo Electrónico</label>
          <input v-model="email" type="email" required class="w-full p-2 border border-gray-300 rounded mt-1" />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700">Contraseña</label>
          <input v-model="password" type="password" required class="w-full p-2 border border-gray-300 rounded mt-1" />
        </div>
        <button type="submit" class="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Iniciar Sesión</button>
        <p class="mt-4 text-center">
          ¿No tienes una cuenta? <a href="/register" class="text-blue-500 hover:underline">Regístrate</a>
        </p>
      </form>
      <Notification :show="notification.show" :message="notification.message" :success="notification.success"/>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Notification from '../components/Notification.vue';

export default {
  components: {
    Notification,
  },
  data() {
    return {
      email: '',
      password: '',
      notification: {
        show: false,
        message: '',
        success: false,
      },
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post(`${process.env.VUE_APP_API_URL}/login`, {
          email: this.email,
          password: this.password,
        });

        const token = response.data.token;
        localStorage.setItem('token', token);

        this.notification = {
          show: true,
          message: 'Inicio de sesión exitoso.',
          success: true,
        };

        this.$router.push('/');
      } catch (error) {
        this.notification = {
          show: true,
          message: 'Error al iniciar sesión. Verifica tus credenciales.',
          success: false,
        };
      }
    },
  },
};
</script>
