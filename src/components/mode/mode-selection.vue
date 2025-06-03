<template>
  <div v-if="displayCondition">
    <div class="block md:flex" @mousedown="playSound('/sounds/nier-confirm.mp3')">
      <quiz-selection class="mb-4 md:mb-0"></quiz-selection>
<!--      <timer-selection class="mb-4 md:mb-0"></timer-selection>-->
      <question-amount class="mb-4 md:mb-0"></question-amount>
    </div>
    <router-link to="/question">
      <div class="nier-button mt-6">
        <nier-button :on-click="() => playSound('/sounds/nier-confirm.mp3')" title="PLAY"/>
      </div>
    </router-link>
  </div>
</template>
<script setup>
import TimerSelection from "@/components/mode/timer-selection.vue";
import QuestionAmount from "@/components/mode/question-amount.vue";
import QuizSelection from "@/components/mode/quiz-selection.vue";
import NierButton from "@/components/nier-button.vue";
import {playSound} from "@/composables/playSound.js";

defineProps({displayCondition: Boolean});
</script>

<style scoped src="@/assets/nier.css">
</style>