<div class="tab__wrapper">
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
      <input
        type="text"
        class="input-sv small"
        placeholder="Country"
        autocomplete
      />
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
  .input-sv.small:first-child {
    margin-right: 6px;
  }
</style>
