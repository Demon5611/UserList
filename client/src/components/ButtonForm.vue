<template>
  <div сlass="d-flex justify-content-center" >
    <h1>User Form</h1>
    <form @submit.prevent="submitForm" class="form-inline">
      <div class="form-group mb-3">
        <label for="name" class="mr-2">Name:</label>
        <input type="text" id="name" v-model="formData.name" class="form-control mr-2" placeholder="Enter name" required>
      </div>

      <div class="form-group mb-3">
        <label for="email" class="mr-2">Email:</label>
        <input type="email" id="email" v-model="formData.email" class="form-control mr-2" placeholder="Enter email" required>
      </div>

      <div class="form-group mb-3">
        <label for="phone" class="mr-2">Phone:</label>
        <input type="text" id="phone" v-model="formData.phone" class="form-control mr-2" placeholder="Enter phone" required>
      </div>

      <button type="submit" class="btn btn-success" style="margin-top: -2ch">Добавить</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      formData: {
        name: '',
        email: '',
        phone: '',
      },
    };
  },
  methods: {
    async submitForm() {
      try {
        const response = await axios.post('/api/users/create', this.formData);
        this.formData = {
          name: '',
          email: '',
          phone: '',
        };
        this.$emit('data-updated');
      } catch (error) {
        console.error('Фронт: Ошибка при отправке данных:', error);
      }
    },
  },
};
</script>

<style scoped>
h1{
  text-align: center;
}
</style>
