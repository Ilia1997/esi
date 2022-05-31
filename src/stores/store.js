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
    safeName: "0 of Total Contribution",
    adventure: 0,
    adventureName: "0 of Total Contribution",
    founder: 0,
    founderName: "0 of Total Contribution",
})

export const firstClickedDropdown = writable({
    safe: false,
    adventure: false,
    founder: false,
})

export let sortPersantageVariable = writable ("all")

export const plansModalState = writable(false)

export let subscribeAllState = writable(false)


export const plansModalData = writable({
    class: 'save',
    name: 'Green Safe',
    desc: 'Safe as a bank account. This fund invests exclusively in green bonds and is the perfect option for Green Savers who want to be sure their funds are secure. The Green Safe plan involves a commitment to institutional and governmental bonds and enables subscribers to have a global, national, and local impact.',
    lottie: "https://uploads-ssl.webflow.com/627ca4b5fcfd5674acf264e6/6281f1b9694dfd538fae0ee3_Safe.json"
})

export let planData = [
    {
      sortName: "all",
      persentage: 0,
      value: "0 of Total Contribution",
      visibility: true,
    },
    {
      sortName: "fourth",
      persentage: 25,
      value: "1/4 of Total Contribution",
      visibility: true,
    },
    {
      sortName: "fourth",
      persentage: 50,
      value: "2/4 of Total Contribution",
      visibility: true,
    },
    {
      sortName: "fourth",
      persentage: 75,
      value: "3/4 of Total Contribution",
      visibility: true,
    },
    {
      sortName: "fourth",
      persentage: 100,
      value: "4/4 of Total Contribution",
      visibility: true,
    },
    {
      sortName: "third",
      persentage: 33.33,
      value: "1/3 of Total Contribution",
      visibility: true,
    },
    {
      sortName: "third",
      persentage: 66.67,

      value: "2/3 of Total Contribution",
      visibility: true,
    },
    {
      sortName: "third",
      persentage: 100,
      value: "3/3 of Total Contribution",
      visibility: true,
    },
  ];







