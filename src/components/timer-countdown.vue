<template>
  <div v-if="clock !== '00:00'" class="nier-container absolute top-20 text-center px-4 py-2 w-full">
    <div class="nier-frame">
      <div class="nier-corner tl"></div>
      <div class="nier-corner tr"></div>
      <div class="nier-corner bl"></div>
      <div class="nier-corner br"></div>
      <span class="nier-text text-2xl">{{ clock }}</span>
    </div>
  </div>
</template>

<script setup>
import {onMounted, onUnmounted, ref, watch} from 'vue';
import {useModeStore} from '@/stores/mode.store.js';
import {useDisplayStore} from '@/stores/display.store.js';
import {useStatStore} from '@/stores/stat.store.js';

const displayStore = useDisplayStore();
const modeStore = useModeStore();
const statStore = useStatStore();

const clock = ref('00:00');
let timer = modeStore.timerSelected * 60;
let intervalId = null;

function updateClock() {
  if (timer <= 0) {displayStore.isGameOver = true;} else {
    const minutes = String(Math.floor(timer / 60)).padStart(2, '0');
    const seconds = String(timer % 60).padStart(2, '0');
    clock.value = `${minutes}:${seconds}`;
    timer--;
  }
}

function stopTimer() {
  if (intervalId !== null) {
    clearInterval(intervalId);
    intervalId = null;
  }
  statStore.finalTimer = clock.value;
}

// onMounted(() => {intervalId = setInterval(updateClock, 1000);})

watch(() => displayStore.isGameOver,
    (isOver) => {
      if (isOver) stopTimer();
    }
)

onUnmounted(() => {stopTimer();})
</script>
