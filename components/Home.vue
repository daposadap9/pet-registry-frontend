<template>
  <div class="container mx-auto px-4 py-6">
    <h1 class="text-4xl font-bold text-center mb-6">Mascotas</h1>

    <!-- Mensaje si no hay mascotas -->
    <div v-if="pets.length === 0" class="text-center">
      <p class="text-gray-600">No hay mascotas creadas, por favor crea una nueva.</p>
      <button @click="openCreateForm" class="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
        Agregar Mascota
      </button>
    </div>

    <!-- Grid de mascotas -->
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="pet in pets" :key="pet.id" class="bg-white p-4 rounded shadow">
        <img :src="pet.image_url || defaultImage" alt="Imagen de la mascota" class="w-full h-48 object-cover rounded mb-4">
        <h2 class="text-xl font-semibold mb-2">{{ pet.name }}</h2>
        <p class="text-gray-600 mb-4">Categoría: {{ getCategoryName(pet.category_id) }}</p>
        <p class="text-gray-600 mb-4">Estado: {{ pet.status }}</p>
        <button @click="openEditForm(pet)" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-2">
          Editar
        </button>
        <button @click="confirmDelete(pet.id)" class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
          Eliminar
        </button>
      </div>
    </div>

    <!-- Botón para agregar mascota -->
    <button @click="openCreateForm" class="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full hover:bg-green-600">
      +
    </button>

    <!-- Formulario para agregar/editar mascota -->
    <div v-if="showForm" class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div class="bg-white p-6 rounded shadow-lg w-full max-w-lg">
        <h2 class="text-2xl font-semibold mb-4">{{ isEdit ? 'Editar Mascota' : 'Agregar Mascota' }}</h2>
        <form @submit.prevent="submitForm">
          <div class="mb-4">
            <label for="name" class="block text-gray-700">Nombre:</label>
            <input v-model="form.name" type="text" id="name" class="w-full border border-gray-300 p-2 rounded" required>
          </div>
          <div class="mb-4">
            <label for="status" class="block text-gray-700">Estado:</label>
            <input v-model="form.status" type="text" id="status" class="w-full border border-gray-300 p-2 rounded" required>
          </div>
          <div class="mb-4">
            <label for="category" class="block text-gray-700">Categoría:</label>
            <select v-model="form.category_id" id="category" class="w-full border border-gray-300 p-2 rounded" required>
              <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
            </select>
          </div>
          <div class="mb-4">
            <label for="image_url" class="block text-gray-700">Imagen URL:</label>
            <input v-model="form.image_url" type="text" id="image_url" class="w-full border border-gray-300 p-2 rounded">
          </div>
          <div class="flex justify-end">
            <button @click="closeForm" type="button" class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 mr-2">
              Cancelar
            </button>
            <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              {{ isEdit ? 'Actualizar' : 'Agregar' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Home',
  data() {
    return {
      pets: [],
      categories: [],
      form: {
        name: '',
        status: '',
        category_id: '',
        image_url: ''
      },
      showForm: false,
      isEdit: false,
      currentPetId: null,
      defaultImage: 'https://th.bing.com/th/id/OIP.IfbVYnnx92640h13RTlh-wHaEK?rs=1&pid=ImgDetMain'
    };
  },
  methods: {
    async fetchPets() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/pets');
        this.pets = response.data;
      } catch (error) {
        console.error('Error fetching pets:', error);
      }
    },
    async fetchCategories() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/categories');
        this.categories = response.data;
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    },
    getCategoryName(id) {
      const category = this.categories.find(cat => cat.id === id);
      return category ? category.name : 'Desconocido';
    },
    openCreateForm() {
      this.resetForm();
      this.showForm = true;
      this.isEdit = false;
    },
    openEditForm(pet) {
      this.form = { ...pet };
      this.showForm = true;
      this.isEdit = true;
      this.currentPetId = pet.id;
    },
    async submitForm() {
      try {
        if (this.isEdit) {
          await axios.put(`http://127.0.0.1:8000/api/pets/${this.currentPetId}`, this.form);
        } else {
          await axios.post('http://127.0.0.1:8000/api/pets', this.form);
        }
        this.fetchPets();
        this.closeForm();
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    },
    async confirmDelete(id) {
      if (confirm('¿Deseas eliminar esta mascota?')) {
        try {
          await axios.delete(`http://127.0.0.1:8000/api/pets/${id}`);
          this.fetchPets();
        } catch (error) {
          console.error('Error deleting pet:', error);
        }
      }
    },
    closeForm() {
      this.showForm = false;
    },
    resetForm() {
      this.form = {
        name: '',
        status: '',
        category_id: '',
        image_url: ''
      };
      this.currentPetId = null;
    }
  },
  created() {
    this.fetchPets();
    this.fetchCategories();
  }
};
</script>

<style scoped>
/* Aquí puedes agregar estilos personalizados si es necesario */
</style>
