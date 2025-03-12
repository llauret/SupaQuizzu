<template>
  <div v-for="question in questions" :key="question" class="bg-blue-500 w-full" @click="modeStore.setQuestionAmount(question)">
    <input id="question" :value="question" name="question" type="radio">
    <label for="question">{{ question }}</label>
  </div>
</template>
<script setup>
import {ref} from "vue";
import {useModeStore} from "@/stores/mode.store.js";

const modeStore = useModeStore();
const questions = ref([10, 25, 50, 100]);

</script>