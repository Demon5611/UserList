<template>
    <div>
      <modal name="modalStyle" :open="isOpen" @close="onClose">
        <div class="modal-box" v-if="isOpen">
          <input
            v-model="inputs.name"
            class="form-control"
            placeholder="Name"
            @input="changeHandler"
            style="width: 100%; margin-bottom: 10px;"
          />
          <input
            v-model="inputs.email"
            class="form-control"
            placeholder="Email"
            @input="changeHandler"
            style="width: 100%; margin-bottom: 10px;"
          />
          <input
            v-model="inputs.phone"
            class="form-control"
            placeholder="Phone"
            @input="changeHandler"
            style="width: 100%; margin-bottom: 10px;"
          />
          <div style="display: flex; justify-content: flex-end;">
            <button @click="saveUser" class="btn btn-outline-success btn-lg">Save</button>
          </div>
        </div>
      </modal>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    props: {
      isOpen: Boolean,
      user: Object,
    },
    data() {
      return {
        inputs: {
          name: '',
          email: '',
          phone: '',
        },
      };
    },
    methods: {
      saveUser() {
        this.saveUserData();
        this.$emit('close');
      },
      async saveUserData() {
        try {
          const { name, email, phone } = this.inputs;
          if (this.user && this.user.id) {
            await this.updateUser(this.user.id, { name, email, phone });
          }
        } catch (error) {
          console.error('Ошибка при сохранении данных на сервере', error);
        }
      },
      async updateUser(id, formData) {
        try {
          await axios.patch(`/api/users/edit/${id}`, formData);
          console.log('Пользователь обновлен');
        } catch (error) {
          console.error('Ошибка при обновлении пользователя', error);
        }
      },
    },
    watch: {
      user: {
        handler(newVal) {
          if (newVal) {
            this.inputs.name = newVal.name || '';
            this.inputs.email = newVal.email || '';
            this.inputs.phone = newVal.phone || '';
          }
        },
        immediate: true,
      },
    },
  };
  </script>
  
  <style scoped>
 
.modal-box {
    width: 500px;
    height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
  padding: 90px;
  background-color: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  z-index: 1;
  margin-top: -800px; 
}
  
  .modalStyle {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
  }
  </style>
  