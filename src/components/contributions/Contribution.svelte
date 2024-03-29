<script>
  import Form from "./Form.svelte";
  import {
    incrementStep,
    headSteps,
    confirmPopUpState,
  } from "../../stores/store";
  import {
    contributionData,
    amountErrorMessageState,
  } from "../../stores/contributionsStore";
  import { afterUpdate, beforeUpdate, onDestroy } from "svelte";
  import { scrollToTop } from "../../functions/scrollToTop";
  import { priceConvertation } from "../../functions/priceConvertation";
  import Rules from "./Rules.svelte";
  import ButtonRight from "../buttons/ButtonRight.svelte";
  let changeCounter = 0;

  function changeStep() {
    if (validateAmount()) {
      const reviewState = localStorage.getItem("review");
      if (reviewState === "CHANGING_1") {
        localStorage.removeItem("review");
        scrollToTop();
        $confirmPopUpState = true;
        return;
      }
      $headSteps.secondStep = true;
      if (changeCounter === 0) {
        incrementStep();
        changeCounter += 1;
        scrollToTop();
      }
    }
  }

  let data;
  let input;
  const unsubscribe = contributionData.subscribe((value) => {
    data = value;
  });
  function validateAmount() {
    if (data.amount < 20) {
      $amountErrorMessageState = true;
      scrollToTop();
    } else {
      return true;
    }
  }

  let moVal = data.monthlyValue,
    yrVal = 0,
    fiveYrVal = 0;

  beforeUpdate(() => {
    // if period monthly - set current value
    if (data.period.periodName === "Monthly") {
      moVal = data.amount;
      $contributionData.monthlyValue = moVal;
      // if bi-monthly - divide value into two
    } else if (data.period.periodName === "Bi-Monthly") {
      moVal = data.amount * 2;
      $contributionData.monthlyValue = moVal;
    }
    yrVal = moVal * 12;
    fiveYrVal = yrVal * 5;
  });
  afterUpdate(() => {
    if (data.amount >= 20 && data.amount < 9999) {
      $amountErrorMessageState = false;
    }
  });

  onDestroy(unsubscribe);
</script>

