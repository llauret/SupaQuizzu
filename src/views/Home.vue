<template>

  <div>
    <h1>SUPER QUIZZU</h1>
  </div>


  <router-link to="/question/1">Start</router-link>

  <button @click="toggleIsFormCreateVisible"> Ajouter quizz</button>


  <form-create :displayCondtion="isFormCreateVisible"></form-create>
</template>
<script setup>
import {Button} from "@/components/ui/button/index.js";
import FormCreate from "@/components/form-create.vue";
import {ref} from "vue";

const isFormCreateVisible = ref(false);

const toggleIsFormCreateVisible = () => {
  isFormCreateVisible.value = !isFormCreateVisible.value;
}

</script>

<style scoped>

</style>