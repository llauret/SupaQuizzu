<template>
  <div class="grid grid-cols-2 w-96 gap-4">
    <Button v-for="(answer, index) in answers" :key="index" @click="emitAnswer(answer.reponse)">
      {{ answer.reponse }}
    </button>
  </div>
</template>
<script setup>
import {Button} from "@/components/ui/button";

defineProps({
  answers: Array,
  correctAnswer: Number
});

const emit = defineEmits(['select-answer']);

const emitAnswer = (answer) => {
  emit('select-answer', answer);
  console.log(answer);
}
</script>