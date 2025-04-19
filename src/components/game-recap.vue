<template>
  <transition
      appear
      name="slide-up"
  >
    <div v-if="displayStore.isGameOver"
         class="flex w-full h-full items-center justify-center top-0 absolute font-bold text-4xl text-red-500">
      WOMP WOMP
      <score/>
      <div>
        <div>Ton nom ?</div>
        <input
            v-model="username"
            class="border-2 border-gray-300 rounded-lg p-2 mt-2 w-full"
            placeholder=""
            type="text"
        />
        <div>Enregistrer le record ?</div>
        <button
            :disabled="!username"
            class="bg-blue-500 text-white font-bold py-2 px-4 rounded mt-2 cursor-pointer disabled:cursor-not-allowed"
            @click.once="addRecord"
        >
          Enregistrer
        </button>
        <router-link to="/">
          Retourner au menu ?
        </router-link>
      </div>
    </div>
  </transition>

</template>
<script setup>
import {useDisplayStore} from "@/stores/display.store.js";
import Score from "@/components/score.vue";
import {ref} from "vue";
import {supabase} from "@/lib/supabaseClient.js";
import {useStatStore} from "@/stores/stat.store.js";

const statStore = useStatStore();
const displayStore = useDisplayStore();
const username = ref('');

const addRecord = async () => {
  await supabase.rpc('add_record', {
    username_param: username.value,
    score_param: statStore.pointCounter,
    record_date_param: new Date().toISOString()
  })
  console.log("Record added");
};

</script>
<style scoped>
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.5s ease;
}

.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(600px);
  opacity: 0;
}
</style>