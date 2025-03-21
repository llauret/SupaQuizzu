import {defineStore} from "pinia";

export const useModeStore = defineStore("modeStore", {
    state: () => ({
        quizSelected: localStorage.getItem('quizSelected') || '',
        timerSelected: parseInt(localStorage.getItem('timerSelected')) || 0,
        questionAmount: parseInt(localStorage.getItem('questionAmount')) || 0,
    }),
    actions: {
        setQuizSelected(quizSelected) {
            this.quizSelected = quizSelected
            localStorage.setItem('quizSelected', quizSelected)
        },
        setTimerSelected(timerSelected) {
            this.timerSelected = timerSelected
            localStorage.setItem('timerSelected', timerSelected)
        },
        setQuestionAmount(questionAmount) {
            this.questionAmount = questionAmount
            localStorage.setItem('questionAmount', questionAmount)
        }
    }
})