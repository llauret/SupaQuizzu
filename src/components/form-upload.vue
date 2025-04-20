<template>
  <div>
    <Input
        accept=".json"
        class="w-full bg-transparent border-b border-nierBrown/30 py-2 pl-4 outline-none focus:border-nierBrown mb-4"
        type="file"
        @change="handleFile"
    />

    <div class="flex items-start gap-4">
      <div class="relative w-1/2 bg-nierLightBrown border border-nierBrown p-4">

        <div class="flex justify-between items-center mb-2 ">
          <h3 class="text-lg font-bold">JSON sous ce format :</h3>
          <button
              :class="['nier-copy-button text-nierBrown', { 'copied': isCopied }]"
              title="Copy to clipboard"
              @click="copyToClipboard"
          >
            <svg
                class="inline-block"
                fill="none"
                height="16"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                viewBox="0 0 24 24"
                width="16"
                xmlns="http://www.w3.org/2000/svg"
            >
              <rect height="13" rx="2" ry="2" width="13" x="9" y="9"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
            <span class="copy-tooltip ml-1">
              {{ isCopied ? 'Copied!' : 'Copy' }}
            </span>
          </button>
        </div>

        <pre
            class="bg-transparent border border-nierBrown  p-2 h-full overflow-y-auto text-sm"
        >{{ jsonExample }}</pre>
      </div>

      <div
          class="w-1/2 bg-nierLightBrown border border-nierBrown p-4 h-[38rem] overflow-y-auto"
      >
        <h3
            class="text-lg font-bold mb-2 sticky top-0 z-10 pt-2"
        >
          Contenu du fichier :
        </h3>
        <pre class="p-2 bg-transparent">{{ file }}</pre>
      </div>
    </div>

    <Button
        :class="jsonValidator ? 'bg-nierLightBrown hover:opacity-90' : 'bg-nierBrown'"
        :disabled="!jsonValidator"
        class="w-full mt-4 h-[4rem] font-bold rounded transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
        @click="addQuizBulk"
    >
      Upload
    </Button>
  </div>
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