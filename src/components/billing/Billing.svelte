<script>
  import Tabs from "./Tabs/Tabs.svelte";
  import AddressForm from './TabForms/AddressForm.svelte'
  import PaymentForm from './TabForms/PaymentForm.svelte'
  import { allowItemIndexBilling } from "../../stores/billingStore";
  import {successMessageState, decrementStep} from '../../stores/store'
  import ButtonLeft from '../buttons/ButtonLeft.svelte'
  import ButtonRight from '../buttons/ButtonRight.svelte'
  import Button_back_ico from "../../../public/images/Button_back_ico.svelte";
  let tabItems = [
    { name: "Address", component: AddressForm },
    { name: "Payment", component: PaymentForm },
  ];
  let activeItem = tabItems[0];
  let formButtonText = 'Next';
  let nextButtonState = false;

  function nextTab() {
    if ($allowItemIndexBilling < 3) {
      let index = tabItems.findIndex((object) => {
        return object.name === activeItem.name;
      });
      if (index === 0) {
          activeItem = tabItems[index + 1];
          $allowItemIndexBilling= $allowItemIndexBilling + 1;
          formButtonText = "Confirm";
        }
      } else if (index === 1) {

          nextButtonState = true;
        
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

  let prevStep = () => {
    decrementStep();
  };
  let nextStep = () => {
    $successMessageState = true;
  };
</script>

<div class="main__wrapper">
  <div class="info__main">
    <h2 class="main__head">
        Payment/Withdrawal <span class="green">Methode</span>
    </h2>
    <div class="main__tabs">
      <form>
        <Tabs {tabItems} />
        <svelte:component this={activeItem.component} />
      </form>
      <div class="buttons__wrapper">
        {#if $allowItemIndexBilling> 1}
          <button class="btn prev" on:click={prevTab}>
            <Button_back_ico />
            Back
          </button>
        {/if}
        <button class="btn next" on:click={nextTab}>{formButtonText}</button>
      </div>
    </div>
    
  </div>
  <div class="bottom__btns">
    <ButtonLeft on:click={prevStep} />
    <ButtonRight on:click={nextStep} />
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
  }
  .green {
    color: #5b9c42;
  }
  .info__main {
  padding-top: 64px;
    margin: 0 auto;
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
</style>
