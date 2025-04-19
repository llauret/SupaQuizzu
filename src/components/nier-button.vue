<template>
  <div class="nier-button">
    <div class="nier-button-frame">
      <div class="nier-corner tl"></div>
      <div class="nier-corner tr"></div>
      <div class="nier-corner bl"></div>
      <div class="nier-corner br"></div>
      <span class="nier-button-text" @mousedown="onClick">{{ title }}</span>
    </div>
  </div>
</template>
<script setup>
defineProps({
  title: String,
  onClick: Function
});
</script>
<style scoped src="@/assets/nier.css">
</style>