<script>
  import Tabs from "./Tabs/Tabs.svelte";
  import AddressForm from "./TabForms/AddressForm.svelte";
  import PaymentForm from "./TabForms/PaymentForm.svelte";
  import { fade, slide } from "svelte/transition";
  import {
    allowItemIndexBilling,
    addressFormStatus,
    billingeErrorMessage,
  } from "../../stores/billingStore";
  import {
    successMessageState,
    userAuthToken,
    clientSecretToken,
  } from "../../stores/store";
  import { contributionData } from "../../stores/contributionsStore";
  import ButtonRight from "../buttons/ButtonRight.svelte";
  import Button_back_ico from "../../../public/images/Button_back_ico.svelte";
  import { aoviSvelte } from "aovi-svelte";
  import * as animateScroll from "svelte-scrollto";
  import { scrollToTop } from "../../functions/scrollToTop";
  import { updateUserInDB } from "./updateUserInDB";
  import { getClientSecret } from "./getClientSecret";
  import { onMount } from "svelte";

  let tabItems = [
    { name: "Address", component: AddressForm },
    { name: "Payment", component: PaymentForm },
  ];
  let activeItem = tabItems[0];
  let formButtonText = "Next";
  let nextButtonState = false;
  let windowWidth, formWrapper;

  $: nextButtonState, windowWidth;
  //$userAuthToken = 'Basic ZXNpX3ByaXZhdGUlN0M1NTU1NTU1NTV0dDpwYXNzUDEmZmY='

  function scrollToTopInMobile() {
    if (windowWidth < 991) {
      animateScroll.scrollTo({ element: formWrapper });
    }
  }

  function nextTab() {
    if ($allowItemIndexBilling < 3) {
      let index = tabItems.findIndex((object) => {
        return object.name === activeItem.name;
      });

      if (index === 0) {
        checkRequiredAddressFields();
        if ($addressFormStatus) {
          // collect user data
          const userData = {
            firstName: $addressData.firstName,
            lastName: $addressData.lastName,
            address: $addressData.streetNumber,
            city: $addressData.city,
            zipCode: $addressData.postal,
            dob: $addressData.dateOfBirdth,
            sex: $addressData.gender,
          };

          // update user
          let updateUserStatus = false;
          updateUserInDB(userData, $userAuthToken).then((data) => {
            updateUserStatus = data;

            console.log("$userAuthToken", $userAuthToken);

            if (updateUserStatus) {
              activeItem = tabItems[index + 1];
              $allowItemIndexBilling = $allowItemIndexBilling + 1;
              formButtonText = "Confirm";
              scrollToTop();
            }
          });
        }
      } else if (index === 1) {
        nextButtonState = true;
        scrollToTop();
      }
    }
  }

  function prevTab() {
    if ($allowItemIndexBilling > 1) {
      let index = tabItems.findIndex((object) => {
        return object.name === activeItem.name;
      });
      if (index != 0) {
        activeItem = tabItems[index - 1];
        $allowItemIndexBilling = $allowItemIndexBilling - 1;
        formButtonText = "Next";
        nextButtonState = false;
      }
    }
    scrollToTop();
  }

  const addressData = aoviSvelte({
    firstName: "",
    lastName: "",
    gender: "",
    dateOfBirdth: "",
    streetNumber: "",
    city: "",
    country: "",
    postal: "",
  });

  function checkRequiredAddressFields() {
    addressData.aovi // use Aovi validators
      .check("firstName")
      .required("First Name is required")
      .minLength(3, "First Name should be at least 3 symbols length")
      .maxLength(20, "First Name must be no more than 20 characters")
      .check("lastName")
      .required("Last Name is required")
      .minLength(3, "Last Name should be at least 3 symbols length")
      .maxLength(20, "Last Name must be no more than 20 characters")
      .check("gender")
      .required("Gender is required")
      .check("dateOfBirdth")
      .required("Date of Birdth is required")
      .check("streetNumber")
      .required("Street is required")
      .check("city")
      .required()
      .check("postal")
      .required()
      .minLength(2, "Postcode should be at least 2 symbols length")
      .maxLength(10, "Postcode must be no more than 10 characters")
      .match(/^\d+$/, "Postal should contain only numbers").end; // you must finish validation with '.end' operator

    if ($addressData.valid) {
      $addressFormStatus = true;
    } else {
      $addressFormStatus = false;
      scrollToTopInMobile();
    }
  }

  let nextStep = () => {
    $successMessageState = true;
    scrollToTop();
  };
  onMount(() => {
    getClientSecret($userAuthToken);
  });
</script>

<svelte:window bind:innerWidth={windowWidth} />
<div class="main__wrapper">
  <div class="info__main">
    <h2 class="h2-sv main__head" bind:this={formWrapper}>
      Payment/Withdrawal <span class="green">Methode</span>
    </h2>
    <div class="main__tabs">
      <Tabs {tabItems} />
      <div>
        <svelte:component this={activeItem.component} {addressData} />
      </div>

      {#if $billingeErrorMessage.status}
        <div transition:slide|local class="error__message">
          {$billingeErrorMessage.text}
        </div>
      {/if}
      <div class="buttons__wrapper">
        {#if $allowItemIndexBilling > 1}
          <button class="btn-sv prev" on:click={prevTab}>
            <Button_back_ico />
            Back
          </button>
        {/if}
        {#if activeItem.name != "Payment"}
          <button class="btn-sv next" on:click={nextTab}
            >{formButtonText}</button
          >
        {/if}
      </div>
    </div>
  </div>
  <div class="bottom__btns billing">
    <!-- //nextButtonState -->
    <ButtonRight on:click={nextStep} buttonState={nextButtonState} />
  </div>
</div>

<style>
  .h2-sv.main__head {
    text-align: center;
  }
  .bottom__btns.billing {
    justify-content: flex-end;
  }
  .buttons__wrapper {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    position: relative;
    min-height: 66px;
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
    background: var(--btn-color);
    border: 1px solid var(--btn-color);
    border-radius: 10px;
    font-weight: var(--font-weight-bolder);
    color: var(--white-color);
    text-align: center;
    transition: all ease 0.3s;
    display: flex;
    justify-content: center;
  }
  .btn-sv.next:hover {
    background: var(--btn-color-hover);
  }
  .btn-sv.next:active {
    background: var(--btn-color-active);
  }
  .main__wrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .green {
    color: var(--color-dark-st3);
  }
  .info__main {
    padding-top: 64px;
    margin: 0 auto;
    max-width: 100%;
  }
  .main__tabs {
    margin: 14px auto 0 auto;
    position: relative;
    max-width: 528px;
    width: 100%;
    padding: 0px 20px 0 20px;
  }

  @media only screen and (max-width: 768px) {
    .info__main {
      padding-top: 40px;
    }
  }
</style>
