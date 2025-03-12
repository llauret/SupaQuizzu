import {defineStore} from "pinia";

export const useModeStore = defineStore("modeStore", {
    state: () => ({
        quizSelected: localStorage.getItem('quizSelected') || '',
        timerSelected: localStorage.getItem('timerSelected') || '',
        questionAmount: localStorage.getItem('questionAmount') || '',
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