<template>
    <button @click="openModal" class="btn btn-primary">Редактировать</button>
  </template>
  
  <script>
  export default {
    methods: {
      openModal() {
        console.log('openModal method called');
        this.$emit('open-modal');
      }
    }
  };
  </script>
  
  <style>

  </style>
  