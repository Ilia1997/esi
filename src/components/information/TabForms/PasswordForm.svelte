<script>
  import { infoFormData, infoFormErrorStates,infoFormErrorMessage } from "../../../stores/infoStore";
  import EyePW_ico from "../../../../public/images/EyePW_ico.svelte";
  import {fade} from 'svelte/transition'

  let onInputConfirmPass = (event) => {
    $infoFormData.password = event.target.value;
    console.log($infoFormData.password)
  };
  let onInputPass = (event) => {
    $infoFormData.confirmPassword = event.target.value;
    console.log( $infoFormData.confirmPassword )
  };

  export const validatePasswordType = (event) => {
    let input = event.target.parentElement.lastElementChild;
    let type = input.getAttribute('type');
    if (type === "password") {
      input.setAttribute('type', 'text');
    } else {
      input.setAttribute('type', 'password');
    }
  }

  function disableErrorState (type){
    $infoFormErrorStates[type] = false
    $infoFormErrorMessage[type] = ''
  }
</script>

<div class="tab__wrapper"  in:fade>
  <div class="tab__head">Password</div>
  <div class="tab__subhead">Please put your Password</div>
  <div class="tab__form__fields">
    <div class="input__wrapper">
      <EyePW_ico 
        on:click={validatePasswordType}
      />
      <input
        type="password"
        class="input"
        placeholder="Password"
        autocomplete
        class:error ={$infoFormErrorStates.password} 
        on:focus={()=>{ disableErrorState( 'password') }}
        on:input={onInputPass}
      />
    </div>
    <div class="input__wrapper">
      <EyePW_ico 
        on:click={validatePasswordType}
      />
      <input
        type="password"
        class="input"
        placeholder="Confirm Password"
        autocomplete
        class:error = {$infoFormErrorStates.confirmPassword} 
        on:focus={()=>{ disableErrorState( 'confirmPassword') }}
        on:input={onInputConfirmPass}
      />
    </div>
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
  .input__wrapper {
    position: relative;
  }
  .input__wrapper:first-child {
    margin-bottom: 10px;
  }
</style>
