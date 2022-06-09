<script>
  import { contributionData } from "../../stores/contributionsStore";
  import { afterUpdate } from "svelte";
  import NextPaymentDay from "./NextPaymentDate.svelte";

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
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M4.29279 7.30529C4.48031 7.11782 4.73462 7.0125 4.99979 7.0125C5.26495 7.0125 5.51926 7.11782 5.70679 7.30529L11.9998 13.5983L18.2928 7.30529C18.385 7.20978 18.4954 7.1336 18.6174 7.08119C18.7394 7.02878 18.8706 7.00119 19.0034 7.00004C19.1362 6.99888 19.2678 7.02419 19.3907 7.07447C19.5136 7.12475 19.6253 7.199 19.7192 7.29289C19.8131 7.38679 19.8873 7.49844 19.9376 7.62133C19.9879 7.74423 20.0132 7.87591 20.012 8.00869C20.0109 8.14147 19.9833 8.27269 19.9309 8.39469C19.8785 8.5167 19.8023 8.62704 19.7068 8.71929L12.7068 15.7193C12.5193 15.9068 12.265 16.0121 11.9998 16.0121C11.7346 16.0121 11.4803 15.9068 11.2928 15.7193L4.29279 8.71929C4.10532 8.53176 4 8.27745 4 8.01229C4 7.74712 4.10532 7.49282 4.29279 7.30529Z"
              fill="#032B01"
            />
          </svg>
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
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M4.29279 7.30529C4.48031 7.11782 4.73462 7.0125 4.99979 7.0125C5.26495 7.0125 5.51926 7.11782 5.70679 7.30529L11.9998 13.5983L18.2928 7.30529C18.385 7.20978 18.4954 7.1336 18.6174 7.08119C18.7394 7.02878 18.8706 7.00119 19.0034 7.00004C19.1362 6.99888 19.2678 7.02419 19.3907 7.07447C19.5136 7.12475 19.6253 7.199 19.7192 7.29289C19.8131 7.38679 19.8873 7.49844 19.9376 7.62133C19.9879 7.74423 20.0132 7.87591 20.012 8.00869C20.0109 8.14147 19.9833 8.27269 19.9309 8.39469C19.8785 8.5167 19.8023 8.62704 19.7068 8.71929L12.7068 15.7193C12.5193 15.9068 12.265 16.0121 11.9998 16.0121C11.7346 16.0121 11.4803 15.9068 11.2928 15.7193L4.29279 8.71929C4.10532 8.53176 4 8.27745 4 8.01229C4 7.74712 4.10532 7.49282 4.29279 7.30529Z"
              fill="#032B01"
            />
          </svg>
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
  .amount input {
    appearance: none;
    width: 180px;
    height: 70px;
    background: #ffffff;
    border: 1px solid #dddddd;
    border-radius: 10px;
    padding: 12px 30px;
  }
  /* Chrome, Safari, Edge, Opera */
  .amount input::-webkit-outer-spin-button,
  .amount input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  .amount input[type="number"] {
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
  .dropdown svg {
    position: absolute;
    right: 15px;
    z-index: 3;
    top: 25px;
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
  .dropdown.activePeriod svg,
  .dropdown.activeCurrency svg {
    transform: rotate(180deg);
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
    .next__payment {
      display: none;
    }
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
    .amount input {
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
    .dropdown svg {
      top: 15px;
    }
    .amount input {
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
