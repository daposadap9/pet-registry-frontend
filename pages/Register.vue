<template>
  <div class="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-500">
    <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <h2 class="text-2xl font-bold mb-6 text-center">Registro</h2>
      <form @submit.prevent="register">
        <div class="mb-4">
          <label class="block text-gray-700">Nombre</label>
          <input v-model="name" type="text" required class="w-full p-2 border border-gray-300 rounded mt-1"/>
        </div>
        <div class="mb-4">
          <label class="block text-gray-700">Correo Electrónico</label>
          <input v-model="email" type="email" required class="w-full p-2 border border-gray-300 rounded mt-1" @blur="checkEmail"/>
          <p v-if="emailExists" class="text-red-600 text-sm">El correo electrónico ya está en uso.</p>
        </div>
        <div class="mb-4">
          <label class="block text-gray-700">Contraseña</label>
          <input v-model="password" type="password" required class="w-full p-2 border border-gray-300 rounded mt-1"/>
        </div>
        <div class="mb-4">
          <label class="block text-gray-700">Confirmar Contraseña</label>
          <input v-model="passwordConfirmation" type="password" required class="w-full p-2 border border-gray-300 rounded mt-1"/>
        </div>
        <button :disabled="emailExists || !formValid" type="submit" class="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Registrar</button>
        <p class="mt-4 text-center">
          ¿Ya tienes una cuenta? <a href="/login" class="text-blue-500 hover:underline">Iniciar sesión</a>
        </p>
      </form>
      <Notification :show.sync="notification.show" :message="notification.message" :success="notification.success"/>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Notification from '../components/Notification.vue';

export default {
  components: {
    Notification
  },
  data() {
    return {
      name: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      notification: {
        show: false,
        message: '',
        success: false
      },
      emailExists: false // Para indicar si el correo electrónico ya está en uso
    };
  },
  computed: {
    formValid() {
      return this.name && this.email && this.password && this.passwordConfirmation;
    }
  },
  methods: {
    async checkEmail() {
      if (this.email) {
        try {
          const response = await axios.post('/api/check-email', { email: this.email });
          this.emailExists = response.data.exists;
        } catch (error) {
          console.error('Error al comprobar el correo electrónico:', error);
        }
      }
    },
    async register() {
      if (this.password !== this.passwordConfirmation) {
        this.notification = {
          show: true,
          message: 'Las contraseñas no coinciden.',
          success: false
        };
        return;
      }
      if (this.emailExists) {
        this.notification = {
          show: true,
          message: 'El correo electrónico ya está en uso.',
          success: false
        };
        return;
      }
      try {
        await axios.post('/api/register', {
          name: this.name,
          email: this.email,
          password: this.password,
          password_confirmation: this.passwordConfirmation
        });
        this.notification = {
          show: true,
          message: 'Usuario registrado exitosamente.',
          success: true
        };
        // Redirigir a la página de inicio de sesión después de un pequeño retraso
        setTimeout(() => {
          this.$router.push('/login');
        }, 2000); // 2 segundos de retraso
      } catch (error) {
        this.notification = {
          show: true,
          message: 'Hubo un error al crear el usuario.',
          success: false
        };
      }
    }
  }
};
</script>

<style scoped>
/* Estilos para el formulario de registro */
</style>
