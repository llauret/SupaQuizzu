<template>
  <div class="grid grid-cols-2 w-full gap-4 h-96 pt-32">
    <div v-for="(answer, index) in answers" :key="index" @click="emitAnswer(answer.reponse)">
      <div class="nier-answer" @mouseenter="playHoverSound">
        <div class="square"></div>
        <div> {{ answer.reponse }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {onMounted, ref, onBeforeUnmount} from "vue";

defineProps({
  answers: Array,
  correctAnswer: Number
});

const emit = defineEmits(['select-answer']);
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
<style scoped>
.square {
  min-width: 20px;
  max-width: 20px;
  min-height: 20px;
  max-height: 20px;
  flex-shrink: 0;
  background-color: #4d4a41;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  transition: background-color 0.3s ease;
}

.nier-answer {
  display: flex;
  flex-direction: row;
  height: 200px;
  align-items: center;
  gap: 2rem;
  background-color: #c0bba5;
  background-size: 0.3rem 0.3rem;
  background-image: linear-gradient(to right, #bab59f 1px, rgba(204, 200, 177, 0) 1px), linear-gradient(to bottom, #bab59f 1px, rgba(204, 200, 177, 0) 1px);;
  padding: 1rem 2rem;
  cursor: pointer;
  font-weight: bold;
  font-size: 1.5rem;
  color: #4d4a41;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.nier-answer:hover {
  background-color: #4d4a41;
  background-size: 0.3rem 0.3rem;
  background-image: linear-gradient(to right, #47443b 1px, rgba(204, 200, 177, 0) 1px), linear-gradient(to bottom, #47443b 1px, rgba(204, 200, 177, 0) 1px);;
  color: #c0bba5;
}

.nier-answer:hover > .square {
  background-color: #d4ceb6;
}

.nier-answer.active {
  background-color: #4d4a41;
  background-size: 0.3rem 0.3rem;
  background-image: linear-gradient(to right, #47443b 1px, rgba(204, 200, 177, 0) 1px), linear-gradient(to bottom, #47443b 1px, rgba(204, 200, 177, 0) 1px);;
  color: #c0bba5;
  transform: translateY(-3px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}
</style>