<script>
  import { contributionData } from "../../stores/contributionsStore";
  import { afterUpdate } from "svelte";
  import NextPaymentDay from "./NextPaymentDate.svelte";
  import Dropdown_ico from "../../../public/images/Dropdown_ico.svelte";
import { clickOutside } from "../../functions/clickOutside";

  let activePeriod = false;
  let activeCurrency = false;
  let periods = ["Monthly", "Bi-Monthly"];
  let currencys = ["USD", "EUR", "CAD", "CHF", "GBP", "JPY"];

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let currentMonthIndex = new Date().getMonth();
  let currentDay = new Date().getDate();
  let paymentMounthIndex = currentMonthIndex + 1;

  $: $contributionData.nextPaymentMonth = months[paymentMounthIndex];

  let currencySymbols = {
    USD: "$",
    EUR: "€",
    CAD: "$",
    CHF: "₣",
    GBP: "£",
    JPY: "¥",
  };
  afterUpdate(() => {
    // if period bi-monthly set next payment day and payment mounth
    if ($contributionData.period === "Bi-Monthly") {
      if (currentDay < 15) {
        paymentMounthIndex = currentMonthIndex;
        $contributionData.nextPaymentDay = 15;
      } else if (currentDay >= 15) {
        paymentMounthIndex = currentMonthIndex + 1;
        $contributionData.nextPaymentDay = 1;
      }
    } else {
      paymentMounthIndex = currentMonthIndex + 1;
      $contributionData.nextPaymentDay = 1;
    }
  });
  function setPeriod(value) {
    // set data to our store
    $contributionData.period = value;
  }
  function showCurrency(value) {
    // set data to our store
    $contributionData.currency = value;
    $contributionData.currencySymbol = currencySymbols[value];
  }
  // click outside dropdown 
  function handleClickOutside(item) {
		if(item === 'activePeriod'){
      activePeriod = false
    }else if (item === 'activeCurrency'){
      activeCurrency = false
    }
	}
</script>

<div class="contribution__form">
  <form on:submit|preventDefault>
    <div class="period">
      <div class="label__text">Period*</div>
      <div class="dropdown__wrapper">
        <div
          class="dropdown"
          class:activePeriod
          on:click={() => (activePeriod = !activePeriod)}
          use:clickOutside on:click_outside={()=>handleClickOutside('activePeriod')}
        >
          <Dropdown_ico />
          <div class="dropdown__item--current">{$contributionData.period}</div>
          <div class="dropdown__items">
            {#each periods as period}
              <div class="dropdown__item" on:click={() => setPeriod(period)}>
                {period}
              </div>
            {/each}
          </div>
        </div>
      </div>
    </div>
    <div class="currency">
      <div class="label__text">Currency*</div>
      <div class="dropdown__wrapper">
        <div
          class="dropdown"
          class:activeCurrency
          on:click={() => (activeCurrency = !activeCurrency)}
          use:clickOutside on:click_outside={()=>handleClickOutside('activeCurrency')}
        >
          <Dropdown_ico />
          <div class="dropdown__item--current">
            {$contributionData.currency}
          </div>
          <div class="dropdown__items">
            {#each currencys as currency}
              <div
                class="dropdown__item"
                on:click={() => showCurrency(currency)}
              >
                {currency}
              </div>
            {/each}
          </div>
        </div>
      </div>
    </div>

    <div class="amount">
      <label class="label__text" for="amount">Amount*</label>
      <input
        type="number"
        class="input-sv"
        bind:value={$contributionData.amount}
        on:mousewheel={(e) => {
          e.target.blur();
        }}
        min="20"
        max="9999"
        maxlength="4"
        onKeyPress="if(this.value.length==4) return false;"
      />
    </div>

    <NextPaymentDay />
  </form>
  <div class="contribution__help--text">
    *Min. <span>$20</span> and <span> $9,999</span> Total contribution
  </div>
</div>

<style>
  .contribution__form form {
    display: flex;
    align-items: flex-end;
    margin-top: 14px;
  }
  .currency {
    margin: 0 20px;
  }
  .label__text {
    padding: 10px;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    color: #000000;
  }
  .amount {
    display: flex;
    flex-direction: column;
  }
  .amount .input-sv {
    appearance: none;
    width: 180px;
    height: 70px;
    background: #ffffff;
    border: 1px solid #dddddd;
    border-radius: 10px;
    padding: 12px 30px;
  }
  /* Chrome, Safari, Edge, Opera */
  .amount .input-sv::-webkit-outer-spin-button,
  .amount .input-sv::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  .amount .input-sv[type="number"] {
    -moz-appearance: textfield;
  }

  .contribution__help--text {
    font-weight: 400;
    font-size: 14px;
    line-height: 24px;
    color: #053900;
    margin-top: 24px;
  }

  .contribution__help--text span {
    font-weight: 700;
  }

  .dropdown__wrapper {
    position: relative;
    width: 180px;
    height: 70px;
  }
  .dropdown {
    position: absolute;
    width: 100%;
    padding: 23px 30px;
    cursor: pointer;
    background-color: #f5f5f5;
    border: 1px solid #dddddd;
    border-radius: 10px;
  }
  
  .dropdown__items {
    display: none;
  }
  .dropdown__item {
    padding: 12px 30px;
    transition: all ease-in 0.3s;
  }
  .dropdown__item:hover {
    background-color: #f5f5f5;
  }

  .dropdown.activePeriod,
  .dropdown.activeCurrency {
    background-color: #fff;
    padding: 11px 0;
  }
  
  .dropdown.activePeriod .dropdown__item--current,
  .dropdown.activeCurrency .dropdown__item--current {
    display: none;
  }
  .dropdown.activePeriod .dropdown__items,
  .dropdown.activeCurrency .dropdown__items {
    display: block;
  }

  @media only screen and (max-width: 991px) {
    /* .next__payment {
      display: none;
    } */
    .contribution__form form {
      flex-wrap: wrap;
    }
    .period,
    .currency {
      width: 49%;
      margin: 0;
    }
    .period {
      margin-right: 10px;
    }
    .dropdown__wrapper {
      width: 100%;
    }
    .amount {
      margin-top: 8px;
    }
    .amount,
    .amount .input-sv {
      width: 100%;
    }
    .contribution__help--text {
      margin-top: 0;
    }
  }
  @media only screen and (max-width: 768px) {
    .label__text {
      padding: 3px 10px;
    }
    .dropdown {
      padding: 16px;
    }
    .amount .input-sv {
      height: 50px;
      padding: 12px 15px;
    }
    .contribution__help--text {
      font-size: 10px;
      line-height: 24px;
    }
    .period,
    .currency {
      width: 48%;
    }
  }
</style>
