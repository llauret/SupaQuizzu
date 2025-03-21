<template>
  <div class="nier-container">
    <div class="nier-title">
      <div class="nier-line"></div>
      <h3>Nombre de question</h3>
      <div class="nier-line"></div>
    </div>
    <div class="nier-grid">
      <div
          v-for="(question, index) in tableau" :key="index"
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
<style scoped src="@/assets/nier.css">
</style>