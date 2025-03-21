<template>
  <div v-if="displayCondition">
    <div class="flex">
      <quiz-selection></quiz-selection>
      <timer-selection></timer-selection>
      <question-amount></question-amount>
    </div>
    <router-link to="/question">
      <div class="nier-button">
        <nier-button title="PLAY"/>
      </div>
    </router-link>
  </div>
</template>
<script setup>
import TimerSelection from "@/components/mode/timer-selection.vue";
import QuestionAmount from "@/components/mode/question-amount.vue";
import QuizSelection from "@/components/mode/quiz-selection.vue";
import NierButton from "@/components/nier-button.vue";

defineProps({displayCondition: Boolean});
</script>

<style scoped src="@/assets/nier.css">
</style>