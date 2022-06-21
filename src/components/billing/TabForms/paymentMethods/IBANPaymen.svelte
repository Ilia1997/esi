<script>
  import { fade } from "svelte/transition";
  import {IBANFormStatus} from '../../../../stores/billingStore'
  let iban = '';
  $: iban;
  let ibanErrorState= false;

  function checkIban(){
    let validIbanStatus = IBAN.isValid(iban);
    if(validIbanStatus){
     ibanErrorState = false
     $IBANFormStatus = true
    }else{
        ibanErrorState = true;
    }
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
      class="input-sv"
      placeholder="BA1234 1234 1234 1234"
      autocomplete
    />
  </div>
  {#if ibanErrorState}
     <div class="error__message">IBAN is incorrect</div>
  {/if}
 
  <button class="btn-sv add__payment" on:click={checkIban}>ADD</button>
</div>

{:else if $IBANFormStatus}
 <div in:fade class="success__text">IBAN added succesfully</div>
{/if}



<style>
  .add__payment {
    width: 100%;
    justify-content: center;
    margin: 10px 0;
    background: rgba(0, 110, 255, 0.1);
    border: 1px solid #006eff;
    color: #0085ff;
  }
  .btn-sv:hover {
    background: #006eff;
    color: #fff;
  }
</style>
