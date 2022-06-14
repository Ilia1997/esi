<script>
  import CardsIcons from "./CardsIcons.svelte";
  import Card_ico from "../../../../public/images/Card_ico.svelte";
  import PayPal_ico from "../../../../public/images/PayPal_ico.svelte";
  import USbank_ico from "../../../../public/images/USbank_ico.svelte";
  import Cvc_ico from "../../../../public/images/Cvc_ico.svelte";
</script>

<div class="tab__wrapper">
  <div class="tab__head__items">
    <div class="card">
      <Card_ico />
      <div class="text">Card</div>
    </div>
    <div class="paypal">
      <PayPal_ico />
      <div class="text">Paypal</div>
    </div>
    <div class="us__bank">
      <USbank_ico />
      <div class="text">US Bank</div>
    </div>
    <div class="more__payment"><span>...</span></div>
  </div>
  <div class="tab__payment__fields">
    <label for="country">Card number</label>
    <div class="input__card">
      <input
        type="text"
        class="input"
        placeholder="1234 1234 1234 1234"
        autocomplete
      />
      <div class="icon__wrpper"><CardsIcons /></div>
    </div>
    <div class="two__colums">
      <div class="column">
        <label for="input">Expiration</label>
        <input
          type="text"
          class="input "
          placeholder="MM / YY"
          autocomplete
        />
      </div>
      <div class="column right">
        <label for="input ">CVC</label>
        <div class="cvc__wrapp">
          <input
            type="password"
            class="input "
            placeholder="CVC"
            autocomplete
          />
          <div class="cvc__icon">
            <Cvc_ico />
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .tab__payment__fields {
    display: flex;
    flex-direction: column;
    margin-top: 30px;
    margin-bottom: 24px;
  }
  .two__colums {
    display: flex;
    width: 100%;
  }

  .tab__head__items {
    display: flex;
    justify-content: space-between;
  }
  .tab__head__items > div {
    background: #ffffff;
    border: 1px solid #dddddd;
    border-radius: 10px;
    height: 86px;
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
  }
  .card {
    width: 132px;
    border: 1px solid #0085ff;
    padding-left: 30px;
    color: #0085ff;
    margin-right: 8px;
  }
  .card svg {
    margin-bottom: 5px;
  }

  .paypal {
    width: 138px;
    padding-left: 30px;
    margin-right: 8px;
  }
  .paypal svg {
    margin-bottom: 5px;
  }
  .us__bank {
    width: 138px;
    padding-left: 30px;
    margin-right: 8px;
  }
  .us__bank .text {
    color: #e4e4e4;
  }
  .us__bank svg {
    margin-bottom: 5px;
  }

  .more__payment {
    width: 56px;
    padding-left: 19px;
    margin-right: 0px;
  }

  input::placeholder {
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    color: #b9b9b9;
    text-transform: uppercase;
  }
  label {
    margin-bottom: 10px;
    text-align: left;
    color: #000;
  }
  .input__card {
    position: relative;
  }
  .icon__wrpper {
    position: absolute;
    top: 25px;
    right: 30px;
  }
  .two__colums {
    margin-top: 12px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 22px;
  }
  .two__colums .column {
    display: flex;
    flex-direction: column;
  }
  .column.right label{
    padding-left: 15px;
}
.cvc__wrapp{
  position: relative;
}
.cvc__icon{
  position: absolute;
  top: 27px;
  right: 30px;
}


</style>
