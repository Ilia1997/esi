import {get, writable } from 'svelte/store';


export const contributionData = writable({
	period: 'Monthly',
	currency: 'USD',
    currencySymbol: '$',
    amount: 600,
    monthlyValue: 600
})

export const allocatedContributions = writable({
    safe: 0,
    safeName: "0 of Total Contribution",
    adventure: 0,
    adventureName: "0 of Total Contribution",
    founder: 0,
    founderName: "0 of Total Contribution",
})

