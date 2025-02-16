import {defineStore} from 'pinia'

export const useStatStore = defineStore('statStore', {
    state: () => ({
        pointCounter: parseInt(localStorage.getItem('pointCounter')) || 0,
    }), actions: {
        incrementPointCounter() {
            this.pointCounter += 500
            localStorage.setItem('pointCounter', this.pointCounter)
        }, decrementPointCounter() {
            this.pointCounter -= 100
            localStorage.setItem('pointCounter', this.pointCounter)
        }, resetPointCounter() {
            this.pointCounter = 0
            localStorage.setItem('pointCounter', this.pointCounter)
        }
    }
})