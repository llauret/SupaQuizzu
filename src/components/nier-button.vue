<template>
  <div class="nier-button select-none">
    <div class="nier-button-frame">
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