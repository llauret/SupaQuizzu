<template>
  <div class="grid grid-cols-2 md:grid-cols-2 w-full gap-2 md:gap-4 h-auto md:h-96 pt-8 md:pt-32">
    <div v-for="(answer, index) in answers" :key="index"
         :class="{ 'pointer-events-none': props.revealAnswers }"
         @click="!props.revealAnswers ? emitAnswer(answer.reponse) : null">
      <div :class="{
             'border-green-500 border-2': props.revealAnswers && answer.reponse === props.correctAnswer,
             'border-red-500 border-2': props.revealAnswers && answer.reponse !== props.correctAnswer && answer.reponse === props.selectedAnswerForFeedback,
           }"
           class="nier-answer border-2 border-nierLightBrown select-none mb-3 md:mb-0"
           @mouseenter="!props.revealAnswers ? playHoverSound : null">
        <div class="square"></div>
        <div class="text-sm md:text-base "> {{ answer.reponse }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {onMounted, ref, onBeforeUnmount} from "vue";
import {useDisplayStore} from "@/stores/display.store.js";
import {playSound} from "@/composables/playSound.js";

const props = defineProps({
  answers: Array,
  correctAnswer: String,
  currentQuestion: String,
  revealAnswers: Boolean,
  selectedAnswerForFeedback: String
});
const emit = defineEmits(['select-answer']);
const displayStore = useDisplayStore();
const audioContext = ref(null);
const audioBuffer = ref(null);
const isLoaded = ref(false);

onMounted(async () => {
  try {
    audioContext.value = new (window.AudioContext || window.webkitAudioContext)();

    const response = await fetch('/sounds/nier-select.mp3');
    const arrayBuffer = await response.arrayBuffer();
    audioBuffer.value = await audioContext.value.decodeAudioData(arrayBuffer);
    isLoaded.value = true;
  } catch (e) {
    console.error("Erreur de chargement audio:", e);
  }
});

onBeforeUnmount(() => {
  if (audioContext.value) {
    audioContext.value.close();
  }
});

const emitAnswer = (answer) => {
  emit('select-answer', answer);
  playSound('/sounds/nier-click.mp3');
  displayStore.setSelectedAnswers({
    question: props.currentQuestion,
    selectedAnswer: answer,
    correctAnswer: props.correctAnswer
  });
}

const playHoverSound = () => {
  if (!isLoaded.value || !audioContext.value) return;

  const source = audioContext.value.createBufferSource();
  source.buffer = audioBuffer.value;

  const gainNode = audioContext.value.createGain();
  gainNode.gain.value = 0.5;

  source.connect(gainNode);
  gainNode.connect(audioContext.value.destination);

  source.start(0);
}
</script>
<style scoped src="@/assets/nier.css">
</style>