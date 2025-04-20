<template>
  <div class="grid grid-cols-2 w-full gap-4 h-96 pt-32">
    <div v-for="(answer, index) in answers" :key="index" @click="emitAnswer(answer.reponse)">
      <div class="nier-answer select-none" @mouseenter="playHoverSound">
        <div class="square"></div>
        <div> {{ answer.reponse }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {onMounted, ref, onBeforeUnmount} from "vue";
import {useDisplayStore} from "@/stores/display.store.js";

const props = defineProps({
  answers: Array,
  correctAnswer: Number,
  currentQuestion: String
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

const playClickSound = () => {
  const clickSound = new Audio('/sounds/nier-click.mp3');
  clickSound.volume = 0.5;
  clickSound.play();
}

const emitAnswer = (answer) => {
  emit('select-answer', answer);
  playClickSound();
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