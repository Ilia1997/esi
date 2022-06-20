<script>
  import ContactForm from "./TabForms/ContactForm.svelte";
  import Tabs from "./Tabs/Tabs.svelte";
  import PasswordForm from "./TabForms/PasswordForm.svelte";
  import { fade } from "svelte/transition";
  import { aoviSvelte } from "aovi-svelte";
  import {
    allowItemIndex,
    infoFormErrorMessage,
    infoFormErrorState,
    infoFormData,
    infoFormErrorStates,
    confirmPopUpState,
    savedPassword,
  } from "../../stores/infoStore";
  import { headSteps, decrementStep } from "../../stores/store";
  import ButtonLeft from "../buttons/ButtonLeft.svelte";
  import {
    checkIfEmailExistInDB,
    checkIfUserNameExistInDB,
  } from "./Validations/Validations";
  import ButtonRight from "../buttons/ButtonRight.svelte";
import { afterUpdate, onDestroy } from "svelte";
import Arrow_left_ico from "../../../public/images/Arrow_left_ico.svelte";
  let tabItems = [
    // { name: "Name", component: NameForm },
    { name: "Contacts", component: ContactForm },
    // { name: "Address", component: AddressForm },
    { name: "Password", component: PasswordForm },
  ];

  let formButtonText = "Next";
  let activeItem = tabItems[0];
  let nextButtonState = false;

  $: formButtonText, nextButtonState;

  async function nextTab() {
    if ($allowItemIndex < 3) {
      let index = tabItems.findIndex((object) => {
        return object.name === activeItem.name;
      });
      if (index === 0) {
        // Validate Contact 
        await doLoginData();
        if ($infoFormErrorState === false) {
          activeItem = tabItems[index + 1];
          $allowItemIndex = $allowItemIndex + 1;
          formButtonText = "Save";
        }
      } else if (index === 1) {
        console.log('Validate Password')
        // Validate Password
        doSignup();
        if ($infoFormErrorState === false) {
          $savedPassword = true
          nextButtonState = true;
        }
      }
    }
  }
  function prevTab() {
    if ($allowItemIndex > 1) {
      let index = tabItems.findIndex((object) => {
        return object.name === activeItem.name;
      });
      if (index != 0) {
        activeItem = tabItems[index - 1];
        $allowItemIndex = $allowItemIndex - 1;
        formButtonText = "Next";
        nextButtonState = false;
      }
    }
  }

  const loginData = aoviSvelte({
    userName: $infoFormData.userName,
    email:  $infoFormData.email,
    phone: $infoFormData.phone,
  });

  const passwordData = aoviSvelte({
    password:  $infoFormData.password,
    confirm: $infoFormData.confirm,
  });


  // Init "checker". Will be true when confirm and password are equal, and false in other case
  const confirm_match = passwordData.checker("confirm", (aovi) =>
    aovi.is($passwordData.password === $passwordData.confirm)
  );

  const validateEmailExistingInDB = async () => {
    let emailExistinDB = await checkIfEmailExistInDB($loginData.email);
    return !emailExistinDB
  }
  const validateUserNamelExistingInDB = async () => {
    let userNameExistinDB = await checkIfUserNameExistInDB(
        $loginData.userName
      );
    return !userNameExistinDB
  }
  

  const emailrRegEx =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  async function doLoginData() {
    loginData.aovi // use Aovi validators
      .check("userName")
      .required("Please put your username")
      .minLength(2, "User Name should be at least 2 symbols length")
      .is(
        await validateUserNamelExistingInDB(),
        `User with user name ${$loginData.userName} exist in database`
      )
      .check("email")
      .required("Please put your email")
      .match(emailrRegEx, "Incorrect E-mail format")
      .is( await validateEmailExistingInDB(), "Email exist in database")
      .check("phone")
      .required("Please put your phone")
      .minLength(7, "Phone should be at least 7 symbols length").end;
    // you must finish validation with '.end' operator

    if ($loginData.valid) {
      $infoFormErrorState = false;
    } else {
      $infoFormErrorState = true;
    }
  }
