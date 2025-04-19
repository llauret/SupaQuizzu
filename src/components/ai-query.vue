<template>
  <div class="bg-red-500 p-2 cursor-pointer" @click="askAI">
    Demander à l'IA de créer un quiz
  </div>
  <input accept=".pdf" class="mt-2" type="file" @change="handleFile"/>
  <div v-if="loading" class="mt-2">Chargement en cours...</div>
  <div v-if="error" class="mt-2 text-red-600">{{ error }}</div>
</template>

<script setup>
import {jinaAI} from "../service/chatgptapi.service.js";
import {ref} from "vue";

const file = ref(null);
const loading = ref(false);
const error = ref(null);

const askAI = async () => {
  if (!file.value) {
    error.value = "Veuillez d'abord sélectionner un fichier PDF";
    return;
  }

  loading.value = true;
  error.value = null;

  try {
    const result = await jinaAI(file.value);
    console.log("AI response:", result);
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
}

const handleFile = (e) => {
  if (e.target.files.length > 0) {
    const selectedFile = e.target.files[0];

    if (!selectedFile.type.includes('pdf')) {
      error.value = "Le fichier doit être au format PDF";
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        file.value = event.target.result;
      } catch (error) {
        console.error("Error processing file:", error);
      }
    };
    reader.readAsDataURL(selectedFile);
  }
}
</script>