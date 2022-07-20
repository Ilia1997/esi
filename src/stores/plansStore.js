import {get, writable } from 'svelte/store';

export const plansModalData = writable({
    class: 'safe',
    name: 'Green Safe',
    desc: 'Safe as a bank account. This fund invests exclusively in green bonds and is the perfect option for Green Savers who want to be sure their funds are secure. The Green Safe plan involves a commitment to institutional and governmental bonds and enables subscribers to have a global, national, and local impact.',
    lottie: "https://uploads-ssl.webflow.com/627ca4b5fcfd5674acf264e6/6281f1b9694dfd538fae0ee3_Safe.json"
})

export const plansModalState = writable(false)

export const sortPersantageVariable = writable ("all")



export let planData = [
    {
      sortName: "all",
      persentage: 0,
      visibility: true,
    },
    {
      sortName: "fourth",
      persentage: 25,
      visibility: true,
    },
    {
      sortName: "fourth",
      persentage: 50,
      visibility: true,
    },
    {
      sortName: "fourth",
      persentage: 75,
      visibility: true,
    },
    {
      sortName: "fourth",
      persentage: 100,
      visibility: true,
    }
    
  ];


  export const planModalData = [{
    safe: {
      head: 'Green Safe',
      class: 'safe',
      desc: "Safe as a bank account. This fund invests exclusively in green bonds and is the perfect option for Green Savers who want to be sure their funds are secure. The Green Safe plan involves a commitment to institutional and governmental bonds and enables subscribers to have a global, national, and local impact.",
      lottie: "https://uploads-ssl.webflow.com/627ca4b5fcfd5674acf264e6/6281f1b9694dfd538fae0ee3_Safe.json"
    },
    adventure: {
      head: 'Green Adventure',
      class: 'adventure',
      desc: "A growth fund with more risks and more rewards. The Green Adventure plan is for Green Savers who want to put their funds toward ventures that have a significantly more direct impact on mitigating climate change and are devoted to creating and developing green businesses around the world. The plan also includes investments in green equities to reward companies that already make a difference and an activism investment fund for pressuring companies to become green.",
      lottie: "https://uploads-ssl.webflow.com/627ca4b5fcfd5674acf264e6/628203b9fca88d2dde5b697f_Adventure.json"
    },
    founder: {
      head: 'Green Change',
      class: 'founder',
      desc:  "The ESi future is green, and we want YOU to be part of it. Becoming a founder Green Saver involves owning part of ESi. This option is limited to a predetermined target, and you will own a portion of ESi based on your contribution up to a collective 35% of ESi capital. Our vision is to create a sustainable green finance ecosystem making ethical green investing accessible. Collectively, we plan to become the most prominent green investor and green financial product provider.",
      lottie:  "https://uploads-ssl.webflow.com/627ca4b5fcfd5674acf264e6/628203e11d51fd22eede66f3_Founder.json"
    }
  }]

  export const portfolioItems = [{
    safe: {
      main: ['50% international green bonds', '25% national green bonds', '25% municipal or provincial green bonds*'],
      detail: '*depending on availability and contribution size',
    },
    adventure: {
      main: ['50% venture investment', '25% green stock', '25% green activism investment'],
      detail: false,
    },
    founder: {
      main: ['100% invest in ESi capital'],
      detail: '*Limited offer of 150K shares at 20$ per share for 35% equity stake',
    }
  }]