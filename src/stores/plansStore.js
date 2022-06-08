import {get, writable } from 'svelte/store';

export const plansModalData = writable({
    class: 'save',
    name: 'Green Safe',
    desc: 'Safe as a bank account. This fund invests exclusively in green bonds and is the perfect option for Green Savers who want to be sure their funds are secure. The Green Safe plan involves a commitment to institutional and governmental bonds and enables subscribers to have a global, national, and local impact.',
    lottie: "https://uploads-ssl.webflow.com/627ca4b5fcfd5674acf264e6/6281f1b9694dfd538fae0ee3_Safe.json"
})

export const plansModalState = writable(false)

export const sortPersantageVariable = writable ("all")

export const disableAllDropdown = writable(false)


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
    }
    
  ];