<script>
//  import CardsIcons from ".../CardsIcons.svelte";
  import Card_ico from "../../../../../esi/public/images/Card_ico.svelte";
  //import PayPal_ico from "../../../../../../public/images/PayPal_ico.svelte";
  import USbank_ico from "../../../../../esi/public/images/USbank_ico.svelte";
// import Cvc_ico from "../../../../../../public/images/Cvc_ico.svelte";
  import CardPayment from "../TabForms/paymentMethods/CardPayment.svelte";
import IbanPaymen from "./paymentMethods/IBANPaymen.svelte";
  let currentBillingMethod = 0;
  $: currentBillingMethod;
</script>

<div class="tab__wrapper">
  <div class="tab__head__items">
    <div class="card" on:click={()=>currentBillingMethod = 0} class:active={currentBillingMethod ===0}>
      <Card_ico class={currentBillingMethod ===0 ? 'active':''}/>
      <div class="text">Card</div>
    </div>
    <!-- <div class="paypal">
      <PayPal_ico />
      <div class="text">Paypal</div>
    </div> -->
    <div class="us__bank" on:click={()=>currentBillingMethod = 1} class:active={currentBillingMethod ===1}>
      <USbank_ico class={currentBillingMethod === 1 ? 'active':''}/>
      <div class="text">Bank Account</div>
    </div>
    <!-- <div class="more__payment"><span>...</span></div> -->
  </div>
  <div class="tab__payment__fields">
    {#if currentBillingMethod === 0}
    <CardPayment />
      {:else if currentBillingMethod ===1}
      <IbanPaymen />
    {/if}
  </div>
</div>

<style>
    :global(label) {
    display:inline-block;
    width: 100%;
    margin-bottom: 10px;
    text-align: left;
    color: #000;
  }

  .tab__payment__fields {
    display: flex;
    flex-direction: column;
    margin-top: 30px;
    margin-bottom: 24px;
  }

  .tab__head__items {
    display: flex;
    justify-content: center;
  }
  .tab__head__items > div {
    background: #ffffff;
    border: 1px solid #dddddd;
    border-radius: 10px;
    height: 86px;
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
  }
  .card {
    width: 132px;
    border: 1px solid #e4e4e4;;
    padding-left: 30px;
    color: #e4e4e4;;
    margin-right: 8px;
    cursor: pointer;
    transition: all ease .2s;
  }
  .card.active{
    border-color: #0085FF;
    color: #0085FF;
  }
  /* .card svg {
    margin-bottom: 5px;
  }

  .paypal {
    width: 138px;
    padding-left: 30px;
    margin-right: 8px;
  }
  .paypal svg {
    margin-bottom: 5px;
  } */
  .card:hover, .us__bank:hover{
    box-shadow: 0px 1px 15px -8px rgb(14 45 255 / 70%);
  }
  .us__bank {
    transition: all ease .2s;
    cursor: pointer;
    width: 170px;
    padding-left: 30px;
    margin-right: 8px;
  }
  .us__bank .text {
    color: #e4e4e4;
  }
  .us__bank.active{
    border-color: #0085FF;
    color: #0085FF;
  }
  .us__bank.active .text{
    color: #0085FF;
  }
  /* .us__bank svg {
    margin-bottom: 5px;
  }

  .more__payment {
    width: 56px;
    padding-left: 19px;
    margin-right: 0px;
  } */
</style>
