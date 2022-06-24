<script>
  import CardsIcons from "../CardsIcons.svelte";
  import Cvc_ico from "../../../../../public/images/Cvc_ico.svelte";
  import { fade, slide } from "svelte/transition";
  import { aoviSvelte } from "aovi-svelte";
  import { afterUpdate } from "svelte";
  import {
    cardFormStatus,
    cardAddedStatus,
    billingeErrorMessage,
  } from "../../../../stores/billingStore";
  let cardName = "";
  let cardNumber = "";
  let cardMonth = "";
  let cardYear = "";
  let cardCvv = "";
  let minCardYear = new Date().getFullYear();
  let amexCardMask = "#### ###### #####";
  let otherCardMask = "#### #### #### ####";
  let cardType;
  let focusElementStyle = null;
  let isInputFocused = false;
  let cardNumberMask;

  $: cardMonth = cardMonth < minCardMonth ? "" : cardMonth;
  $: minCardMonth = cardYear === minCardYear ? new Date().getMonth() + 1 : 1;

  $: {
    if (cardNumber.match(new RegExp("^(34|37)")) != null) cardType = "amex";
    else if (cardNumber.match(new RegExp("^5[1-5]")) != null)
      cardType = "mastercard";
    else if (cardNumber.match(new RegExp("^6011")) != null)
      cardType = "discover";
    else cardType = "visa"; // default type

    cardNumberMask = cardType === "amex" ? amexCardMask : otherCardMask;

    // Credit card input masking

    for (let index = 0; index < cardNumber.length; index++) {
      if (cardNumberMask[index] == " " && cardNumber[index] !== " ")
        cardNumber =
          cardNumber.substr(0, index) +
          " " +
          cardNumber.substr(index, cardNumber.length - index);
    }
    if (cardNumber.substr("-1") == " ")
      cardNumber = cardNumber.substr(0, cardNumber.length - 1);
    cardNumber = cardNumber
      .substr(0, cardNumberMask.length)
      .replace(/[^0-9 ]/g, "");
  }

  // function focusInput() {
  //   isInputFocused = true;
  // }
  // function blurInput() {
  //   isInputFocused = false;
  // }

  const cardData = aoviSvelte({
    card: "",
    holders: "",
    expirationMonth: "",
    expirationYear: "",
    cvc: "",
  });
  afterUpdate(() => {
    $cardData.card = cardNumber;
    $cardData.holders = cardName;
    $cardData.expirationMonth = cardMonth;
    $cardData.expirationYear = cardYear;
    $cardData.cvc = cardCvv;
  });

  function checkRequiredCardFields() {
    cardData.aovi // use Aovi validators
      .check("card")
      .minLength(15, "Card should be at least 15 symbols length")
      .required()
      .check("holders")
      .required()
      .check("expirationMonth")
      .required("Expiration Month is required")
      .check("expirationYear")
      .required("Expiration Year is required")
      .check("cvc")
      .required()
      .match(/^\d+$/, "CVC should contain only numbers").end; // you must finish validation with '.end' operator

    if ($cardData.valid) {
      $cardFormStatus = true;
      $cardAddedStatus = true;
    }
  }

  function clearErrorForms() {
    cardData.clear();
    $billingeErrorMessage.status = false;
  }
</script>

{#if !$cardFormStatus}
  <div class="cart__payment" in:fade>
    <label for="country">Card number</label>
    <div class="input__card">
      <input
        type="text"
        class="input-sv"
        placeholder="1234 1234 1234 1234"
        autocomplete
        bind:value={cardNumber}
        class:error={$cardData.err.card}
        on:focus={clearErrorForms}
      />
      <div class="icon__wrpper"><CardsIcons /></div>
    </div>
    <label for="full_name">Card Holders</label>
    <div class="input__card">
      <input
        type="text"
        id="full_name"
        class="input-sv"
        placeholder="Full Name"
        autocomplete
        bind:value={cardName}
        class:error={$cardData.err.holders}
        on:focus={clearErrorForms}
      />
    </div>
    <div class="three__colums">
      <div class="column">
        <label for="cardMonth" class="card-input__label">Expiration</label>
        <div class="card-form__group">
          <select
            class="input-sv select-sv"
            id="cardMonth"
            bind:value={cardMonth}
            class:error={$cardData.err.expirationMonth}
            on:focus={clearErrorForms}
          >
            <option value="" disabled selected>Month</option>
            {#each Array(12) as _, n}
              <option
                value={n + 1 < 10 ? "0" + (n + 1) : n + 1}
                disabled={n + 1 < minCardMonth}
              >
                {n + 1 < 10 ? "0" + (n + 1) : n + 1}
              </option>
            {/each}
          </select>
          <select
            class="input-sv select-sv"
            id="cardYear"
            bind:value={cardYear}
            class:error={$cardData.err.expirationYear}
            on:focus={clearErrorForms}
          >
            <option value="" disabled selected>Year</option>
            {#each Array(12) as _, n}
              <option value={n + minCardYear}>
                {n + minCardYear}
              </option>
            {/each}
          </select>
        </div>
      </div>
      <div class="column right">
        <label for="input ">CVC</label>
        <div class="cvc__wrapp">
          <input
            type="password"
            bind:value={cardCvv}
            class:error={$cardData.err.cvc}
            on:focus={clearErrorForms}
            class="input-sv"
            placeholder="CVC"
            autocomplete
            maxlength="4"
          />
          <div class="cvc__icon">
            <Cvc_ico />
          </div>
        </div>
      </div>
    </div>
    {#each $cardData.err.toArray() as error}
      <p transition:slide|local class="error__message">{error}</p>
    {/each}
    <button class="btn-sv add__payment" on:click={checkRequiredCardFields}
      >ADD</button
    >
  </div>
{:else}
  <div in:fade class="success__text">Card added succesfully</div>
{/if}

<style>
  select option:disabled {
    color: var(--border-color);
  }
  .add__payment {
    width: 100%;
    justify-content: center;
    margin: 10px 0;
    background: rgba(0, 110, 255, 0.1);
    border: 1px solid var(--btn-color);
    color: var(--btn-color);
  }
  .btn-sv:hover {
    background: var(--btn-color-hover);
    color: var(--white-color);
  }
  #cardMonth {
    margin-right: 6px;
  }
  .card-form__group {
    display: flex;
  }
  .cart__payment {
    text-align: left;
  }
  .three__colums {
    display: flex;
    width: 100%;
  }

  .input-sv::placeholder {
    color: var(--grey-color_3);
  }

  .input__card {
    position: relative;
    margin-bottom: 12px;
  }
  .icon__wrpper {
    position: absolute;
    top: 25px;
    right: 30px;
  }
  .three__colums {
    margin-top: 12px;
    display: grid;
    grid-template-columns: 1fr 170px;
    grid-column-gap: 6px;
  }
  .three__colums .column {
    display: flex;
    flex-direction: column;
  }
  .column.right label {
    padding-left: 15px;
  }
  .cvc__wrapp {
    position: relative;
  }
  .cvc__icon {
    position: absolute;
    top: 20px;
    right: 30px;
  }
</style>
