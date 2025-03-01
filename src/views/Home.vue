<template>
  <div class="background-container flex justify-center items-center w-full h-[62.9rem] mx-auto p-4">
    <div class="flex-wrap text-center">
      <h1 class="text-4xl font-bold mb-4">SUPER QUIZZU</h1>
      <router-link class="text-blue-500 hover:underline mb-4 inline-block bg-white rounded p-2 font-bold"
                   to="/question">Start
      </router-link>
    </div>
    <form-create :displayCondtion="isFormCreateVisible"></form-create>
    <div class="absolute bottom-0 right-0 p-4">
      <Button class="mb-4 font-bold" @click="toggleIsFormCreateVisible">Ajouter quizz</Button>
    </div>
  </div>
</template>

<script setup>
import {Button} from "@/components/ui/button";
import FormCreate from "@/components/form-create.vue";
import {onMounted, ref} from "vue";
import {useQuestionStore} from "@/stores/question.store.js";
import {useStatStore} from "@/stores/stat.store.js";

const isFormCreateVisible = ref(false);
const questionStore = useQuestionStore();
const statStore = useStatStore();

onMounted(() => {
  questionStore.setQuestionNumber(0);
  statStore.resetPointCounter();
});

const toggleIsFormCreateVisible = () => {
  isFormCreateVisible.value = !isFormCreateVisible.value;
};
</script>

<style scoped>
.background-container {
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
</style>