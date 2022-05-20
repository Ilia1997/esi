import { writable } from 'svelte/store';

export const stepCounter = writable(1);

export function incrementStep() {
    stepCounter.update(n => n + 1)
}
export function decrementStep() {
    if(stepCounter > 1){
        stepCounter.update(n => n - 1 )
    }
}

export const contributionData = writable({
	period: 'Monthly',
	currency: 'USD',
    currencySymbol: '$',
    amount: 600 ,
    monthlyValue: 600
})





