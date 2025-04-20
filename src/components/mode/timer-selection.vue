<template>
  <div class="nier-container">
    <div class="nier-title">
      <div class="nier-line"></div>
      <h3 class="text-nierLightBrown">Timer</h3>
      <div class="nier-line"></div>
    </div>

    <div class="nier-grid">
      <div
          v-for="(minute, index) in minutes"
          :key="index"
          :class="['nier-option', modeStore.timerSelected === minute ? 'nier-selected' : '']"
          :style="{'--delay': index * 0.15 + 's'}"
          @click="modeStore.setTimerSelected(minute)"
      >
        <div class="nier-frame">
          <div class="nier-corner tl"></div>
          <div class="nier-corner tr"></div>
          <div class="nier-corner bl"></div>
          <div class="nier-corner br"></div>
          <span class="nier-text">{{ minute }} min</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref} from "vue";
import {useModeStore} from "@/stores/mode.store.js";

const modeStore = useModeStore();
const minutes = ref([5, 10, 15, 20]);
</script>
<style scoped src="@/assets/nier.css">
</style>