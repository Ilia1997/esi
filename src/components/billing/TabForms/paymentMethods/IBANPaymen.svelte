<script>
  import { fade, slide } from "svelte/transition";
  import {
    IBANFormStatus,
    iBANAddedStatus,
    billingeErrorMessage
  } from "../../../../stores/billingStore";
  let iban = "";
  $: iban;
  let ibanErrorState = false;

  function checkIban() {
    let validIbanStatus = IBAN.isValid(iban);
    if (validIbanStatus) {
      ibanErrorState = false;
      $IBANFormStatus = true;
      $iBANAddedStatus = true;
    } else {
      ibanErrorState = true;
    }
  }
  function clearErrorForms(){
    ibanErrorState = false
    $billingeErrorMessage.status = false;
   }
</script>

{#if !$IBANFormStatus}
  <div class="iban_wrapper" in:fade>
    <label for="iban">IBAN</label>
    <div class="input__card">
      <input
        type="text"
        id="iban"
        bind:value={iban}
        class:error={ibanErrorState}
        on:focus={clearErrorForms}
        class="input-sv"
        placeholder="BA1234 1234 1234 1234"
        autocomplete
      />
    </div>
    {#if ibanErrorState}
      <div transition:slide|local class="error__message iban__error">IBAN is incorrect</div>
    {/if}

    <button class="btn-sv add__payment" on:click={checkIban}>ADD</button>
  </div>
{:else if $IBANFormStatus}
  <div in:fade class="success__text ">IBAN added succesfully</div>
{/if}

<style>
  .iban__error {
    text-align: left;
    padding: 5px;
  }
  .add__payment {
    width: 100%;
    justify-content: center;
    margin: 10px 0;
    background: rgba(0, 110, 255, 0.1);
    border: 1px solid var(--btn-color);
    color: var(--btn-color);
  }
  .btn-sv:hover {
    background: var(--btn-color-hover);
    color: var(--white-color);
  }
</style>
