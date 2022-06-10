import { writable } from "svelte/store";

export const allowItemIndex = writable (1)

export const confirmPopUpState = writable(false)
// export const confirmPopUpSubmited = writable(false)
 
export const infoFormErrorMessage = writable({
    userName: '',
    email: '',
    phone: '',
    password: '',
})

export const infoFormErrorState = writable(false)
export const infoFormErrorStates = writable({
    userName: false,
    email: false,
    phone: false,
    password: false,
    confirmPassword: false
})

export const infoFormData = writable({
    userName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
})
