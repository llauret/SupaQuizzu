<template>
  <div class="bg-red-500 w-full">
    <div v-for="(quiz, index) in quizTitle" :key="index" class="cursor-pointer"
         @click="modeStore.setQuizSelected(quiz.titre)">
      <h1>{{ quiz.titre }}</h1>
    </div>
    {{ modeStore.quizSelected }}
  </div>
</template>
<script setup>
import {onMounted, ref} from "vue";
import {supabase} from "@/lib/supabaseClient.js";
import {useModeStore} from "@/stores/mode.store.js";

const modeStore = useModeStore();
const quizTitle = ref([]);

onMounted(async () => {
  const {data} = await supabase.rpc('get_quiz_title');
  quizTitle.value = data;
})

</script>