import { writable } from "svelte/store";

export const allowItemIndex = writable(1);

export const confirmPopUpState = writable(false);
export const clickOnPrevBtn = writable(false)

export const savedPassword = writable(false)

export const infoFormErrorMessage = writable({
  userName: "",
  email: "",
  phone: "",
  password: "",
});

export const infoFormErrorState = writable(false);
export const infoFormErrorStates = writable({
  userName: false,
  email: false,
  phone: false,
  password: false,
  confirmPassword: false,
});

export const infoFormData = writable({
  userName: "",
  email: "",
  phone: "",
  phoneCode: "",
  password: "",
  confirm: "",
});
export const calcInputPhonePadding = writable (105)

// export const coutriesData = [
//   {
//     name: "USA",
//     phoneCode: "+1",
//     flugImgUrl:
//       "https://uploads-ssl.webflow.com/627ca4b5fcfd5674acf264e6/62babf73e7b10c908acc62da_us-flag.png",
//   },
//   {
//     name: "Germany",
//     phoneCode: "+49",
//     flugImgUrl:
//       "https://uploads-ssl.webflow.com/627ca4b5fcfd5674acf264e6/62babf755cb2e2cf6f09e0ad_gm-flag.png",
//   },
//   {
//     name: "France",
//     phoneCode: "+33",
//     flugImgUrl:
//       "https://uploads-ssl.webflow.com/627ca4b5fcfd5674acf264e6/62babf76e7b10c2f1bcc62ed_fr-flag.png",
//   },
//   {
//     name: "Norway",
//     phoneCode: "+47",
//     flugImgUrl:
//       "https://uploads-ssl.webflow.com/627ca4b5fcfd5674acf264e6/62babf03c5323565da72c667_no-flag.gif",
//   },
//   {
//     name: "Sweden",
//     phoneCode: "+46",
//     flugImgUrl:
//       "https://uploads-ssl.webflow.com/627ca4b5fcfd5674acf264e6/62babf0357c7f1e72acaf6bb_sw-flag.gif",
//   },
//   {
//     name: "Denmark",
//     phoneCode: "+45",
//     flugImgUrl:
//       "https://uploads-ssl.webflow.com/627ca4b5fcfd5674acf264e6/62babf045cb2e2157e09df90_da-flag.gif",
//   },
//   {
//     name: "Finland",
//     phoneCode: "+358",
//     flugImgUrl:
//       "https://uploads-ssl.webflow.com/627ca4b5fcfd5674acf264e6/62babf039452bdf9c46872fc_fi-flag.gif",
//   },
// ];
export const selectedCountry = writable()
