<template>
  <div>
    <button v-for="(answer, index) in answers" :key="index" @click="emitAnswer(answer.reponse)">
      {{ answer.reponse }}
    </button>
  </div>
</template>
<script setup>
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
<style scoped>

</style>