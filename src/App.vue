<template>
  <div id='app'>
    <router-view></router-view>
    <top-bar></top-bar>
  </div>
</template>
<script setup>
import TopBar from "@/components/top-bar.vue";
</script>