<template>
  <div
      class='top-36 absolute left-32 bg-white p-4 shadow-md text-black font-bold text-2xl rounded w-24 text-center m-2'>
    {{ modeStore.questionAmount ? modeStore.questionAmount : 100 }}
  </div>
</template>
<script setup>
import {useModeStore} from "@/stores/mode.store.js";

const modeStore = useModeStore();
</script>