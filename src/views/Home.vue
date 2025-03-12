<template>
  <div class="background-container flex justify-center items-center w-full h-[66.6rem] mx-auto p-4">
    <div class="flex-wrap text-center">
      <h1 class="text-4xl font-bold mb-4">SUPA QUIZZU</h1>
      <Button class="mb-4 font-bold" @click="toggleIsSelecting">Start</Button>
      <mode-selection :display-condition="isSelectingMode"/>
    </div>
    <form-create :displayCondtion="displayStore.isFormCreateVisible"></form-create>
    <div class="absolute bottom-0 right-0 p-4">
      <Button class="mb-4 font-bold" @click="toggleIsFormCreateVisible">Ajouter quizz</Button>
    </div>

    <router-link class="absolute bottom-0 left-0 p-4" to="/question">
      <Button class="mb-4 font-bold">Jouer</Button>
    </router-link>

  </div>
</template>

<script setup>
import {Button} from "@/components/ui/button";
import FormCreate from "@/components/form-create.vue";
import {onMounted, ref} from "vue";
import {useQuestionStore} from "@/stores/question.store.js";
import {useStatStore} from "@/stores/stat.store.js";
import {useDisplayStore} from "@/stores/display.store.js";
import ModeSelection from "@/components/mode/mode-selection.vue";

const displayStore = useDisplayStore();
const questionStore = useQuestionStore();
const statStore = useStatStore();

const isSelectingMode = ref(false);

onMounted(() => {
  questionStore.setQuestionNumber(0);
  statStore.resetPointCounter();
});

const toggleIsFormCreateVisible = () => {
  displayStore.isFormCreateVisible = !displayStore.isFormCreateVisible;
};

const toggleIsSelecting = () => {
  isSelectingMode.value = !isSelectingMode.value;
};

</script>

<style scoped>
.background-container {
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
</style>