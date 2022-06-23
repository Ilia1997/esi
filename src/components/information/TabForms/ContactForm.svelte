<script>
  import "intl-tel-input/build/css/intlTelInput.css";

  import intlTelInput from "intl-tel-input";
  import { afterUpdate } from "svelte";
  import { fade } from "svelte/transition";
  import { infoFormData } from "../../../stores/infoStore";
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
        initCounter = 1;
      }
      if (phoneData.length != 0) {
        $loginData.phone = phoneData;
      }
      iti.setNumber($loginData.phone);
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
      <p class="error__message">{$loginData.err.userName}</p>
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
      <p class="error__message">{$loginData.err.email}</p>
    {/if}
    <input
      type="tel"
      class="input-sv"
      bind:this={input}
      autocomplete
      bind:value={phoneData}
      class:error={$loginData.err.phone}
      on:focus={loginData.clear}
      oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');"
    />
    {#if $loginData.err.phone}
      <p class="error__message last">{$loginData.err.phone}</p>
    {/if}
  </div>
</div>

<style>
  .input-sv.error::placeholder {
    color: #ff2e00;
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
