<template>
  <div class="flex top-0 justify-between absolute z-50 w-full bg-white shadow-md p-4">
    <router-link class="text-blue-500 hover:underline" to="/">Home</router-link>
    <dark-mode></dark-mode>
  </div>
</template>
<script setup>
import DarkMode from "@/components/dark-mode.vue";
</script>