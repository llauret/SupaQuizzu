<template>
  <div v-for="(minute, index) in minutes" :key="index" class="bg-yellow-500" @click="modeStore.setTimerSelected(minute)">
    <input id="minutes" :value="minute" name="minutes" type="radio">
    <label for="minutes">{{ minute }}</label>
  </div>
</template>
<script setup>

import {ref} from "vue";
import {useModeStore} from "@/stores/mode.store.js";

const modeStore = useModeStore();
const minutes = ref(['Infini ∞', 5, 10, 15, 20]);

</script>