<template>
  <div
      :class="[scoreChange ? 'animate-pulse bg-green-500': '', 'nier-barre']">
    {{ statStore.pointCounter }}
  </div>
</template>
<script setup>
import {useStatStore} from "@/stores/stat.store.js";

defineProps({scoreChange: String});

const statStore = useStatStore();
</script>
<style scoped>

.nier-barre {
  background-color: #4d4a41;
  @apply top-36 absolute left-0 font-bold w-24 text-end pr-2 text-white pl-8;
  position: relative;
}

.nier-barre::before {
  content: "";
  position: absolute;
  left: 0;
  top: 40%;
  width: 40%;
  height: 1px;
  background-color: #c0bba5;
  transform: translateY(-50%);
}

.nier-barre::after {
  content: "";
  position: absolute;
  left: 0;
  top: 80%;
  width: 90%;
  height: 1px;
  background-color: #c0bba5;
  transform: translateY(-50%);
}

</style>