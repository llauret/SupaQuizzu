<template>
  <div>
    {{ statStore.pointCounter }}
  </div>
</template>
<script setup>
import {useStatStore} from "@/stores/stat.store.js";

const statStore = useStatStore();
</script>
<style scoped>

</style>