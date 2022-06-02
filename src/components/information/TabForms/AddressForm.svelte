<div class="tab__wrapper">
  <div class="tab__head">Address</div>
  <div class="tab__subhead">Please put your legal Address</div>
  <div class="tab__form__fields">
    <input type="text" class="input" placeholder="Country" autocomplete/>
    <input type="text" class="input" placeholder="Town/City" autocomplete/>
    <input type="text" class="input" placeholder="Address" autocomplete/>
    <div class="two__colums">
      <input type="text" class="input small" placeholder="State" autocomplete/>
      <input type="text" class="input small" placeholder="Postal / Zip Code" autocomplete/>
    </div>
  </div>
</div>

<style>
  .two__colums {
    display: flex;
    width: 100%;
  }
  .input.small {
    margin-bottom: 0;
    width: 50%;
  }
  .input.small:first-child{
    margin-right: 6px;
  }
</style>
