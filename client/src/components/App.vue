<template>
  <div class="user-list-container">
    <h1 class="mb-4">User List</h1>
    <h5 class="mb-4">Фильтр по полю:</h5>

    <div class="form-inline mb-3">
      <div class="form-group mr-3">
        <label for="nameFilter" class="mr-1">Name:</label>
        <input type="text" id="nameFilter" v-model="nameFilter" @input="applyFilters" class="form-control">
      </div>

      <div class="form-group mr-3">
        <label for="emailFilter" class="mr-1">Email:</label>
        <input type="text" id="emailFilter" v-model="emailFilter" @input="applyFilters" class="form-control">
      </div>

      <div class="form-group">
        <label for="phoneFilter" class="mr-1">Phone:</label>
        <input type="text" id="phoneFilter" v-model="phoneFilter" @input="applyFilters" class="form-control">
      </div>
    </div>

    <table class="table">
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Email</th>
          <th scope="col">Phone</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user of filteredUsers" :key="user.id">
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.phone }}</td>
          <td>
            <button @click="removeUser(user.id)" class="btn btn-danger">Удалить</button>
            <span class="edit-delete-spacing"></span>
            <EditButton @open-modal="openModalForUser(user)" />
          </td>
        </tr>
      </tbody>
    </table>

    <ButtonForm @data-updated="fetchUsers" />

    <ModalEdit :isOpen="isModalOpen" :user="selectedUser" @close="closeModal"></ModalEdit>
  </div>
</template>

<script>
import ButtonForm from './ButtonForm.vue';
import ModalEdit from './ModalEdit.vue';
import EditButton from './EditButton.vue';

import axios from 'axios';

export default {
  components: {
    ButtonForm,
    ModalEdit,
    EditButton,
  },
  data() {
    return {
      users: [],
      nameFilter: '',
      emailFilter: '',
      phoneFilter: '',
      isModalOpen: false,
    };
  },
  computed: {
    filteredUsers() {
      let filtered = this.users;

      if (this.nameFilter) {
        filtered = filtered.filter(user => user.name.includes(this.nameFilter));
      }

      if (this.emailFilter) {
        filtered = filtered.filter(user => user.email.includes(this.emailFilter));
      }

      if (this.phoneFilter) {
        filtered = filtered.filter(user => user.phone.includes(this.phoneFilter));
      }

      return filtered;
    },
  },
  created() {
    this.fetchUsers();
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await axios.get('/api/users/all');
        this.users = response.data;
      } catch (error) {
        console.error('Фронт: Ошибка при получении данных с сервера', error);
      }
    },
    applyFilters() {

    },
    async removeUser(userId) {
      try {
        await axios.delete(`/api/users/${userId}`);
        this.fetchUsers();
      } catch (error) {
        console.error('Фронт: Ошибка при удалении пользователя', error);
      }
    },
    openModal() {
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
    },
    openModalForUser(user) {
      this.selectedUser = user;
      this.openModal();
    },
  },
};
</script>

<style scoped>
.user-list-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 5% 20%;
}



.edit-delete-spacing {
  margin-right: 10px;
}

table {
  width: 100%;
  max-width: 80%;
  margin-bottom: 1rem;
  border-collapse: collapse;
}

th,
td {
  padding: 0.75rem;
  text-align: left;
  border-bottom: 1px solid #dee2e6;
}

th {
  background-color: #f8f9fa;
}
</style>
