<template>
  <div v-if="clock !== '00:00'" class="bg-red-500 w-28 top-28 absolute right-0">
    {{ clock }}
  </div>
</template>
<script setup>
import {onMounted, ref} from "vue";
import {useModeStore} from "@/stores/mode.store.js";
import {useDisplayStore} from "@/stores/display.store.js";
import {useStatStore} from "@/stores/stat.store.js";

const displayStore = useDisplayStore();
const modeStore = useModeStore();
const statStore = useStatStore();

const clock = ref('00:00');
let timer = modeStore.timerSelected * 60;

onMounted(() => {
  setInterval(countDown, 1000);
});

const countDown = () => {
  if (timer <= 0) return;
  let minutes = parseInt(timer / 60);
  let secondes = parseInt(timer % 60);

  minutes = minutes < 10 ? `0${minutes}` : minutes;
  secondes = secondes < 10 ? `0${secondes}` : secondes;

  clock.value = `${minutes}:${secondes}`;
  timer = timer <= 0 ? 0 : timer - 1;
  if (timer === 0) displayStore.isGameOver = true;
  if (displayStore.isGameOver) {
    statStore.finalTimer = clock.value;
  }
}
</script>
<style scoped>

</style>