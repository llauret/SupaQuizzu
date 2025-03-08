import {defineStore} from 'pinia'

export const useQuestionStore = defineStore('questionStore', {
    state: () => ({
        question: localStorage.getItem('question') || JSON.parse(localStorage.getItem('question')) || [],
        questionNumber: parseInt(localStorage.getItem('questionNumber')) || 0,
        questionType: ''
    }),
    actions: {
        setQuestions(question) {
            this.question = question
            localStorage.setItem('question', JSON.stringify(this.question))
        },
        setQuestionNumber(questionNumber) {
            this.questionNumber = questionNumber
            localStorage.setItem('questionNumber', this.questionNumber)
        }
    }
})