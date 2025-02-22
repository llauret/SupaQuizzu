<template>
  <div v-if="displayCondtion">
    <div>Créer un quizz</div>

    <div>Sélectionner le thème du quizz</div>
    <select v-model="quiz" name="quizz-category">
      <option v-for="(category, index) in quizCategory" :key="index">{{ category.titre }}</option>
    </select>

    <div>
      <div>
        Question à poser ?
      </div>
      <input id="question" v-model="question" name="question" type="text">

      <div>
        <div id="question-input" @mousedown="addInput">+</div>
        <div @mousedown="removeInput">-</div>
        Réponse(s) possible(s)
        <div v-for="(reponse, index) in reponses" :key="index">
          <input v-model="reponses[index].reponse" name="answer" type="text">
          <input v-model="reponses[index].est_correcte" name="correct-answer" type="checkbox">
        </div>
      </div>
    </div>

    <button @click="addQuestion">Ajouter question</button>

  </div>
</template>
<script setup>

import {computed, onMounted, ref} from "vue";
import {supabase} from "@/lib/supabaseClient.js";
import {Button} from "@/components/ui/button/index.js";

defineProps({
  displayCondtion: Boolean
})

const quizCategory = ref([]);
const quiz = ref('');
const question = ref('');
const reponses = ref([{reponse: '', est_correcte: false}, {reponse: '', est_correcte: false}]);

onMounted(async () => {
  const {data} = await supabase.rpc('get_quiz_title');
  quizCategory.value = data;
})

const formattedQuestion = computed(() => {
  return question + '?'
})

const addInput = () => {
  if (reponses.value.length < 4) reponses.value.push({reponse: '', est_correcte: false});
}

const removeInput = () => {
  if (reponses.value.length > 2) reponses.value.pop();
}

const checkForm = computed(() => {
  return !(quiz.value === '' || question.value === '' || reponses.value.some(r => r.reponse === ''));
})

const addQuestion = async () => {
  if (!checkForm.value) return;
  await supabase.rpc('add_quiz', {
    quest_param: question.value,
    reponses_param: reponses.value,
    quiz_param: quiz.value
  });
  console.log('Question added');
}


</script>