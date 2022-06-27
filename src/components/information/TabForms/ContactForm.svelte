<script>
  import "intl-tel-input/build/css/intlTelInput.css";

  import intlTelInput from "intl-tel-input";
  import { afterUpdate } from "svelte";
  import { fade, slide } from "svelte/transition";
  import { infoFormData } from "../../../stores/infoStore";
  import { checkInputValue } from "../../../functions/checkInputValue";
  export let loginData;

  let input;
  let iti;
  let initCounter = 0;
  let number;
  let phoneData = "";
  $: number, phoneData;

  afterUpdate(() => {
    if (input) {
      if (initCounter < 1) {
        iti = intlTelInput(input, {
          separateDialCode: true,
          utilsScript:
            "https://intl-tel-input.com/node_modules/intl-tel-input/build/js/utils.js",
          onlyCountries: ["us", "de", "fr", "no", "se", "dk", "fi"],
          autoPlaceholder: " ",
        });
        initCounter = 1
      }
      if (phoneData.length != 0) {
        $loginData.phone = phoneData
      }
      if(input.value) {
        iti.setNumber($loginData.phone)
      } 
      else if(!input.value) {
        $loginData.phone = ""
        iti.setNumber("")
      } 
      $loginData.phoneCode = "%2B"+iti.selectedCountryData.dialCode
    }
  });
</script>

<div class="tab__wrapper" in:fade>
  <div class="tab__head">Contact</div>
  <div class="tab__subhead">Please put your legal Phone and Email</div>
  <div class="tab__form__fields">
    <input
      type="text"
      class="input-sv"
      placeholder="Username"
      autocomplete
      bind:value={$loginData.userName}
      class:error={$loginData.err.userName}
      on:focus={loginData.clear}
    />

    {#if $loginData.err.userName}
      <p 
        transition:slide|local
        class="error__message"
      >{$loginData.err.userName}</p>
    {/if}

    <input
      type="email"
      class="input-sv"
      placeholder="Email"
      autocomplete
      bind:value={$loginData.email}
      class:error={$loginData.err.email}
      on:focus={loginData.clear}
    />
    {#if $loginData.err.email}
      <p
        transition:slide|local
        class="error__message"
      >{$loginData.err.email}</p>
    {/if}
    <input
      type="tel"
      class="input-sv"
      maxlength="20"
      bind:this={input}
      autocomplete
      class:error={$loginData.err.phone}
      on:focus={loginData.clear}
      on:input={checkInputValue}
      bind:value={phoneData}
    />
    {#if $loginData.err.phone}
      <p 
        transition:slide|local
        class="error__message last"
      >{$loginData.err.phone}</p>
    {/if}
  </div>
</div>

<style>
  .input-sv.error::placeholder {
    color: var(--error-color);
  }
  .error__message {
    margin-bottom: 8px;
    text-align: left;
  }
  .error__message.last {
    margin-bottom: 8px;
    margin-top: 8px;

  }
</style>
