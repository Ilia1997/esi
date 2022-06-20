<script>
  import CardsIcons from "./CardsIcons.svelte";
  import Cvc_ico from "../../../../public/images/Cvc_ico.svelte";
  let cardName = "";
  let cardNumber = "";
  let cardMonth = "";
  let cardYear = "";
  let cardCvv = "";
  let minCardYear = new Date().getFullYear();
  let amexCardMask = "#### ###### #####";
  let otherCardMask = "#### #### #### ####";
  let cardType;
  let isCardFlipped = false;
  let focusElementStyle = null;
  let isInputFocused = false;
  let refs = {};
  let cardNumberMask;

  $: cardMonth = cardMonth < minCardMonth ? "" : cardMonth;
  $: minCardMonth = cardYear === minCardYear ? new Date().getMonth() + 1 : 1;

  $: {
    if (cardNumber.match(new RegExp("^(34|37)")) != null) cardType = "amex";
	else if (cardNumber.match(new RegExp("^5[1-5]")) != null) cardType = "mastercard";
	else if (cardNumber.match(new RegExp("^6011")) != null) cardType = "discover";
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


  function focusInput(e) {
	isInputFocused = true;
//  let targetRef = e.target.dataset.ref;
//	let target = refs[targetRef];
	// focusElementStyle = `opacity: 1;width: ${target.offsetWidth}px;height: ${target.offsetHeight}px;transform: translateX(${target.offsetLeft}px) translateY(${target.offsetTop}px)`
}
function blurInput() {
	// setTimeout(() => {
	// 	if (!isInputFocused) {
	// 		focusElementStyle = null;
	// 	}
	// }, 300);
	isInputFocused = false;
}
</script>

<div class="cart__payment">
  <label for="country">Card number</label>
  <div class="input__card">
    <input
      type="text"
      class="input-sv"
      placeholder="1234 1234 1234 1234"
      autocomplete
      bind:value={cardNumber} on:focus={focusInput} on:blur={blurInput} 
    />
    <div class="icon__wrpper"><CardsIcons /></div>
  </div>
  <div class="two__colums">
    <div class="column">
      <label for="input">Expiration</label>
      <input type="text" class="input-sv " placeholder="MM / YY" autocomplete />
    </div>
    <div class="column right">
      <label for="input ">CVC</label>
      <div class="cvc__wrapp">
        <input type="password" class="input-sv " placeholder="CVC" autocomplete />
        <div class="cvc__icon">
          <Cvc_ico />
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .two__colums {
    display: flex;
    width: 100%;
  }

  .input-sv::placeholder {
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
  .column.right label {
    padding-left: 15px;
  }
  .cvc__wrapp {
    position: relative;
  }
  .cvc__icon {
    position: absolute;
    top: 27px;
    right: 30px;
  }
</style>
