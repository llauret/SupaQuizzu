<template>
  <div v-if="displayCondition">
    <div> Classique</div>
    <div> Custom ?</div>
    <quiz-selection></quiz-selection>
    <timer-selection></timer-selection>
    <question-amount></question-amount>
  </div>
</template>
<script setup>
import TimerSelection from "@/components/mode/timer-selection.vue";
import QuestionAmount from "@/components/mode/question-amount.vue";
import QuizSelection from "@/components/mode/quiz-selection.vue";

defineProps({displayCondition: Boolean});
</script>