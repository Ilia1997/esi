<script>
  import { onMount } from "svelte";
  import { fade, slide } from "svelte/transition";
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
      <div class="input-sv__wrapper">
        <input
          type="text"
          class="input-sv small"
          placeholder="First Name*"
          autocomplete
          bind:value={$addressData.firstName}
          class:error={$addressData.err.firstName}
          on:focus={addressData.clear}
        />
        {#if $addressData.err.firstName}
          <p transition:slide|local class="error__message ">{$addressData.err.firstName}</p>
        {/if}
      </div>

      <div class="input-sv__wrapper">
        <input
          type="text"
          class="input-sv small"
          placeholder="Last Name*"
          autocomplete
          bind:value={$addressData.lastName}
          class:error={$addressData.err.lastName}
          on:focus={addressData.clear}
        />
        {#if $addressData.err.lastName}
          <p transition:slide|local class="error__message ">{$addressData.err.lastName}</p>
        {/if}
      </div>
    </div>

    <input
      type="text"
      class="input-sv street"
      placeholder="Street Number & Street*"
      autocomplete
      bind:value={$addressData.streetNumber}
      class:error={$addressData.err.streetNumber}
      on:focus={addressData.clear}
    />
    {#if $addressData.err.streetNumber}
      <p transition:slide|local class="error__message ">{$addressData.err.streetNumber}</p>
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
      <p transition:slide|local class="error__message ">{$addressData.err.city}</p>
    {/if}
    <div class="two__colums">
      <div class="input-sv__wrapper">
        <select
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
          <p transition:slide|local class="error__message ">{$addressData.err.country}</p>
        {/if}
      </div>

      <div class="input-sv__wrapper">
        <input
          type="text"
          class="input-sv small"
          placeholder="Postal / Zip Code"
          autocomplete
          bind:value={$addressData.postal}
          class:error={$addressData.err.postal}
          on:focus={addressData.clear}
        />
        {#if $addressData.err.postal}
          <p transition:slide|local class="error__message ">{$addressData.err.postal}</p>
        {/if}
      </div>
    </div>
  </div>
</div>

<style>
  .input-sv__wrapper {
    width: 100%;
  }
  .input-sv__wrapper:first-child {
    margin-right: 6px;
  }
  .error__message {
    margin-bottom: 8px;
    margin-top: 0px;
    text-align: left;
  }
  .address-sel {
    color: var(--black-color);
    line-height: var(--text-normal-height);
  }
  .two__colums {
    display: flex;
    width: 100%;
  }
  .input-sv.small {
    margin-bottom: 8px;
    width: 100%;
  }
</style>
