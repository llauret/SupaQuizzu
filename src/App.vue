<template>
  <div id='app'>
    <router-view></router-view>
    <game-recap></game-recap>
  </div>
</template>
<script setup>
import GameRecap from "@/components/game-recap.vue";
</script>