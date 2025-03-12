<template>
  <div class="flex gap-5">
    <score :score-change="scoreChange"/>
    <question-count/>
  </div>
  <ai-query></ai-query>
  <div class="w-full h-[52rem] justify-center items-center place-content-center">
    <div class="text-center font-bold text-4xl mb-4">
      {{ currentQuestionObject.question }}
    </div>
    <div class="flex justify-center items-center w-full mx-auto p-4">
      <answer
          :answers="currentQuestionObject.reponses"
          :correctAnswer="correctAnswerValue"
          @select-answer="checkAnswer"
      ></answer>
    </div>
  </div>
</template>

<script setup>
import Answer from "@/components/answer.vue";
import {computed, onMounted, ref} from "vue";
import {supabase} from "@/lib/supabaseClient.js";
import {useStatStore} from "@/stores/stat.store.js";
import Score from "@/components/score.vue";
import AiQuery from "@/components/ai-query.vue";
import router from "@/router.js";
import {useQuestionStore} from "@/stores/question.store.js";
import QuestionCount from "@/components/question-count.vue";
import {useModeStore} from "@/stores/mode.store.js";

const questionStore = useQuestionStore();
const modeStore = useModeStore();
const statStore = useStatStore();

const currentQuestion = ref(null);
const scoreChange = ref(false);

onMounted(async () => {
  await getQuestion();
});

async function getQuestion() {
  const {data} = await supabase.rpc('get_custom_question', {
    nombre: modeStore.questionAmount,
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
    console.log('Correct');
    statStore.incrementPointCounter();
    pushToNextQuestion();
  } else {
    console.log('Incorrect');
    statStore.decrementPointCounter();
    pushToNextQuestion();
  }
  if (correctAnswerValue.value === null) router.push('/');
}
</script>

<style scoped>
</style>
