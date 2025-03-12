<template>
  <div>
    <Input accept=".json" type="file" @change="handleFile"></Input>
  </div>
  <div class="flex items-start mt-4 gap-4">
    <div class="w-1/2 p-4 rounded-lg  border border-gray-300">
      <h3 class="font-bold mb-2">JSON sous ce format :</h3>
      <pre class="p-2 rounded-lg overflow-x-auto h-80">
      {
        "quiz": "Réseaux",
        "questions": [
          {
            "enonce": "Quel est le rôle fondamental d'une **adresse IP** dans un réseau informatique ?",
            "reponses": [
              {
                "reponse": "Identifier le fabricant d'une carte réseau.",
                "est_correcte": false
              },
              {
                "reponse": "Fournir un identifiant unique pour les périphériques sur un réseau.",
                "est_correcte": true
              },
              {
                "reponse": "Déterminer le chemin le plus court pour acheminer des données.",
                "est_correcte": false
              },
              {
                "reponse": "Contrôler l'accès au support de transmission physique.",
                "est_correcte": false
              }
            ]
          }
        ]
      }
    </pre>
    </div>
    <div class="w-1/2 p-4 rounded-lg shadow-md border border-gray-300 overflow-y-auto h-96">
      <h3 class="font-bold mb-2 sticky top-0">Contenu du fichier :</h3>
      <pre class="p-2 rounded-lg overflow-x-auto">{{ file }}</pre>
    </div>
  </div>
  <Button
      :class="[jsonValidator ? 'bg-green-500' : 'bg-red-500 cursor-not-allowed disabled' ,'w-full mt-2']"
      @click="addQuizBulk">Upload
  </Button>
</template>

<script setup>
import {Input} from "@/components/ui/input/index.js";
import {Button} from "@/components/ui/button/index.js";
import {supabase} from "@/lib/supabaseClient.js";
import {computed, ref} from "vue";

const file = ref(null);

const jsonValidator = computed(() => {
  if (!file.value) return false;
  return file.value.quiz && file.value.questions && Array.isArray(file.value.questions) && file.value.questions.every(q => q.enonce);
});

const handleFile = (e) => {
  const reader = new FileReader();
  reader.onload = (event) => {
    try {
      const json = JSON.parse(event.target.result);
      console.log(json);
      file.value = json;
    } catch (error) {
      console.error("Error parsing JSON:", error);
    }
  };
  reader.readAsText(e.target.files[0]);
};

const addQuizBulk = async () => {
  if (file.value) {
    await supabase.rpc('add_quiz_bulk', {data: file.value});
  }
};

</script>