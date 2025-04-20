<template>
  <div class="nier-container">
    <div class="nier-title">
      <div class="nier-line"></div>
      <h3 class="text-nierLightBrown">Quiz</h3>
      <div class="nier-line"></div>
    </div>
    <div class="nier-grid">
      <div
          v-for="(quiz, index) in quizTitle"
          :key="index" :class="['nier-option', modeStore.quizSelected === quiz.titre ? 'nier-selected' : '']"
          :style="{'--delay': index * 0.15 + 's'}"
          class="cursor-pointer"
          @click="modeStore.setQuizSelected(quiz.titre)"
      >
        <div class="nier-frame">
          <div class="nier-corner tl"></div>
          <div class="nier-corner tr"></div>
          <div class="nier-corner bl"></div>
          <div class="nier-corner br"></div>
          <span class="nier-text">{{ quiz.titre }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import {onMounted, ref} from "vue";
import {supabase} from "@/lib/supabaseClient.js";
import {useModeStore} from "@/stores/mode.store.js";

const modeStore = useModeStore();
const quizTitle = ref([]);

onMounted(async () => {
  const {data} = await supabase.rpc('get_quiz_title');
  quizTitle.value = data;
})

</script>

<style scoped src="@/assets/nier.css">
</style>