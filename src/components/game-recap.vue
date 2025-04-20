<template>
  <transition appear name="slide-up">
    <div
        v-if="displayStore.isGameOver"
        class="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
    >
      <div class="w-3/4">
        <div class="bg-nierBrown text-nierLightBrown px-6 py-3 flex items-center text-2xl font-bold">
          <span class="w-4 h-4 mr-3 bg-[#d4ceb6]"></span>
          R E S U L T A T
        </div>
        <div class="max-h-48 overflow-y-auto">
          <div v-for="(quiz, index) in ranking" :key="index">
            <div
                class="flex justify-between px-8 py-2 border-b border-nierLightBrown text-nierLightBrown overflow-y-auto">
              <div class="text-lg font-bold">[{{ index + 1 }}] {{ quiz.username }}</div>
              <div class="text-lg font-bold">{{ quiz.score }} points</div>
            </div>
          </div>
        </div>
        <div class="px-8 py-6 checked">
          <div class="text-center text-2xl mb-4">‑ Questions correcte <span
              class="text-red-600 font-bold"> {{ countCorrectAnswer }} </span> ‑
          </div>
          <div class="text-center text-lg mb-6">
            <span class="text-red-600 font-bold">S C O R E</span>
            <span class="font-bold"> - {{ statStore.pointCounter }} points </span>
            <br>
            <span class="font-bold text-nierBlue">- Temps restant {{ statStore.finalTimer }} -</span>
          </div>
          <hr class="border-nierBrown mb-2"/>

          <div class="overflow-y-auto h-80 mb-2">
            <div
                v-for="answer in displayStore.selectedAnswers"
                :key="answer.id"
                class="mb-4"
            >
              <div class="text-center text-lg font-bold">
                {{ answer.question }}
                <br>
                <span
                    :class="answer.selectedAnswer === answer.correctAnswer
                    ? 'text-green-600'
                    : 'text-red-600'"
                    class="font-bold"
                >
                  {{ answer.selectedAnswer }}
                </span>
                <br>
                <div v-if="answer.selectedAnswer !== answer.correctAnswer">
                  - La bonne réponse -
                  <br>
                  <span class="font-bold">{{ answer.correctAnswer }}</span>
                </div>
                <hr class="border-nierBrown mb-2"/>
              </div>
            </div>
          </div>

          <div class="mb-6 relative w-full">

            <input
                v-model="username"
                class="w-full text-center pl-4 pb-1 bg-transparent text-[#3B3A34] placeholder-[#3B3A34]/50 border-b border-[#3B3A34]/30 outline-none focus:border-[#3B3A34]"
                maxlength="60"
                placeholder="[Entre ton pseudo]."
                type="text"
            />
          </div>

          <router-link to="/">
            <button
                :disabled="!username"
                class="bg-nierBrown w-full text-nierLightBrown font-bold py-2 px-6 over:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                @mousedown="addRecord"
            >
              Enregistrer le record
            </button>
          </router-link>

          <div class="mt-6 text-center">
            <router-link class="underline hover:text-red-600" to="/" @mousedown="playSound('/sounds/nier-confirm.mp3')">
              Retourner au menu
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import {computed, onMounted, ref} from 'vue';
import {useDisplayStore} from '@/stores/display.store.js';
import {useStatStore} from '@/stores/stat.store.js';
import {supabase} from '@/lib/supabaseClient.js';
import {useModeStore} from "@/stores/mode.store.js";
import {playSound} from "@/composables/playSound.js";

const displayStore = useDisplayStore();
const statStore = useStatStore();
const modeStore = useModeStore();
const username = ref('');
const ranking = ref([]);

const countCorrectAnswer = computed(() => {
  return displayStore.selectedAnswers.filter(answer => answer.selectedAnswer === answer.correctAnswer).length;
});

onMounted(async () => {
  const {data} = await supabase.rpc('get_ranking', {
    quiz_param: modeStore.quizSelected
  });
  console.log("data", data);
  ranking.value = data;
})

const addRecord = async () => {
  await supabase.rpc('add_record', {
    username_param: username.value,
    score_param: statStore.pointCounter,
    record_date_param: new Date().toISOString(),
    quiz_param: modeStore.quizSelected
  })
  console.log('Record added');
  playSound('/sounds/nier-confirm.mp3');
}
</script>

<style scoped>
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.5s ease;
}

.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(600px);
  opacity: 0;
}
</style>
