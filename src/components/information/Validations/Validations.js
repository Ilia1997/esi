
   import {
    allowItemIndex,
    infoFormErrorMessage,
    infoFormErrorState,
    infoFormData,
    infoFormErrorStates,
    confirmPopUpState,
  } from "../../../stores/infoStore";
  import {get, writable } from 'svelte/store';
    
    export const validateContact = () => {
      let dataStore = get(infoFormData);
    let email = dataStore.email
    console.log(email)
    let userName = dataStore.userName
    console.log(userName)
    let phone = dataStore.phone
    // email validation
    validateUserName(userName);
    validateEmail(email);
    checkFieldLenght(phone, "Phone", "phone", 8, 12);

    checkValidFieldStatus();
  };
  function checkValidFieldStatus() {
    if (
      get(infoFormErrorStates.email) === false &&
      get(infoFormErrorStates.phone) === false &&
      get(infoFormErrorStates.userName) === false
    ) {
      infoFormErrorState.set(false) ;
    } else {
      infoFormErrorState.set(true);
    }
  }

  export const validatePassword = () => {
    let pass = get(infoFormData.password);
    let confirmPass =get(infoFormData.confirmPassword);
    if (pass !== confirmPass) {
      showError("password", "Passwords do not match");
      checkPassValidFieldStatus();
      return false;
    }

    checkFieldLenght(pass, "Password", "password", 6, 32);
    checkFieldLenght(confirmPass, "Confirm Password", "confirmPassword", 6, 32);
    checkPassValidFieldStatus();
  };

  function checkPassValidFieldStatus() {
    if (
      get(infoFormErrorStates.password) === false &&
      get(infoFormErrorStates.confirmPassword) === false
    ) {
      infoFormErrorState.set(false);
    } else {
      infoFormErrorState.set(true);
    }
  }
  let validateEmail = (email) => {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(email.trim())) {
      showError("email", "Email is not invalid");
      return false;
    } else {
      showSucces("email");
    }
  };

  let validateUserName = (userName) => {
    checkFieldLenght(userName, "User Name", "userName", 3, 32);
  };

  let checkFieldLenght = (field, fieldName, fieldType, min, max) => {
    if (field.length < min) {
      showError(fieldType, `${fieldName} must be at least ${min} characters`);
    } else if (field.length > max) {
      showError(fieldType, `${fieldName} must be les than ${max} characters`);
    } else {
      showSucces(fieldType);
    }
  };
     
  //Show input error messages
  function showError(type, message) {
    console.log(message)
    infoFormErrorMessage.update(item=>{
      item[type] = message
      return item
    })
    console.log( '1', get(infoFormErrorStates))
    infoFormErrorStates.update(item=>{
      console.log("item", item)
      console.log("type", type)
      item.email = true
      return item
    })
    console.log(get(infoFormErrorStates))
  }
  function showSucces(type) {


    infoFormErrorStates.update(item=>{
      console.log(item[type])
      return item[type] = false
    })
  }

  
