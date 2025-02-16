<template>
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

const question = ref('');
const answers = ref([]);
const correctAnswer = ref(null);

async function getQuestion() {
  const {data} = await supabase.rpc('get_first_question_test');
  console.log(data);
  question.value = data[0].question;
  answers.value = data.map(d => ({
    reponse: d.reponse,
    est_correct: d.est_correct
  }));
  correctAnswer.value = data.find(d => d.est_correct === true);
  console.log(correctAnswer.value);
}

onMounted(() => {
  getQuestion();
});

const checkAnswer = (selectedAnswer) => {
  if (selectedAnswer === correctAnswer.value.reponse) {
    console.log('Correct');
  } else {
    console.log('Incorrect');
  }
}
</script>

<style scoped>
</style>
