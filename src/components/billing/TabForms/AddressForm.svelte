<script>
  import { fade, slide } from "svelte/transition";
  import { Datepicker } from "svelte-calendar";
  import dayjs from "dayjs";
  import DropdownIco from "../../../../public/images/Dropdown_ico.svelte";
  import { clickOutside } from "../../../functions/clickOutside";

  export let addressData;
  let activeGender = false;
  let gender;
  let dob;
  let country = 'USA'
  $: {
    dob;
    if ($dob?.hasChosen) {
      $addressData.dateOfBirdth = dayjs($dob.selected).format("YYYY-MM-DD");
    }
  }
  let handleClickOutside = () => {
    activeGender = false;
  };
  let setGender = (item) => {
    $addressData.gender = item;
    gender = item;
  };
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
      <div class="dropdown__wrapper" on:click={addressData.clear}>
        <div
          class="dropdown"
          class:activeGender
          class:error={$addressData.err.gender}
          on:click={() => (activeGender = !activeGender)}
          use:clickOutside
          on:click_outside={() => handleClickOutside()}
        >
          <DropdownIco />
          <div class="dropdown__item--current">{gender || "Gender*"}</div>
          <div class="dropdown__items">
            <div class="dropdown__item" on:click={() => setGender("Male")}>
              Male
            </div>
            <div class="dropdown__item" on:click={() => setGender("Female")}>
              Female
            </div>
          </div>
        </div>
      </div>
      {#if $addressData.err.gender}
        <p transition:slide|local class="error__message">
          {$addressData.err.gender}
        </p>
      {/if}
    </div>

    <div class="input-sv__wrapper">
      <Datepicker bind:store={dob} let:key let:send let:receive>
        <input
          class="input-sv small"
          style="max-width: 240px;"
          class:error={$addressData.err.dateOfBirdth}
          on:focus={addressData.clear}
          in:receive|local={{ key }}
          out:send|local={{ key }}
          placeholder={$dob?.hasChosen
            ? dayjs($dob.selected).format("MMM D, YYYY")
            : "Date Of Birth*"}
        />
      </Datepicker>
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
        placeholder="Street Number & Street*"
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
        class="input-sv"
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
    <div class="input-sv__wrapper">
      <input
        type="text"
        class="input-sv"
        placeholder="City *"
        autocomplete
        value={country}
        disabled
      />
     
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
        <p transition:slide|local class="error__message ">
          {$addressData.err.postal}
        </p>
      {/if}
    </div>
  </div>
</div>

<style>
  .dropdown__wrapper {
    position: relative;
    height: 70px;
  }
  .dropdown {
    position: absolute;
    width: 100%;
    padding: 23px 30px;
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
  .address-sel {
    color: var(--black-color);
  }

  .input-sv.small {
    margin-bottom: 0px;
    width: 100%;
  }
</style>
