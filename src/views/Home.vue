<template>
  <div class="top-0 absolute nier-button z-50" @click="toggleIsFormCreateVisible">
    <nier-button title="AJOUTER QUIZZ"/>
  </div>
  <div class="background-container flex justify-center items-center w-full h-full mx-auto p-4 select-none mt-72">
    <div class="flex-wrap text-center">
      <div v-if="!isSelectingMode" class="nier-title-container">
        <div class="nier-title-line left"></div>
        <h1 class="nier-title">SUPA QUIZZU</h1>
        <div class="nier-title-line right"></div>
        <div class="nier-subtitle">SYSTEM V.1.4</div>
      </div>
      <div @click="toggleIsSelecting">
        <nier-button title="START"/>
      </div>
      <mode-selection :display-condition="isSelectingMode"/>
    </div>
  </div>
  <form-create :displayCondtion="displayStore.isFormCreateVisible"></form-create>
</template>

<script setup>
import FormCreate from "@/components/form-create.vue";
import {onMounted, ref} from "vue";
import {useQuestionStore} from "@/stores/question.store.js";
import {useStatStore} from "@/stores/stat.store.js";
import {useDisplayStore} from "@/stores/display.store.js";
import ModeSelection from "@/components/mode/mode-selection.vue";
import NierButton from "@/components/nier-button.vue";

const displayStore = useDisplayStore();
const questionStore = useQuestionStore();
const statStore = useStatStore();

const isSelectingMode = ref(false);

onMounted(() => {
  questionStore.setQuestionNumber(0);
  statStore.resetPointCounter();
  displayStore.isGameOver = false;
  displayStore.selectedAnswers = [];
});

const toggleIsFormCreateVisible = () => {
  displayStore.isFormCreateVisible = !displayStore.isFormCreateVisible;
};

const toggleIsSelecting = () => {
  isSelectingMode.value = !isSelectingMode.value;
};

</script>

<style scoped src="@/assets/nier.css">
.background-container {
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
</style>