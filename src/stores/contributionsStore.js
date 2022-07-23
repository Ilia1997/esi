import { get, writable } from "svelte/store";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const amountErrorMessageState = writable(false);

let currentDate = new Date();
//let currentMonthIndex = currentDate.getMonth();
let paymentMounthIndex = 8;
// currentMonthIndex + 1;

export const contributionData = writable({
  period: {},
  country: {},
  amount: "",
  monthlyValue: 0,
  nextPaymentDay: 1,
  nextPaymentMonth: months[paymentMounthIndex],
});

export const allocatedContributions = writable({
  safe: 0,
  safeName: "0 of Total Contribution",
  adventure: 0,
  adventureName: "0 of Total Contribution",
  founder: 0,
  founderName: "0 of Total Contribution",
});
