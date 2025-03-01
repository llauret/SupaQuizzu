import { defineStore } from "pinia";

export const useDisplayStore = defineStore("displayStore", {
  state: () => ({
      isFormCreateVisible: false,
  }),
})