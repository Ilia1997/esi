<script>
  import { fade, slide } from "svelte/transition";
  import DropdownIco from "../../../../public/images/Dropdown_ico.svelte";
  import { clickOutside } from "../../../functions/clickOutside";
  import { contributionData } from "../../../stores/contributionsStore";
  import { onMount } from "svelte";
  import flatpickr from "flatpickr";
  import Svelecte from "svelecte";
  import Dropdown from "./Dropdown.svelte";
  import { getCountryStateList } from "./getListState";

  export let addressData;
  let activeGender = false;
  let gender = null;
  let dob;

  let stateValue = "";
  let datePicker;
  $: datePicker;
  $: {
    $addressData.state = stateValue ? stateValue.name : "";
  }

  let list = [];

  let setGender = (item) => {
    $addressData.gender = item;
    gender = item;
  };
  onMount(async () => {
    const fp = flatpickr(datePicker, {
      onChange: function (selectedDates, dateStr, instance) {
        $addressData.dateOfBirdth = dateStr;
      },
      defaultDate: $addressData.dateOfBirdth || null,
    });
    fp.jumpToDate(new Date(2004, 0, 1));

    // get states 5235134
    // $contributionData.country.countryId
    const res = await getCountryStateList($contributionData.country.countryId);
    if (res.status) {
      res.data.forEach((item, index) => {
        list = [...list, { id: index, name: item }];
      });
    }
  });
</script>

