<template>
  <div class="w-full h-[52rem] justify-center items-center place-content-center">
    <div class="text-center font-bold text-4xl">
      {{ currentQuestionObject.question }}
    </div>
    <div class="flex justify-center items-center w-full mx-auto p-4">
      <answer
          :answers="currentQuestionObject.reponses" :correctAnswer="correctAnswerValue"
          :currentQuestion="currentQuestionObject.question"
          @select-answer="checkAnswer"
      ></answer>
    </div>
  </div>
  <div class="flex h-full justify-center items-center place-content-center">
    <game-recap/>
  </div>
  <timer-countdown/>
</template>

<script setup>
import Answer from "@/components/answer.vue";
import {computed, onMounted, ref} from "vue";
import {supabase} from "@/lib/supabaseClient.js";
import {useStatStore} from "@/stores/stat.store.js";
import {useQuestionStore} from "@/stores/question.store.js";
import {useModeStore} from "@/stores/mode.store.js";
import GameRecap from "@/components/game-recap.vue";
import {useDisplayStore} from "@/stores/display.store.js";
import TimerCountdown from "@/components/timer-countdown.vue";

const displayStore = useDisplayStore();
const questionStore = useQuestionStore();
const modeStore = useModeStore();
const statStore = useStatStore();

const currentQuestion = ref(null);

onMounted(async () => {
  await getQuestion();
});

async function getQuestion() {
  const {data} = await supabase.rpc('get_custom_question', {
    nombre: modeStore.questionAmount ? modeStore.questionAmount : 100,
    quiz_type: modeStore.quizSelected
  });
  currentQuestion.value = groupQuestionsByID(data);
  questionStore.setQuestions(currentQuestion.value);
}

const currentQuestionObject = computed(() => {
  if (currentQuestion.value && currentQuestion.value[questionStore.questionNumber]) {
    return currentQuestion.value[questionStore.questionNumber];
  }
  return "Chargement…";
});

const correctAnswerValue = computed(() => {
  if (currentQuestionObject.value && currentQuestionObject.value.reponses) {
    return currentQuestionObject.value.reponses.find(r => r.est_correcte).reponse;
  }
  return null;
});

const groupQuestionsByID = (data) => {
  const grouped = data.reduce((acc, curr) => {
    if (!acc[curr.id]) {
      acc[curr.id] = {
        id: curr.id,
        question: curr.question,
        reponses: []
      };
    }
    acc[curr.id].reponses.push({
      reponse: curr.reponse,
      est_correcte: curr.est_correcte
    });
    return acc;
  }, {});

  return Object.values(grouped);
}

const pushToNextQuestion = () => {
  questionStore.setQuestionNumber(questionStore.questionNumber + 1);
}

const checkAnswer = (selectedAnswer) => {
  if (selectedAnswer === correctAnswerValue.value) {
    statStore.incrementPointCounter();
    pushToNextQuestion();
  } else {
    statStore.decrementPointCounter();
    pushToNextQuestion();
  }
  if (correctAnswerValue.value === null) displayStore.isGameOver = true;
}
</script>

<style scoped>
</style>
