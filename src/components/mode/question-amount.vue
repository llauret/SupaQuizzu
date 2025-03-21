<template>
  <div class="nier-container">
    <div class="nier-title">
      <div class="nier-line"></div>
      <h3>#</h3>
      <div class="nier-line"></div>
    </div>
    <div class="nier-grid">
      <div
          v-for="(question, index) in questions" :key="index"
          :class="['nier-option', modeStore.questionAmount === question ? 'nier-selected' : '']"
          :style="{'--delay': index * 0.15 + 's'}"
          class="cursor-pointer"
          @click="modeStore.setQuestionAmount(question)"
      >
        <div class="nier-frame">
          <div class="nier-corner tl"></div>
          <div class="nier-corner tr"></div>
          <div class="nier-corner bl"></div>
          <div class="nier-corner br"></div>
          <span class="nier-text">{{ question }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import {ref} from "vue";
import {useModeStore} from "@/stores/mode.store.js";

const modeStore = useModeStore();
const questions = ref([10, 25, 50, 100]);

</script>

<style scoped src="@/assets/nier.css">
</style>