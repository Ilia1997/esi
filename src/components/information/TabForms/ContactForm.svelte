<script>
  import "intl-tel-input/build/css/intlTelInput.css";

  import intlTelInput from "intl-tel-input";
  import { afterUpdate } from "svelte";
  import {infoFormData,infoFormErrorStates, infoFormErrorMessage} from '../../../stores/infoStore'

  let input;
  let iti;
  let initCounter = 0;
  let number;

  let phoneData = '';
  $: number, phoneData;

  afterUpdate(() => {

    if (input) {
      if(initCounter < 1 ){
        iti = intlTelInput(input, {
        separateDialCode: true,
        utilsScript:
          "https://intl-tel-input.com/node_modules/intl-tel-input/build/js/utils.js",
        autoPlaceholder: "",
      });
      initCounter = 1;
      }
      if(phoneData.length != 0){
        $infoFormData.phone = phoneData 
      }
      iti.setNumber($infoFormData.phone);  

    }

  });

  function disableErrorState (type){
    $infoFormErrorStates[type] = false
    infoFormErrorMessage[type] = ''
  }
</script>

<div class="tab__wrapper">
  <div class="tab__head">Contact</div>
  <div class="tab__subhead">Please put your legal Phone and Email</div>
  <div class="tab__form__fields">
    <input type="text" class="input" placeholder="Username" autocomplete bind:value={$infoFormData.userName} class:error ={$infoFormErrorStates.userName} on:focus={()=>{ disableErrorState( 'userName') }}/>
    <input type="email" class="input" placeholder="Email" autocomplete bind:value={$infoFormData.email} class:error ={$infoFormErrorStates.email}  on:focus={()=>{disableErrorState( 'email')}}/>
    <input type="tel" class="input" bind:this={input} autocomplete bind:value={phoneData} class:error ={$infoFormErrorStates.phone} on:focus={()=>{disableErrorState( 'phone')}}/>
  </div>
</div>
<style>
  input.error{
    border: 1px solid #FF2E00;
    color: #FF2E00;
  }
  input.error::placeholder{
    color: #FF2E00;
  }
</style>