const passwordRegEx = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  function doSignup() {
    passwordData.aovi // use Aovi validators
      .check("password")
      .required("Please put your password")
      .minLength(8, "Password should be at least 8 symbols length")
      .match(passwordRegEx, "Password should have at least 1 capital letter, 1 number, 1 special symbol")
      .check("confirm")
      .required("Please confirm your password")
      .is($confirm_match, "Confirmation doesn't match password").end; // you must finish validation with '.end' operator

    if ($passwordData.valid) { // if validation success, do something
      $savedPassword = true;
    }
    else {
      $savedPassword = false;
    } 
  }

  let prevStep = () => {
    decrementStep();
  };

  let nextStep = () => {
    $confirmPopUpState = true;
  };

  afterUpdate(()=>{
    $infoFormData.email = $loginData.email
    $infoFormData.userName = $loginData.userName
    $infoFormData.phone = $loginData.phone
    $infoFormData.password = $passwordData.password
    $infoFormData.confirm = $passwordData.confirm
  })
onDestroy(()=>{
  $allowItemIndex = 1;
})
</script>
<div class="main__wrapper">
  <div class="info__main">
    <h2 class="main__head">
      Personal <span class="green">Information</span>
    </h2>
    <div class="main__tabs">
      <form>
        <Tabs {tabItems} />
        <div in:fade>
          {#if activeItem.name === "Contacts"}
            <ContactForm {loginData} />
          {:else if activeItem.name === "Password"}
            <PasswordForm {passwordData} {confirm_match} />
          {/if}
        </div>
        <div class="error__wrapper">
          {#each $loginData.err.toArray() as error}
            <p class="error__message">{error}</p>
          {/each}
          {#each $passwordData.err.toArray() as error}
            <p class="error__message">{error}</p>
          {/each}
        </div>
      </form>
    </div>
    <div class="buttons__wrapper">
      {#if $allowItemIndex > 1}
        <button class="btn-sv prev" on:click={prevTab}>
          <Arrow_left_ico />
          Back
        </button>
      {/if}
      {#if $passwordData.valid && formButtonText === 'Save' && !$confirm_match || formButtonText === 'Save' && $savedPassword}
        <button class='btn-sv next' disabled on:click={nextTab}>{formButtonText}</button>
        {:else}
        <button class='btn-sv next' on:click={nextTab}>{formButtonText}</button>
      {/if}
    </div>
  </div>

  <div class="bottom__btns">
    <ButtonLeft on:click={prevStep} />
    <ButtonRight on:click={nextStep} buttonState={nextButtonState} />
  </div>
</div>

<style>
  .main__head {
    text-align: center;
  }
  .error__message {
    font-size: 12px;
    line-height: 24px;
    color: #ff2e00;
  }

  :global(.tab__wrapper) {
    text-align: center;
    margin-bottom: 8px;
  }
  :global(.tab__head) {
    font-weight: 600;
    font-size: 24px;
    line-height: 36px;
    color: #053900;
  }
  :global(.tab__subhead) {
    color: #053900;
    margin-top: 10px;
  }
  :global(.tab__form__fields) {
    margin-top: 24px;
    position: relative;
    z-index: 3;
  }
  :global(.tab__form__fields .input-sv::placeholder) {
    color: #000000;
  }
  :global(.tab__form__fields .input-sv) {
    margin-bottom: 8px;
  }
  :global(.tab__form__fields .input-sv:last-child) {
    margin-bottom: 0px;
  }

  .buttons__wrapper {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    position: relative;
  }
  .btn-sv.prev {
    position: absolute;
    top: 0px;
    left: -5px;
    z-index: 2;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    color: #cfcfcf;
    border: none;
    background: transparent;
    font-weight: 400;
  }
  .btn-sv.prev:hover {
    filter: invert(1);
  }
  .btn-sv.next {
    width: 182px;
    height: 66px;
    border-radius: 10px;
    font-weight: 700;
    font-size: 16px;
    line-height: 24px;
    text-align: center;
    transition: all ease 0.3s;
    display: flex;
    justify-content: center;
  }
  .btn-sv.next:not(:disabled) {
    background: #0085ff;
    border: 1px solid #006eff;
    color: #ffffff;
  }
  .btn-sv.next:not(:disabled):hover {
    background: #3c90fe;
  }
  .btn-sv.next:not(:disabled):active {
    background: #0160dd;
  }
  .main__wrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
  }
  .green {
    color: #5b9c42;
  }
  .info__main {
    max-width: 528px;
    width: 100%;
    padding: 64px 20px 0 20px;
    margin: 0 auto;
  }
  .main__tabs {
    margin-top: 14px;
  }
  .main__tabs form {
    margin-bottom: 16px;
  }
</style>
