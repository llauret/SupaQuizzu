<template>
  <div
      class="top-36 absolute left-0 bg-white p-4 shadow-md text-background font-bold text-2xl rounded w-24 text-center m-2">
    {{ statStore.pointCounter }}
  </div>
</template>
<script setup>
import {useStatStore} from "@/stores/stat.store.js";

const statStore = useStatStore();
</script>
<style scoped>

</style>