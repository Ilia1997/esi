<script>
  import { fade } from "svelte/transition";
  let countries = [
    "USA",
    "Germany",
    "France",
    "Scandinavian",
    "Norway",
    "Sweden",
    "Denmark",
    "Finland",
  ];
  let currentCountry;
</script>

<div class="tab__wrapper" in:fade>
  <div class="tab__head">Address</div>
  <div class="tab__subhead">
    *Please make sure that all information matches your billling information
  </div>
  <div class="tab__form__fields">
    <div class="two__colums names">
      <input
        type="text"
        class="input-sv small"
        placeholder="First Name*"
        autocomplete
      />
      <input
        type="text"
        class="input-sv small"
        placeholder="Last Name*"
        autocomplete
      />
    </div>
    <input
      type="text"
      class="input-sv"
      placeholder="Street Number & Street*"
      autocomplete
    />
    <input type="text" class="input-sv" placeholder="City *" autocomplete />
    <div class="two__colums">
      <select
        class="input-sv select-sv small address-sel"
        id="cardMonth"
        bind:value={currentCountry}
      >
        <option value="" disabled selected>Country*</option>
        {#each countries as country}
          <option value={country}>
            {country}
          </option>
        {/each}
      </select>
      <input
        type="text"
        class="input-sv small"
        placeholder="Postal / Zip Code"
        autocomplete
      />
    </div>
  </div>
</div>

<style>
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
    width: 50%;
  }
  .input-sv::placeholder {
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
  }

  .input-sv.small:first-child {
    margin-right: 6px;
  }
</style>
