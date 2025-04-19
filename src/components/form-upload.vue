<template>
  <div>
    <Input accept=".json" type="file" @change="handleFile"></Input>
  </div>
  <div class="flex items-start mt-4 gap-4">
    <div class="w-1/2 p-4 rounded-lg  border border-gray-300">
      <div class="flex justify-between">
        <h3 class="font-bold mb-2">JSON sous ce format :</h3>
        <button
            :class="{ 'copied': isCopied }"
            class="nier-copy-button"
            title="Copy to clipboard"
            @click="copyToClipboard">
          <svg fill="none" height="16" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
               stroke-width="2" viewBox="0 0 24 24" width="16" xmlns="http://www.w3.org/2000/svg">
            <rect height="13" rx="2" ry="2" width="13" x="9" y="9"></rect>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
          </svg>
          <span class="copy-tooltip">{{ isCopied ? 'Copied!' : 'Copy' }}</span>
        </button>
      </div>
      <pre class="p-2 rounded-lg overflow-x-auto h-80">
      {{ jsonExample }}
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

const isCopied = ref(false);
const file = ref(null);
const jsonExample = `{
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
}`;

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

const copyToClipboard = () => {
  navigator.clipboard.writeText(jsonExample)
      .then(() => {
        isCopied.value = true;
        setTimeout(() => {
          isCopied.value = false;
        }, 2000);
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
      });
};

const addQuizBulk = async () => {
  if (file.value) {
    await supabase.rpc('add_quiz_bulk', {data: file.value});
  }
};

</script>

<style scoped>
.nier-copy-button {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
  color: #e2d8bf;
  background: transparent;
  border: 1px solid rgba(226, 216, 191, 0.5);
  cursor: pointer;
  transition: all 0.3s;
}

.nier-copy-button:hover {
  background: rgba(226, 216, 191, 0.1);
  border-color: rgba(226, 216, 191, 0.8);
}

.nier-copy-button.copied {
  color: #ffffff;
  border-color: #ffffff;
  background: rgba(226, 216, 191, 0.2);
}

.copy-tooltip {
  position: absolute;
  top: -25px;
  font-size: 0.7rem;
  background: rgba(20, 20, 20, 0.9);
  padding: 3px 6px;
  border: 1px solid rgba(226, 216, 191, 0.5);
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s;
}

.nier-copy-button:hover .copy-tooltip {
  opacity: 1;
}
</style>