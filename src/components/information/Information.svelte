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
  } from "../../stores/infoStore";
  import { headSteps, decrementStep } from "../../stores/store";
  import ButtonLeft from "../buttons/ButtonLeft.svelte";
  import {
    checkIfEmailExistInDB,
    checkIfUserNameExistInDB,
  } from "./Validations/Validations";
  import ButtonRight from "../buttons/ButtonRight.svelte";
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
        // validateContact();
        await doLoginData();
        if ($infoFormErrorState === false) {
          activeItem = tabItems[index + 1];
          $allowItemIndex = $allowItemIndex + 1;
          formButtonText = "Save";
        }
      } else if (index === 1) {
        // validatePassword();
        doSignup();
        if ($infoFormErrorState === false) {
          console.log("here");
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
    userName: "",
    email: "",
    phone: "",
  });

  const passwordData = aoviSvelte({
    password: "",
    confirm: "",
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
      .required()
      .minLength(2, "User Name should be at least 2 symbols length")
      .is(
        await validateUserNamelExistingInDB(),
        `User with user name ${$loginData.userName} exist in database`
      )
      .check("email")
      .required()
      .match(emailrRegEx, "Email not valid")
      .is( await validateEmailExistingInDB(), "Email exist in database")
      .check("phone")
      .required()
      .minLength(7, "Phone should be at least 7 symbols length").end;
    // you must finish validation with '.end' operator

    if ($loginData.valid) {
      $infoFormErrorState = false;
    } else {
      $infoFormErrorState = true;
    }
  }

  function doSignup() {
    passwordData.aovi // use Aovi validators
      .check("password")
      .required()
      .minLength(8, "Password should be at least 8 symbols length")
      .check("confirm")
      .required()
      .is($confirm_match, "Confirmation doesn't match password").end; // you must finish validation with '.end' operator

    if ($passwordData.valid) console.log("Succeess password"); // if validation success, do something
  }

  let prevStep = () => {
    decrementStep();
  };

  let nextStep = () => {
    $confirmPopUpState = true;
  };
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
        {#each $loginData.err.toArray() as error}
          <p class="error__message">- {error}</p>
        {/each}
        {#each $passwordData.err.toArray() as error}
          <p class="error__message">- {error}</p>
        {/each}
      </form>
    </div>
    <div class="buttons__wrapper">
      {#if $allowItemIndex > 1}
        <button class="btn prev" on:click={prevTab}
          ><svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
          >
            <path
              d="M9.36881 12.568C9.53285 12.4039 9.625 12.1814 9.625 11.9494C9.625 11.7174 9.53285 11.4949 9.36881 11.3308L5.03756 6.99953L9.36881 2.66828C9.5282 2.50325 9.61639 2.28223 9.6144 2.0528C9.61241 1.82338 9.52038 1.60392 9.35815 1.44169C9.19592 1.27946 8.97646 1.18743 8.74704 1.18544C8.51761 1.18345 8.29659 1.27164 8.13156 1.43103L3.18169 6.38091C3.01765 6.54499 2.9255 6.76751 2.9255 6.99953C2.9255 7.23155 3.01765 7.45407 3.18169 7.61816L8.13156 12.568C8.29565 12.7321 8.51817 12.8242 8.75019 12.8242C8.98221 12.8242 9.20473 12.7321 9.36881 12.568Z"
              fill="#CFCFCF"
            />
          </svg>Back</button
        >
      {/if}
      <button class="btn next" on:click={nextTab}>{formButtonText}</button>
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
  :global(.tab__form__fields .input::placeholder) {
    color: #000000;
  }
  :global(.tab__form__fields .input) {
    margin-bottom: 8px;
  }
  :global(.tab__form__fields .input:last-child) {
    margin-bottom: 0px;
  }

  .buttons__wrapper {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    position: relative;
  }
  .btn.prev {
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
  }
  .btn.prev svg {
    margin-right: 10px;
  }
  .btn.next {
    width: 182px;
    height: 66px;
    background: #0085ff;
    border: 1px solid #006eff;
    border-radius: 10px;
    font-weight: 700;
    font-size: 16px;
    line-height: 24px;
    color: #ffffff;
    text-align: center;
    transition: all ease 0.3s;
    display: flex;
    justify-content: center;
  }
  .btn.next:hover {
    background: #3c90fe;
  }
  .btn.next:active {
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
