import {defineStore} from "pinia";

export const useDisplayStore = defineStore("displayStore", {
    state: () => ({
        isFormCreateVisible: false,
        isGameOver: false,
        isTimerRunning: false,
        selectedAnswers: JSON.parse(localStorage.getItem('selectedAnswers')) || []
    }),
    actions: {
        setSelectedAnswers(selectedAnswers) {
            if (!this.selectedAnswers.includes(selectedAnswers)) {
                this.selectedAnswers.push(selectedAnswers);
                localStorage.setItem('selectedAnswers', JSON.stringify(selectedAnswers));
            }
        }
    }
})