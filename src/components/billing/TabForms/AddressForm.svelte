<script>
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";
  import { getCountriesFromDB } from "../getListCountries";
  
  export let addressData;

  let countries = [];

  onMount(async () => {
    let data = await getCountriesFromDB();
    data.forEach((item) => {
      countries = [...countries, item.Name];
    });
  });
</script>

<div class="tab__wrapper" in:fade>
  <div class="tab__head">Address</div>
  <div class="tab__subhead">
    *Please make sure that all information matches your billling information
  </div>
  <div class="tab__form__fields">
    <div class="two__colums names">
      <div class="input-sv__wrapper">    <input
        type="text"
        class="input-sv small"
        placeholder="First Name*"
        autocomplete
        bind:value={$addressData.firstName}
        class:error={$addressData.err.firstName}
        on:focus={addressData.clear}
      />
      {#if $addressData.err.firstName}
      <p class="error__message last">{$addressData.err.firstName}</p>
    {/if}</div>
  
    <div class="input-sv__wrapper"> <input
        type="text"
        class="input-sv small"
        placeholder="Last Name*"
        autocomplete
        bind:value={$addressData.lastName}
        class:error={$addressData.err.lastName}
        on:focus={addressData.clear}
      />
      {#if $addressData.err.lastName}
      <p class="error__message last">{$addressData.err.lastName}</p>
    {/if}</div>
     
    </div>

    <input
      type="text"
      class="input-sv"
      placeholder="Street Number & Street*"
      autocomplete
      bind:value={$addressData.streetNumber}
      class:error={$addressData.err.streetNumber}
      on:focus={addressData.clear}
    />
    {#if $addressData.err.streetNumber}
      <p class="error__message last">{$addressData.err.streetNumber}</p>
    {/if}
    <input
      type="text"
      class="input-sv"
      placeholder="City *"
      autocomplete
      bind:value={$addressData.city}
      class:error={$addressData.err.city}
      on:focus={addressData.clear}
    />
    {#if $addressData.err.city}
      <p class="error__message last">{$addressData.err.city}</p>
    {/if}
    <div class="two__colums">
      <div class="input-sv__wrapper"> <select
        class="input-sv select-sv small address-sel"
        id="cardMonth"
        bind:value={$addressData.country}
        class:error={$addressData.err.country}
        on:focus={addressData.clear}
      >
        <option value="" disabled selected>Country*</option>
        {#each countries as country}
          <option value={country}>
            {country}
          </option>
        {/each}
      </select>
      {#if $addressData.err.country}
      <p class="error__message last">{$addressData.err.country}</p>
    {/if}</div>
     
    <div class="input-sv__wrapper"><input
        type="text"
        class="input-sv small"
        placeholder="Postal / Zip Code"
        autocomplete
        bind:value={$addressData.postal}
        class:error={$addressData.err.postal}
        on:focus={addressData.clear}
      />
      {#if $addressData.err.postal}
      <p class="error__message last">{$addressData.err.postal}</p>
    {/if}</div>
      
    </div>
  </div>
</div>


<style>
  .input-sv__wrapper{
    width: 100%;
  }
  .input-sv__wrapper:first-child {
    margin-right: 6px;
  }
  .select-sv.error {
    border: 1px solid #ff2e00;
    color: #ff2e00;
  }

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
  .address-sel {
    color: black;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
  }
  .two__colums {
    display: flex;
    width: 100%;
  }
  .two__colums.names {
    margin-bottom: 8px;
  }
  .input-sv.small {
    margin-bottom: 0;
    width: 100%;

  }
  .input-sv::placeholder {
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
  }

 
</style>
