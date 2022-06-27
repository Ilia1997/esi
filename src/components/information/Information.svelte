<script>
  import ContactForm from "./TabForms/ContactForm.svelte";
  import Tabs from "./Tabs/Tabs.svelte";
  import PasswordForm from "./TabForms/PasswordForm.svelte";
  import { fade } from "svelte/transition";
  import { aoviSvelte } from "aovi-svelte";
  import {
    allowItemIndex,
    infoFormErrorMessage,
    clickOnPrevBtn,
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
  let prevBtn;

  $: formButtonText, nextButtonState, activeItem;

  async function nextTab() {
    if ($allowItemIndex < 3) {
      let index = tabItems.findIndex((object) => {
        return object.name === activeItem.name;
      });
      if (index === 0 && $loginData.valid) {
        // Validate Contact
        await doLoginData();
        if ($infoFormErrorState === false) {
          activeItem = tabItems[index + 1];
          $allowItemIndex = $allowItemIndex + 1;
          formButtonText = "Save";
        }
      } else if (index === 1) {
        // Validate Password
        doSignup();
        if ($savedPassword === true) {
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
    email: $infoFormData.email,
    phone: $infoFormData.phone,
  });

  const passwordData = aoviSvelte({
    password: $infoFormData.password,
    confirm: $infoFormData.confirm,
  });

  // Init "checker". Will be true when confirm and password are equal, and false in other case
  const confirm_match = passwordData.checker("confirm", (aovi) =>
    aovi.is($passwordData.password === $passwordData.confirm)
  );

  const validateEmailExistingInDB = async () => {
    let emailExistinDB = await checkIfEmailExistInDB($loginData.email);
    return !emailExistinDB;
  };
  const validateUserNamelExistingInDB = async () => {
    let userNameExistinDB = await checkIfUserNameExistInDB($loginData.userName);
    console.log("!userNameExistinDB", !userNameExistinDB);
    return !userNameExistinDB;
  };

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
      .is(await validateEmailExistingInDB(), "Email exist in database")
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
      .match(
        passwordRegEx,
        "Password should have at least 1 capital letter, 1 number, 1 special symbol"
      )
      .is($confirm_match, "Confirmation doesn't match password")
      .check("confirm")
      .required("Please confirm your password")
      .minLength(8, "Password should be at least 8 symbols length").end; // you must finish validation with '.end' operator

    if ($passwordData.valid) {
      // if validation success, do something
      $savedPassword = true;
    } else {
      $savedPassword = false;
    }
  }

  let prevStep = () => {
    decrementStep();
  };

  let nextStep = () => {
    $confirmPopUpState = true;
  };

  afterUpdate(() => {
    $infoFormData.email = $loginData.email;
    $infoFormData.userName = $loginData.userName;
    $infoFormData.phone = $loginData.phone;
    $infoFormData.password = $passwordData.password;
    $infoFormData.confirm = $passwordData.confirm;
    if ($clickOnPrevBtn) {
      activeItem = tabItems[0];
      $allowItemIndex = 1;
      formButtonText = "Next"
      $clickOnPrevBtn = false;
    }
  });
  onDestroy(() => {
    $allowItemIndex = 1;
  });
</script>

<div class="main__wrapper">
  <div class="info__main">
    <h2 class="h2-sv main__head">
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
      </form>
    </div>
    <div class="buttons__wrapper">
      {#if $allowItemIndex > 1}
        <button class="btn-sv prev" on:click={prevTab}>
          <Arrow_left_ico />
          Back
        </button>
      {/if}
      {#if $savedPassword && formButtonText === "Save"}
        <button class="btn-sv next" disabled on:click={nextTab}
          >{formButtonText}</button
        >
      {:else}
        <button class="btn-sv next" on:click={nextTab}>{formButtonText}</button>
      {/if}
    </div>
  </div>

  <div class="bottom__btns">
    <ButtonLeft on:click={prevStep} bind:this={prevBtn}/>
    <ButtonRight
      on:click={nextStep}
      buttonState={nextButtonState || $savedPassword}
    />
  </div>
</div>

<style>
  .h2-sv.main__head {
    text-align: center;
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
    color: var(--grey-color);
    border: none;
    background: transparent;
  }
  .btn-sv.prev:hover {
    filter: invert(1);
  }
  .btn-sv.next {
    width: 182px;
    height: 66px;
    border-radius: 10px;
    font-weight: var(--font-weight-bolder);
    text-align: center;
    transition: all ease 0.3s;
    display: flex;
    justify-content: center;
  }
  .btn-sv.next:not(:disabled) {
    background: var(--btn-color);
    border: 1px solid var(--btn-color);
    color: var(--white-color);
  }
  .btn-sv.next:not(:disabled):hover {
    background: var(--btn-color-hover);
  }
  .btn-sv.next:not(:disabled):active {
    background: var(--btn-color-active);
  }
  .main__wrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
  }
  .green {
    color: var(--color-dark-st3);
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

  @media only screen and (max-width: 768px) {
    .info__main {
      padding: 40px 20px 0 20px;
    }
    .btn-sv.prev {
      padding-left: 0;
    }
  }
</style>
