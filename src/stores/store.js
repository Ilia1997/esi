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

export const contributionData = writable({
	period: 'Monthly',
	currency: 'USD',
    currencySymbol: '$',
    amount: 600,
    monthlyValue: 600
})

export const allocatedContributions = writable({
    safe: 0,
    adventure: 0,
    founder: 0
})

export const plansModalState = writable(false)

export const plansModalData = writable({
    class: 'save',
    name: 'Green Safe',
    desc: 'Safe as a bank account. This fund invests exclusively in green bonds and is the perfect option for Green Savers who want to be sure their funds are secure. The Green Safe plan involves a commitment to institutional and governmental bonds and enables subscribers to have a global, national, and local impact.',
    lottie: "https://uploads-ssl.webflow.com/627ca4b5fcfd5674acf264e6/6281f1b9694dfd538fae0ee3_Safe.json"
})





