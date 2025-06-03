<template>
  <div
      :class="[
      'w-full h-[52rem] justify-center items-center place-content-center transition-all duration-300',
      flashClass
    ]"
  >
    <div class="text-center font-bold text-2xl pt-48 h-72">
      {{ currentQuestionObject.question }}
    </div>
    <div class="flex justify-center items-center w-full mx-auto p-4">
      <answer
          :answers="currentQuestionObject.reponses"
          :correctAnswer="correctAnswerValue"
          :currentQuestion="currentQuestionObject.question"
          :reveal-answers="revealAnswersState"
          :selected-answer-for-feedback="lastSelectedAnswer"
          @select-answer="handleAnswerSelection"
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
const flashClass = ref('');
const revealAnswersState = ref(false);
const lastSelectedAnswer = ref(null);

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
  return {question: "Chargement...", reponses: []};
});

const correctAnswerValue = computed(() => {
  if (currentQuestionObject.value && currentQuestionObject.value.reponses && currentQuestionObject.value.reponses.length > 0) {
    const correctAnswer = currentQuestionObject.value.reponses.find(r => r.est_correcte);
    return correctAnswer ? correctAnswer.reponse : null;
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

const handleAnswerSelection = (selectedAnswer) => {
  lastSelectedAnswer.value = selectedAnswer;
  revealAnswersState.value = true;

  const isCorrect = selectedAnswer === correctAnswerValue.value;

  if (isCorrect) {
    statStore.incrementPointCounter();
    flashClass.value = 'flash-green';
  } else {
    statStore.decrementPointCounter();
    flashClass.value = 'flash-red';
  }

  setTimeout(() => {
    flashClass.value = '';
    revealAnswersState.value = false;
    lastSelectedAnswer.value = null;

    pushToNextQuestion();

    if (correctAnswerValue.value === null || questionStore.questionNumber >= (currentQuestion.value?.length || 0)) {
      displayStore.isGameOver = true;
    }

  }, 1000);
}
</script>

<style scoped src="@/assets/nier.css">
.flash-green {
  border: 2px solid #4CAF50;
}

.flash-red {
  border: 2px solid #F44336;
}
</style>