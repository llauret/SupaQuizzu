<template>
  <transition
      appear
      name="slide-up"
  >
    <div v-if="displayStore.isGameOver" class="w-28 top-28 absolute font-bold text-4xl text-red-500">
      WOMP WOMP
    </div>
  </transition>
</template>
<script setup>
import {useDisplayStore} from "@/stores/display.store.js";

const displayStore = useDisplayStore();
</script>
<style scoped>
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.5s ease;
}

.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(600px);
  opacity: 0;
}
</style>