<script>
  import Tabs from "./Tabs/Tabs.svelte";
  import AddressForm from "./TabForms/AddressForm.svelte";
  import PaymentForm from "./TabForms/PaymentForm.svelte";
  import {fade} from 'svelte/transition'
  import {
    allowItemIndexBilling,
    addressFormStatus,
    iBANAddedStatus,
    cardAddedStatus,
    billingeErrorMessage
  } from "../../stores/billingStore";
  import { successMessageState } from "../../stores/store";
  import ButtonRight from "../buttons/ButtonRight.svelte";
  import Button_back_ico from "../../../public/images/Button_back_ico.svelte";
  import { aoviSvelte } from "aovi-svelte";

  let tabItems = [
    { name: "Address", component: AddressForm },
    { name: "Payment", component: PaymentForm },
  ];
  let activeItem = tabItems[0];
  let formButtonText = "Next";
  let nextButtonState = false;


  $: nextButtonState;

  function nextTab() {
    if ($allowItemIndexBilling < 3) {
      let index = tabItems.findIndex((object) => {
        return object.name === activeItem.name;
      });
      if (index === 0) {
        checkRequiredAddressFields();
        if ($addressFormStatus) {
          activeItem = tabItems[index + 1];
          $allowItemIndexBilling = $allowItemIndexBilling + 1;
          formButtonText = "Confirm";
        }
      } else if (index === 1) {
        if ($iBANAddedStatus || $cardAddedStatus) {
          nextButtonState = true;
        } else {
          $billingeErrorMessage.status = true;
        }
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
  }

  const addressData = aoviSvelte({
    firstName: "",
    lastName: "",
    streetNumber: "",
    city: "",
    country: "",
    postal: "",
  });

  function checkRequiredAddressFields() {
    addressData.aovi // use Aovi validators
      .check("firstName")
      .required("First Name is required")
      .check("lastName")
      .required("Last Name is required")
      .check("streetNumber")
      .required("Street is required")
      .check("city")
      .required()
      .check("country")
      .required()
      .check("postal")
      .required()
      .match(/^\d+$/, "Postal should contain only numbers").end; // you must finish validation with '.end' operator

    if ($addressData.valid) {
      $addressFormStatus = true;
    }
  }

  let nextStep = () => {
    $successMessageState = true;
  };
</script>

<div class="main__wrapper">
  <div class="info__main">
    <h2 class="h2-sv main__head">
      Payment/Withdrawal <span class="green">Methode</span>
    </h2>
    <div class="main__tabs">
      <form on:submit|preventDefault>
        <Tabs {tabItems} />
        <svelte:component this={activeItem.component} {addressData} />
      </form>
    {#if $billingeErrorMessage.status}
      <div in:fade class="error__message">{$billingeErrorMessage.text}</div>
    {/if}
      <div class="buttons__wrapper">
        {#if $allowItemIndexBilling > 1}
          <button class="btn-sv prev" on:click={prevTab}>
            <Button_back_ico />
            Back
          </button>
        {/if}
        <button class="btn-sv next" on:click={nextTab}>{formButtonText}</button>
      </div>
    </div>
  </div>
  <div class="bottom__btns billing">
    <!-- //nextButtonState -->
    <ButtonRight on:click={nextStep} buttonState={nextButtonState} />
  </div>
</div>

<style>
  :global(.success__text) {
    color: rgb(4, 149, 4);
    padding: 40px;
    border: 1px solid;
    border-radius: 10px;
  }
  .h2-sv.main__head {
    text-align: center;
  }
  /* .error__message {
    font-size: 12px;
    line-height: 24px;
    color: #ff2e00;
  } */
  .bottom__btns.billing {
    justify-content: flex-end;
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
  :global(.select-sv) {
    font-size: 17px;
    padding: 0 30px;
    font-weight: 400;
    height: 70px;
    -webkit-appearance: none;
    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAeCAYAAABuUU38AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAUxJREFUeNrM1sEJwkAQBdCsngXPHsQO9O5FS7AAMVYgdqAd2IGCDWgFnryLFQiCZ8EGnJUNimiyM/tnk4HNEAg/8y6ZmMRVqz9eUJvRaSbvutCZ347bXVJy/ZnvTmdJ862Me+hAbZCTs6GHpyUi1tTSvPnqTpoWZPUa7W7ncT3vK4h4zVejy8QzM3WhVUO8ykI6jOxoGA4ig3BLHcNFSCGqGAkig2yqgpEiMsjSfY9LxYQg7L6r0X6wS29YJiYQYecemY+wHrXD1+bklGhpAhBDeu/JfIVGxaAQ9sb8CI+CQSJ+QmJg0Ii/EE2MBiIXooHRQhRCkBhNhBcEhLkwf05ZCG8ICCOpk0MULmvDSY2M8UawIRExLIQIEgHDRoghihgRIgiigBEjgiFATBACAgFgghEwSAAGgoBCBBgYAg5hYKAIFYgHBo6w9RRgAFfy160QuV8NAAAAAElFTkSuQmCC");
    background-size: 12px;
    background-position: 90% center;
    background-repeat: no-repeat;
    padding-right: 30px;
    color: #6c6c6c;
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
  }
  .btn-sv.prev:hover {
    filter: invert(1);
  }
  .btn-sv.next {
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
  .btn-sv.next:hover {
    background: #3c90fe;
  }
  .btn-sv.next:active {
    background: #0160dd;
  }
  .main__wrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .green {
    color: #5b9c42;
  }
  .info__main {
    padding-top: 64px;
    margin: 0 auto;
    max-width: 100%;
  }
  .main__tabs {
    margin-top: 14px;
    max-width: 528px;
    width: 100%;
    padding: 0px 20px 0 20px;
  }
  .main__tabs form {
    margin-bottom: 16px;
  }

  @media only screen and (max-width: 767px) {
    .info__main {
      padding-top: 40px;
    }
  }
</style>
