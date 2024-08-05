<template>
  <div class="container mx-auto px-4 py-6">
    <h1 class="text-4xl font-bold text-center mb-6">Mascotas</h1>

    <!-- Alerta de éxito o error -->
    <div v-if="alert.message" :class="`alert ${alert.type}`" class="mb-4 p-4 rounded shadow">
      <p>{{ alert.message }}</p>
    </div>

    <!-- Filtro por estado -->
    <div class="mb-4">
      <label for="filterState" class="block text-gray-700">Filtrar por Estado:</label>
      <select v-model="selectedState" id="filterState" class="w-full border border-gray-300 p-2 rounded" @change="fetchPets">
        <option value="">Todos</option>
        <option v-for="state in states" :key="state.id" :value="state.id">{{ state.name }}</option>
      </select>
    </div>

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
        <h2 class="text-2xl font-bold mb-2">{{ pet.name }}</h2>
        <p class="text-gray-600 mb-4">Categoría: {{ getCategoryName(pet.category_id) }}</p>
        <p class="text-gray-600 mb-4">Estado: {{ getStateName(pet.state_id) }}</p>
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
      <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h2 class="text-2xl font-semibold mb-4">{{ isEdit ? 'Editar Mascota' : 'Agregar Mascota' }}</h2>
        <form @submit.prevent="submitForm">
          <div class="mb-4">
            <label for="name" class="block text-gray-700">Nombre:</label>
            <input v-model="form.name" type="text" id="name" class="w-full border border-gray-300 p-2 rounded" required>
          </div>
          <div class="mb-4">
            <label for="state" class="block text-gray-700">Estado:</label>
            <select v-model="form.state_id" id="state" class="w-full border border-gray-300 p-2 rounded" required>
              <option value="">Seleccionar Estado</option>
              <option v-for="state in states" :key="state.id" :value="state.id">{{ state.name }}</option>
            </select>
          </div>
          <div class="mb-4">
            <label for="category" class="block text-gray-700">Categoría:</label>
            <select v-model="form.category_id" id="category" class="w-full border border-gray-300 p-2 rounded" required>
              <option value="">Seleccionar Categoría</option>
              <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
            </select>
          </div>
          <div class="mb-4">
            <label for="image_url" class="block text-gray-700">URL de Imagen:</label>
            <input v-model="form.image_url" type="text" id="image_url" class="w-full border border-gray-300 p-2 rounded">
          </div>
          <div class="flex justify-end space-x-2">
            <button type="button" @click="closeForm" class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">Cancelar</button>
            <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">{{ isEdit ? 'Actualizar' : 'Agregar' }}</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Modal de Confirmación de Eliminación -->
    <div v-if="showConfirmDelete" class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm text-center">
        <h3 class="text-lg font-semibold mb-4">Confirmación</h3>
        <p class="mb-4">¿Estás seguro de que deseas eliminar esta mascota?</p>
        <div class="flex justify-center space-x-4">
          <button @click="confirmDeletePet" class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Eliminar</button>
          <button @click="cancelDelete" class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">Cancelar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      pets: [],
      states: [],
      categories: [],
      selectedState: '',
      form: {
        name: '',
        category_id: '',
        state_id: '',
        image_url: ''
      },
      showForm: false,
      isEdit: false,
      currentPetId: null,
      defaultImage: 'https://th.bing.com/th/id/R.04421c785f6c34f50bfef33d377fd2ff?rik=Fixc%2fcgxjcjJzg&riu=http%3a%2f%2fliveanimalshipping.com%2farchivos%2f226Mascota.jpg&ehk=3VC7xaK0M54P2p4VYluHQMZeR2dVn2BYJC3AGhbP5gs%3d&risl=&pid=ImgRaw&r=0', // Imagen por defecto
      alert: {
        message: '',
        type: ''
      }, // { type: 'success' | 'error' }
      showConfirmDelete: false
    };
  },
  async created() {
    await this.fetchPets();
    await this.fetchStates();
    await this.fetchCategories();
  },
  watch: {
    selectedState(newValue) {
      this.fetchPets(); // Refrescar las mascotas cuando se cambia el filtro
    }
  },
  methods: {
    async fetchPets() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/pets', {
          params: { state_id: this.selectedState }
        });
        this.pets = response.data;
      } catch (error) {
        this.showAlert('Error al cargar las mascotas.', 'error');
      }
    },
    async fetchStates() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/states');
        this.states = response.data;
      } catch (error) {
        this.showAlert('Error al cargar los estados.', 'error');
      }
    },
    async fetchCategories() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/categories');
        this.categories = response.data;
      } catch (error) {
        this.showAlert('Error al cargar las categorías.', 'error');
      }
    },
    openCreateForm() {
      this.resetForm();
      this.isEdit = false;
      this.showForm = true;
    },
    openEditForm(pet) {
      this.form = { ...pet };
      this.isEdit = true;
      this.showForm = true;
    },
    closeForm() {
      this.showForm = false;
    },
    async submitForm() {
      try {
        if (this.isEdit) {
          await axios.put(`http://127.0.0.1:8000/api/pets/${this.form.id}`, this.form);
          this.showAlert('Mascota actualizada con éxito.', 'success');
        } else {
          // Eliminar id en caso de agregar una nueva mascota
          const { id, ...newFormData } = this.form;
          await axios.post('http://127.0.0.1:8000/api/pets', newFormData);
          this.showAlert('Mascota agregada con éxito.', 'success');
        }
        this.closeForm();
        this.fetchPets(); // Refrescar la lista de mascotas después de agregar/editar
      } catch (error) {
        this.showAlert('Error al enviar el formulario.', 'error');
      }
    },
    async confirmDelete(id) {
      this.currentPetId = id;
      this.showConfirmDelete = true;
    },
    async confirmDeletePet() {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/pets/${this.currentPetId}`);
        this.showAlert('Mascota eliminada con éxito.', 'success');
        this.fetchPets(); // Refrescar la lista de mascotas después de eliminar
      } catch (error) {
        this.showAlert('Error al eliminar la mascota.', 'error');
      }
      this.showConfirmDelete = false;
    },
    cancelDelete() {
      this.showConfirmDelete = false;
    },
    showAlert(message, type) {
      this.alert = {
        message,
        type
      };
      setTimeout(() => {
        this.alert = { message: '', type: '' }; // Ocultar alerta después de 5 segundos
      }, 5000);
    },
    resetForm() {
      this.form = {
        name: '',
        category_id: '',
        state_id: '',
        image_url: ''
      };
    },
    getCategoryName(categoryId) {
      const category = this.categories.find(cat => cat.id === categoryId);
      return category ? category.name : 'Desconocido';
    },
    getStateName(stateId) {
      const state = this.states.find(st => st.id === stateId);
      return state ? state.name : 'Desconocido';
    }
  }
};
</script>

<style scoped>
.alert {
  position: relative;
}

.alert.success {
  background-color: #d4edda;
  color: #155724;
}

.alert.error {
  background-color: #f8d7da;
  color: #721c24;
}
</style>