<div class="contribution__main">
  <div class="column-left">
    <div>
      <div class="contribution__head">
        <h2 class="h2-sv">
          Choose your <span class="green">Contribution</span>
        </h2>
        <Form bind:input />
      </div>
      <div class="rules">
        <div class="rules__top">
          <div class="rules__head">Projection & Rules</div>
          <div class="rules__items">
            <div class="rules__item">
              <div class="rules_text contr">
                Your <span>Green</span>
                Contribution
              </div>
              <div class="rules__val__wrapper">
                <div class="rules__val">
                  {data.country?.currency?.symbol || "$"}{moVal
                    ? priceConvertation(moVal)
                    : 0}<span>/mo</span>
                </div>
              </div>
            </div>
            <div class="rules__item center">
              <div class="rules_text conver">
                Annual <span>Green</span> Conversion
              </div>
              <div class="rules__val__wrapper">
                <div class="rules__val">
                  {data.country?.currency?.symbol || "$"}{priceConvertation(
                    yrVal
                  )}<span>/yr</span>
                </div>
              </div>
            </div>
            <div class="rules__item">
              <div class="rules_text project">
                <span>Green</span>
                Saving Projection
              </div>
              <div class="rules__val__wrapper">
                <div class="rules__val">
                  {data.country?.currency?.symbol || "$"}{priceConvertation(
                    fiveYrVal
                  )}<span>/5yrs</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Rules />
      </div>
      <div class="relative__wrapper">
        <div class="step__footer">
          <ButtonRight on:click={changeStep} />
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .relative__wrapper {
    position: relative;
    margin: 56px 0 0 0;
  }
  .green {
    color: var(--color-dark-st1);
  }

  .contribution__main {
    display: flex;
    width: 100%;
  }

  .rules {
    background: var(--color-light);
    border-radius: 10px;
    margin-top: 36px;
    overflow: hidden;
  }
  .rules__head {
    font-weight: var(--font-weight-medium);
    font-size: var(--h3-size);
    line-height: var(--h3-line-height);
    color: var(--white-color);
    background: var(--color-dark-st2);
    padding: 23px 32px;
  }
  .rules__items {
    display: flex;
    justify-content: flex-start;
    width: 100%;

    padding: 0;
    margin: 28px 32px 0 32px;
  }

  .rules__item.center {
    border-left: 1px solid var(--main-text-color);
    border-right: 1px solid var(--main-text-color);
  }
  .rules_text {
    max-width: 145px;
    font-weight: var(--font-weight-medium);
    font-size: 18px;
    line-height: 27px;
    text-transform: uppercase;
    color: var(--main-text-color);
  }
  .rules__item {
    padding: 16px 50px 26px 50px;
  }
  .rules__item:first-child {
    padding: 16px 50px 26px 0px;
  }
  .rules__item:last-child {
    padding: 16px 0px 26px 50px;
  }
  .rules_text span {
    color: var(--white-color);
    font-size: 18px;
    line-height: 27px;
  }
  .rules__val__wrapper {
    position: relative;
    margin-top: 10px;
  }
  .rules__val {
    font-weight: var(--font-weight-medium);
    font-size: var(--h2-size);
    line-height: var(--h2-line-height);
    color: var(--main-text-color);
  }
  .rules__val span {
    font-size: var(--text-size-small);
    line-height: 21px;
  }

  .column-left {
    width: 100%;
    overflow: hidden;
  }

  .step__footer {
    display: flex;
    justify-content: flex-end;
    position: relative;
  }
  @media only screen and (max-width: 1280px) and (min-width: 991px) {
    .rules__item {
      padding: 16px 30px 26px 30px;
    }
    .rules__item:first-child {
      padding: 16px 30px 26px 0px;
    }
    .rules__item:last-child {
      padding: 16px 0px 26px 30px;
    }
  }

  @media only screen and (max-width: 991px) {
    .contribution__head {
      padding: 0 1px;
    }
    .rules {
      border: 2px solid var(--main-text-color);
      border-radius: 20px;
      background: var(--color-dark-st2);
    }
    .rules_text,
    .rules_text span {
      line-height: 26px;
    }
    .rules__val__wrapper {
      height: 32px;
    }
    .rules__val {
      font-size: var(--h3-size);
      line-height: 32px;
    }
    .rules__items {
      padding: 0;
      margin-top: 10px;
      max-width: 450px;
      justify-content: flex-start;
    }
    .rules__item {
      display: flex;
      flex-wrap: wrap;
    }
    .rules__val__wrapper {
      margin-top: auto;
    }
    .rules__item,
    .rules__item:last-child {
      padding: 25px;
    }
    .rules__item:first-child {
      padding: 25px 25px 25px 0;
    }

    .rules__head {
      background: transparent;
      color: var(--main-text-color);
      padding: 0;
    }
    .rules__top {
      background: var(--color-dark-st1);
      border-bottom: 2px solid var(--main-text-color);
      padding: 24px 30px 13px 21px;
    }
  }
  @media only screen and (max-width: 768px) {
    .rules_text,
    .rules_text span {
      font-size: 10px;
      line-height: 15px;
    }
    .rules_text.contr {
      width: 74px;
    }
    .rules_text.conver {
      width: 75px;
    }
    .rules_text.project {
      width: 72px;
    }
    .rules__val__wrapper {
      height: 26px;
      width: 72px;
    }
    .rules__val,
    .rules__head {
      line-height: 26px;
    }
    .rules__val {
      line-height: 24px;
      font-size: 16px;
    }
    .rules__item,
    .rules__item:last-child {
      padding: 10px;
    }
    .rules__item:first-child {
      padding: 10px 10px 10px 0;
    }
    .contribution__head {
      padding: 0 21px;
    }
    .step__footer {
      padding: 0 16px;
    }
    .rules__items {
      margin: 28px 0 0 0;
    }
    .relative__wrapper {
      margin-top: 40px;
    }
  }
  @media only screen and (max-width: 768px) and (min-width: 375px) {
    .h2-sv {
      white-space: nowrap;
    }
  }
  @media only screen and (max-width: 480px) {
    .rules {
      margin-top: 24px;
    }
  }
  @media only screen and (max-width: 375px) {
    .rules__top {
      padding: 24px 25px 13px 12px;
    }

    .rules__val {
      line-height: 21px;
      font-size: 15px;
    }
    .rules__val span {
      font-size: 12px;
    }
  }
</style>
