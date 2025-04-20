<template>
  <transition appear name="fade">
    <div
        v-if="displayCondtion"
        class="fixed inset-0 bg-black/60 flex justify-center items-center z-50"
    >
      <div
          class="w-3/4 h-[58rem] bg-nierLightBrown checked shadow-lg p-6 text-nierLightBrown relative overflow-auto">
        <div class="bg-nierBrown text-nierLightBrown px-4 py-2 flex justify-between items-center mb-6">
          <h2 class="text-2xl font-bold">Créer un quiz</h2>
          <button
              class="w-6 h-6 flex items-center justify-center
                   bg-nierOrange text-nierLightBrown font-bold"
              @click="displayStore.isFormCreateVisible = false"
          >X
          </button>
        </div>

        <div class="flex justify-center gap-4 mb-6">
          <button
              :class="isUploadMode
              ? 'bg-nierBrown text-nierLightBrown'
              : 'border border-nierBrown text-nierBrown bg-nierLightBrown'"
              class="flex-1 py-2 font-bold"
              @click="toggleMode('upload')"
          >
            Upload un fichier
          </button>
          <button
              :class="!isUploadMode
              ? 'bg-nierBrown text-nierLightBrown'
              : 'border border-nierBrown text-nierBrown bg-nierLightBrown'"
              class="flex-1 py-2 font-bold"
              @click="toggleMode('create')"
          >
            Créer un quiz
          </button>
        </div>

        <form-upload v-if="isUploadMode"/>

        <div v-else>
          <div class="mb-6">
            <label class="block mb-2">Sélectionner le thème du quiz</label>
            <Select v-model="quiz">
              <SelectTrigger
                  class="w-full bg-transparent border-b border-[#3B3A34]/30 pl-2 pb-1 outline-none focus:border-[#3B3A34]"
              >
                <SelectValue
                    :placeholder="quiz || 'Choisir une catégorie'"
                />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Catégories</SelectLabel>
                  <SelectItem
                      v-for="(category, idx) in quizCategory"
                      :key="idx"
                      :value="category.titre"
                  >
                    {{ category.titre }}
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div class="mb-6">
            <label class="block mb-2">Question à poser ?</label>
            <Input
                id="question"
                v-model="question"
                class="w-full bg-transparent border-b border-[#3B3A34]/30 pl-2 pb-1 outline-none focus:border-[#3B3A34]"
                type="text"
            />
          </div>

          <div class="mb-6">
            <div class="flex justify-between mb-2">
              <span>Réponse(s) possible(s)</span>
              <div class="flex gap-2">
                <Button variant="outline" @click="addInput">+</Button>
                <Button variant="outline" @click="removeInput">-</Button>
              </div>
            </div>
            <div
                v-for="(rep, idx) in reponses"
                :key="idx"
                class="flex items-center mb-2"
            >
              <Input
                  v-model="reponses[idx].reponse"
                  class="flex-1 bg-transparent border-b border-[#3B3A34]/30 pl-2 pb-1 outline-none focus:border-[#3B3A34]"
                  type="text"
              />
              <Checkbox
                  v-model="reponses[idx].est_correcte"
                  class="ml-4"
              />
            </div>
          </div>

          <Button
              class="w-full bg-[#3B3A34] text-[#EDE9D4]
                   py-2 font-bold"
              @click="addQuestion"
          >
            Ajouter question
          </Button>
        </div>
      </div>
    </div>
  </transition>
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
import {useDisplayStore} from "@/stores/display.store.js";
import FormUpload from "@/components/form-upload.vue";

defineProps({displayCondtion: Boolean});

const displayStore = useDisplayStore();
const isUploadMode = ref(false);

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

const toggleMode = (mode) => {
  isUploadMode.value = (mode === 'upload');
};

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