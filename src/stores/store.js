import {get, writable } from 'svelte/store';

export const stepCounter = writable(1);
export const headSteps = writable({
    firstStep: true,
    secondStep: false,
    thirdStep: false,
    fourthStep: false,
    fifthStep: false
})

export function incrementStep() {
    stepCounter.update(n => n + 1)
}
export function decrementStep() {
    if(get(stepCounter) > 1){
        stepCounter.update(n => n - 1 )
    }
}
export const successMessageState = writable(false)

export let subscribeAllState = writable(false)












