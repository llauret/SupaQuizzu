<template>
  <score/>
  <div>
    Question : {{ question }}
    <answer
        :answers="answers"
        :correctAnswer="correctAnswer"
        @select-answer="checkAnswer"
    ></answer>
  </div>
</template>

<script setup>
import Answer from "@/components/answer.vue";
import {onMounted, ref} from "vue";
import {supabase} from "@/lib/supabaseClient.js";
import {useStatStore} from "@/stores/stat.store.js";
import router from "@/router.js";
import Score from "@/components/score.vue";

const statStore = useStatStore();

const question = ref('');
const answers = ref([]);
const correctAnswer = ref(null);
const questionNumber = ref(1);

onMounted(() => {
  questionNumber.value = 1;
  getQuestion();
});

async function getQuestion() {
  const {data} = await supabase.rpc('get_question', {param: questionNumber.value});
  console.log(data);
  question.value = data[0].question;
  answers.value = data.map(d => ({
    reponse: d.reponse,
    est_correct: d.est_correct
  }));
  correctAnswer.value = data.find(d => d.est_correct === true);
  console.log(correctAnswer.value);
}

const pushToNextQuestion = () => {
  questionNumber.value++;
  router.push(`/question/${questionNumber.value}`);
  getQuestion();
}

const checkAnswer = (selectedAnswer) => {
  if (selectedAnswer === correctAnswer.value.reponse) {
    console.log('Correct');
    statStore.incrementPointCounter();
    pushToNextQuestion();
  } else {
    console.log('Incorrect');
    statStore.decrementPointCounter();
    pushToNextQuestion();
  }
}
</script>

<style scoped>
</style>
