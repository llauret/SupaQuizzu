<template>
  <div
      v-if="displayCondtion"
      class="absolute inset-0 bg-white dark:bg-gray-800 bg-opacity-50 flex justify-center items-center z-50"
  >
    <div class="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg w-full max-w-md">
      <div
          class="bg-red-500 p-2 rounded cursor-pointer text-white"
          @mousedown="displayCondition = false"
      >
        X
      </div>
      <h2 class="text-xl mb-4 font-bold text-black dark:text-white">Créer un quiz</h2>

      <div class="mb-4">
        <label class="block text-sm font-medium text-black dark:text-gray-300" for="quiz-category">
          Sélectionner le thème du quiz
        </label>
        <Select v-model="quiz">
          <SelectTrigger class="mt-1">
            <SelectValue :placeholder="quiz ? quiz : 'Choisir une catégorie'"/>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Catégories</SelectLabel>
              <SelectItem
                  v-for="(category, index) in quizCategory"
                  :key="index"
                  :value="category.titre"
              >
                {{ category.titre }}
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div class="mb-4">
        <label class="block text-sm font-medium text-black dark:text-gray-300" for="question">
          Question à poser ?
        </label>
        <Input
            id="question"
            v-model="question"
            class="mt-1"
            name="question"
            type="text"
        />
      </div>

      <div class="mb-4">
        <div class="flex items-center justify-between mb-2">
          <label class="block text-sm font-medium text-black dark:text-gray-300">
            Réponse(s) possible(s)
          </label>
          <div>
            <Button
                id="add-answer"
                class="mr-2"
                variant="outline"
                @click="addInput"
            >
              +
            </Button>
            <Button id="remove-answer" variant="outline" @click="removeInput">
              -
            </Button>
          </div>
        </div>
        <div v-for="(reponse, index) in reponses" :key="index" class="flex items-center mb-2">
          <Input
              v-model="reponses[index].reponse"
              class="flex-1 mr-2"
              name="answer"
              type="text"
          />
          <label class="inline-flex items-center">
            <Checkbox v-model="reponses[index].est_correcte" name="correct-answer"/>
          </label>
        </div>
      </div>

      <Button class="w-full" variant="primary" @click="addQuestion">
        Ajouter question
      </Button>
    </div>
  </div>
</template>

<script setup>

import {computed, onMounted, ref} from "vue";
import {supabase} from "@/lib/supabaseClient.js";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Select} from "@/components/ui/select";
import {Checkbox} from "@/components/ui/checkbox";
import {SelectItem} from "@/components/ui/select";
import {SelectTrigger} from "@/components/ui/select";
import {SelectContent} from "@/components/ui/select";
import {SelectGroup} from "@/components/ui/select";
import {SelectLabel} from "@/components/ui/select";
import {SelectValue} from "@/components/ui/select";

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