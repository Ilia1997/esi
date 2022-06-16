<script>
  import {
    infoFormData,
    infoFormErrorStates,
    infoFormErrorMessage,
  } from "../../../stores/infoStore";
  import EyePW_ico from "../../../../public/images/EyePW_ico.svelte";
  import { fade } from "svelte/transition";
  export let passwordData, confirm_match;
  
  let confirmPassValue = $infoFormData.confirm
  let passValue = $infoFormData.password

  let onInputConfirmPass = (event) => {
    $passwordData.password = event.target.value;
 //   console.log($passwordData.password);
  };
  let onInputPass = (event) => {
    $passwordData.confirm = event.target.value;
//    console.log($passwordData.confirm);
  };

  export const validatePasswordType = (event) => {
    let input = event.target.parentElement.lastElementChild;
    let type = input.getAttribute("type");
    if (type === "password") {
      input.setAttribute("type", "text");
    } else {
      input.setAttribute("type", "password");
    }
  };

  function disableErrorState(type) {
    $infoFormErrorStates[type] = false;
    $infoFormErrorMessage[type] = "";
  }
</script>

<div class="tab__wrapper" in:fade>
  <div class="tab__head">Password</div>
  <div class="tab__subhead">Please put your Password</div>
  <div class="tab__form__fields">
    <div class="input__wrapper">
      <EyePW_ico on:click={validatePasswordType} />
      <input
        type="password"
        class="input"
        placeholder="Password"
        autocomplete
        value={passValue}
        class:error={$passwordData.err.password}
        class:success={$confirm_match}
        on:focus={passwordData.clear}
        on:input={onInputPass}
      />
    </div>
    <div class="info__password__message">
      At a least 8 characters, 1 capital letter, 1 number, 1 special symbol
    </div>
    <div class="input__wrapper">
      <EyePW_ico on:click={validatePasswordType} />
      <input
        type="password"
        class="input"
        placeholder="Confirm Password"
        autocomplete
        value={confirmPassValue}
        class:error={$passwordData.err.password}
        class:success={$confirm_match}
        on:focus={passwordData.clear}
        on:input={onInputConfirmPass}
      />
    </div>
  </div>
</div>

<style>
  input.error {
    border: 1px solid #ff2e00;
    color: #ff2e00;
  }
  input.success {
    border: 1px solid #5b9c42;
    box-shadow: -2px 1px 20px #5b9c422b;
  }
  .info__password__message {
    font-size: 12px;
    line-height: 24px;
    color: #5b9c42;
    margin-bottom: 10px;
    padding-left: 30px;
    text-align: left;
  }
  input.error::placeholder {
    color: #ff2e00;
  }
  .input__wrapper {
    position: relative;
  }
  .input__wrapper:first-child {
    margin-bottom: 10px;
  }
</style>
