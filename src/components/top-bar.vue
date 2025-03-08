<template>
  <div class="flex top-0 justify-between absolute z-50 w-full bg-white shadow-md p-1">
    <router-link class="text-blue-500 hover:underline flex items-center" to="/">
      <svg class="h-5 w-5 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 20V14H14V20H19V12H16L10 3L4 12H1V20H6V14H10Z"/>
      </svg>
    </router-link>
    <dark-mode></dark-mode>
  </div>
</template>

<script setup>
import DarkMode from "@/components/dark-mode.vue";
</script>