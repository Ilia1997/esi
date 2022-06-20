<script>
  import Form from "./Form.svelte";
  import { incrementStep, headSteps } from "../../stores/store";
  import { contributionData } from "../../stores/contributionsStore";
  import { afterUpdate, beforeUpdate, onDestroy } from "svelte";
  import { scrollToTop } from "../../functions/scrollToTop";
  import Rules from "./Rules.svelte";
  import ButtonRight from "../buttons/ButtonRight.svelte";
  import ErrorMessage from "../ErrorMessage.svelte";
  let changeCounter = 0;
  let amountErrorMessage = "Error message",
    amountErrorMessageState = false;
  function changeStep() {
    if (validateAmount()) {
      $headSteps.secondStep = true;
      if (changeCounter === 0) {
        incrementStep();
        scrollToTop();
        changeCounter += 1;
      }
    }
  }

  let data;
  const unsubscribe = contributionData.subscribe((value) => {
    data = value;
  });
  function validateAmount() {
    if (data.amount < 20) {
      amountErrorMessage = "Value shoud be more than 20";
      amountErrorMessageState = true;
    } else {
      return true;
    }
  }

  let moVal = data.monthlyValue,
    yrVal = 7200,
    fiveYrVal = 36000;

  beforeUpdate(() => {
    // if period monthly - set current value
    if (data.period === "Monthly") {
      moVal = data.amount;
      $contributionData.monthlyValue = moVal;
      // if bi-monthly - divide value into two
    } else if (data.period === "Bi-Monthly") {
      moVal = data.amount * 2;
      $contributionData.monthlyValue = moVal;
    }
    yrVal = moVal * 12;
    fiveYrVal = yrVal * 5;
  });
  afterUpdate(()=>{
    if(data.amount>20 && data.amount<9999){
      amountErrorMessageState = false
    }
  })

  onDestroy(unsubscribe);
</script>

<div class="contribution__main">
  <div class="column-left">
    <div>
      <div class="contribution__head">
        <h2>Choose your <span class="green">Contribution</span></h2>
        <Form />
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
                  {data.currencySymbol}{moVal ? moVal : 0}<span>/mo</span>
                </div>
              </div>
            </div>
            <div class="rules__item center">
              <div class="rules_text conver">
                Annual <span>Green</span> Conversion
              </div>
              <div class="rules__val__wrapper">
                <div class="rules__val">
                  {data.currencySymbol}{yrVal}<span>/yr</span>
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
                  {data.currencySymbol}{fiveYrVal}<span>/5yrs</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Rules />
      </div>
      <div class="relative__wrapper">
        {#if amountErrorMessageState}
          <ErrorMessage errorMessage={amountErrorMessage} />
        {/if}
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
    color: #78c759;
  }

  .contribution__main {
    display: flex;
    width: 100%;
  }

  .rules {
    background: #91ea6d;
    border-radius: 10px;
    margin-top: 36px;
    overflow: hidden;
  }
  .rules__head {
    font-weight: 500;
    font-size: 24px;
    line-height: 36px;
    color: #fff;
    background: #6db94f;
    padding: 23px 32px;
  }
  .rules__items {
    display: flex;
    justify-content: space-between;
    width: 100%;
    max-width: 653px;
    margin-top: 28px;
    padding: 0 32px;
  }
  .rules__item {
    padding: 16px 50px 26px 50px;
  }
  .rules__item.center {
    border-left: 1px solid #032b01;
    border-right: 1px solid #032b01;
  }
  .rules_text {
    max-width: 134px;
    font-weight: 500;
    font-size: 18px;
    line-height: 27px;
    text-transform: uppercase;
    color: #032b01;
  }
  .rules__item:first-child {
    padding: 16px 50px 26px 0px;
  }
  .rules__item:last-child {
    padding: 16px 0px 26px 50px;
  }
  .rules_text span {
    color: #fff;
    font-size: 18px;
    line-height: 27px;
  }
  .rules__val__wrapper {
    height: 54px;
    width: 135px;
    position: relative;
  }
  .rules__val {
    position: absolute;
    top: 0;
    left: 0;
    font-weight: 500;
    font-size: 36px;
    line-height: 54px;
    color: #032b01;
  }
  .rules__val span {
    font-size: 14px;
    line-height: 21px;
  }

  .column-left {
    width: 100%;
  }

  .step__footer {
    display: flex;
    justify-content: flex-end;
    position: relative;
  }

  @media only screen and (max-width: 991px) {
    .rules {
      border: 2px solid #032b01;
      border-radius: 20px;
      background: #6db94f;
    }
    .rules_text,
    .rules_text span {
      font-size: 16px;
      line-height: 26px;
    }
    .rules__val__wrapper {
      height: 32px;
    }
    .rules__val {
      font-size: 24px;
      line-height: 32px;
    }
    .rules__items {
      padding: 0;
      margin-top: 10px;
      max-width: 450px;
      justify-content: flex-start;
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
      color: #032b01;
      padding: 0;
    }
    .rules__top {
      background: #78c759;
      border-bottom: 2px solid #032b01;
      padding: 24px 57px 13px 21px;
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
    /* .rules__head {
    } */
    .rules__val__wrapper {
      height: 26px;
      width: 72px;
    }
    .rules__val,
    .rules__head {
      font-size: 16px;
      line-height: 26px;
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
  }
  @media only screen and (max-width: 768px) and (min-width: 375px) {
    h2 {
      white-space: nowrap;
    }
  }
</style>