<div class="tab__wrapper" in:fade>
  <div class="tab__head">Address</div>
  <div class="tab__subhead">
    *Please make sure that all information matches your billling information
  </div>
  <div class="input_grid">
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
        <p transition:slide|local class="error__message ">
          {$addressData.err.firstName}
        </p>
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
        <p transition:slide|local class="error__message ">
          {$addressData.err.lastName}
        </p>
      {/if}
    </div>
    <div class="input-sv__wrapper">
      <Dropdown
        errorMessageState={$addressData.err.gender}
        itemsData={["Male", "Female"]}
        on:click={addressData.clear}
        handleClickByItem={() => {
          setGender(gender);
        }}
        bind:activeItem={gender}
      />
      {#if $addressData.err.gender}
        <p transition:slide|local class="error__message">
          {$addressData.err.gender}
        </p>
      {/if}
    </div>

    <div class="input-sv__wrapper">
      <div
        class="input-sv small date-input"
        class:error={$addressData.err.dateOfBirdth}
      >
        <input
          class="date"
          bind:this={datePicker}
          on:focus={addressData.clear}
          placeholder={$addressData.dateOfBirdth || "Date Of Birth*"}
        />
      </div>

      {#if $addressData.err.dateOfBirdth}
        <p transition:slide|local class="error__message ">
          {$addressData.err.dateOfBirdth}
        </p>
      {/if}
    </div>
    <div class="input-sv__wrapper">
      <input
        type="text"
        class="input-sv small street"
        placeholder="St. Number & Street*"
        autocomplete
        bind:value={$addressData.streetNumber}
        class:error={$addressData.err.streetNumber}
        on:focus={addressData.clear}
      />

      {#if $addressData.err.streetNumber}
        <p transition:slide|local class="error__message ">
          {$addressData.err.streetNumber}
        </p>
      {/if}
    </div>
    <div class="input-sv__wrapper">
      <input
        type="text"
        class="input-sv small"
        placeholder="City *"
        autocomplete
        bind:value={$addressData.city}
        class:error={$addressData.err.city}
        on:focus={addressData.clear}
      />
      {#if $addressData.err.city}
        <p transition:slide|local class="error__message ">
          {$addressData.err.city}
        </p>
      {/if}
    </div>
    <div class="input-sv__wrapper ">
      <div class:svelecte_error={$addressData.err.state}>
        <Svelecte
          options={list}
          bind:readSelection={stateValue}
          on:change={addressData.clear}
          placeholder="State*"
        />
      </div>
      {#if $addressData.err.state}
        <p transition:slide|local class="error__message ">
          {$addressData.err.state}
        </p>
      {/if}
    </div>

    <div class="input-sv__wrapper">
      <input
        type="text"
        class="input-sv small"
        placeholder="Postal / Zip Code*"
        autocomplete
        bind:value={$addressData.postal}
        class:error={$addressData.err.postal}
        on:focus={addressData.clear}
      />
      {#if $addressData.err.postal}
        <p transition:slide|local class="error__message ">
          {$addressData.err.postal}
        </p>
      {/if}
    </div>
    <div class="input-sv__wrapper country_wrapper">
      <input
        type="text"
        class="input-sv"
        placeholder="Country *"
        autocomplete
        value={$contributionData.country.countryName}
        disabled
      />
    </div>
  </div>
</div>

<style>
  :global(.svelecte_error .sv-control) {
    border: 1px solid var(--error-color) !important;
  }
  :global(.sv-control) {
    height: 65px;
    border: 1px solid var(--border-color) !important;
    border-radius: 10px !important;
  }
  :global(.sv-content) {
    padding-left: 30px !important;
  }
  :global(.indicator) {
    display: none !important;
  }

  :global(.sv-dropdown) {
    z-index: 99 !important;
  }
  :global(.sv-content input.inputBox::placeholder) {
    color: #000 !important;
    font-family: "Poppins";
    line-height: var(--text-line-height);
    font-weight: var(--font-weight-normal);
  }
  :global(.svelecte_error .sv-control input.inputBox::placeholder) {
    color: var(--error-color) !important;
  }
  :global(.sv-control.is-active) {
    outline: none !important;
    border: 1px solid #ccc !important;
  }

  :global(.contents .container) {
    padding: 0;
    max-width: 100% !important;
    margin: 0;
  }
  .date-input {
    position: relative;
    padding: 0;
  }
  .date-input.error input::placeholder {
    color: var(--error-color);
  }
  input.date {
    width: 100%;
    appearance: none;
    -webkit-appearance: none;
    border: none;
    background: transparent;
    position: absolute;
    width: 100%;
    height: 100%;
    padding: 22px 30px;
    top: 0%;
    left: 0%;
  }
  input.date::placeholder {
    color: #000;
  }
  input[type="date"] {
    text-align: left;
  }
  input.date:before {
    color: #000;
    content: attr(placeholder) !important;
    display: block;
    padding: 23px 30px;
  }

  /* input[type="date"]:before {
  color: #000;
  content: attr(placeholder) !important;
  margin: 1rem;
} */

  .dropdown__wrapper {
    position: relative;
    height: 65px;
  }
  .dropdown {
    position: absolute;
    width: 100%;
    height: 100%;
    padding: 18px 30px;
    cursor: pointer;
    border: 1px solid var(--border-color);
    border-radius: 10px;
    z-index: 2;
    text-align: left;
    color: #032b01;
  }
  .dropdown.error {
    border: 1px solid var(--error-color);
  }
  .dropdown__item--current {
    color: #000;
  }
  .dropdown.error .dropdown__item--current {
    color: red;
  }

  .dropdown__items {
    display: none;
  }
  .dropdown__item {
    padding: 12px 30px;
    transition: all ease-in 0.3s;
  }
  .dropdown__item:hover {
    background-color: var(--grey-color-lightest);
  }

  .dropdown.activeGender {
    background-color: var(--white-color);
    padding: 11px 0;
  }

  .dropdown.activeGender .dropdown__item--current {
    display: none;
  }
  .dropdown.activeGender .dropdown__items {
    display: block;
  }

  .input_grid {
    display: grid;
    grid-template-columns: 240px 240px;
    grid-gap: 8px;
    margin: 24px 0;
  }
  .country_wrapper {
    grid-column-start: 1;
    grid-column-end: 3;
  }
  .country_wrapper input {
    background: #e4e4e4;
  }
  .input-sv__wrapper {
    width: 100%;
  }
  .input-sv__wrapper:first-child {
    margin-right: 0px;
  }
  .error__message {
    margin-bottom: 8px;
    margin-top: 0px;
    text-align: left;
  }

  .input-sv.small {
    margin-bottom: 0px;
    width: 100%;
  }
  @media only screen and (max-width: 991px) {
    input.date:before {
      padding-left: 0;
      min-width: 120px;
    }
  }
  @media only screen and (max-width: 768px) {
    .input_grid {
      grid-template-columns: 1fr;
    }
    .country_wrapper {
      grid-column-start: 1;
      grid-column-end: 2;
    }
  }
  @media only screen and (max-width: 480px) {
    .dropdown__wrapper {
      height: 50px;
    }
    .dropdown {
      padding: 16px;
    }
    .dropdown__item--current,
    .dropdown__item {
      font-size: var(--text-size-smaller);
      line-height: var(--small-text-line-height);
    }
    input.date:before,
    input.date::placeholder {
      font-size: var(--text-size-smaller);
      padding: 0;
    }
    input.date:before {
      padding-right: 16px;
    }

    input.date {
      padding: 1rem;
      font-size: var(--text-size-smaller);
    }
    :global(.sv-control) {
      height: 50px;
      border: 1px solid var(--border-color) !important;
      border-radius: 10px !important;
    }
    :global(.sv-content) {
      padding-left: 16px !important;
    }
    :global(.sv-content input.inputBox::placeholder) {
      color: #000 !important;
      font-family: "Poppins";
      font-size: var(--text-size-smaller);
      line-height: var(--small-text-line-height);
    }
  }
</style>
