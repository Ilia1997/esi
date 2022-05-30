<script>
  import Form from "./Form.svelte";
  import { incrementStep, contributionData, headSteps } from "../../stores/store";
  import { beforeUpdate,  onDestroy } from "svelte";
  import Rules from "./Rules.svelte";
import ButtonRight from "../buttons/ButtonRight.svelte";
  let changeCounter = 0;
  let amountErrorMessage = 'Error message',
      amountErrorMessageState = false;
  function changeStep() {
    if (validateAmount()) {
      $headSteps.secondStep = true;
      if (changeCounter === 0) {
        incrementStep();
        changeCounter += 1;
      }
    }
  }

  let data;
  const unsubscribe = contributionData.subscribe((value) => {
    data = value;
  });
  function validateAmount(){
      if(data.amount < 20){
        amountErrorMessage = 'Value shoud be more than 20'
        amountErrorMessageState = true;
      }else{
          return true
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

  onDestroy(unsubscribe)
</script>

<div class="contribution__main">
  <div class="column-left">
    <div class="contribution__left">
      <div class="contribution__head">
        <h2>Choose your <span class="green">Contribution</span></h2>
        <Form />
      </div>
      <div class="rules">
        <div class="rules__head">Projection & Rules</div>
        <div class="rules__items">
          <div class="rules__item">
            <div class="rules_text">
              Your <span>Green</span>
              Contribution
            </div>
            <div class="rules__val__wrapper">   <div class="rules__val">
              {data.currencySymbol}{moVal ? moVal : 0}<span>/mo</span
              >
            </div></div>
         
          </div>
          <div class="rules__item center">
            <div class="rules_text">
              Annual <span>Green</span> Conversion
            </div>
            <div class="rules__val__wrapper">            <div class="rules__val">
              {data.currencySymbol}{yrVal}<span>/yr</span>
            </div></div>

          </div>
          <div class="rules__item">
            <div class="rules_text">
              <span>Green</span>
              Saving Projection
            </div>
            <div class="rules__val__wrapper">            <div class="rules__val">
              {data.currencySymbol}{fiveYrVal}<span>/5yrs</span>
            </div></div>

          </div>
        </div>
        <Rules />
      </div>
      <div class="contribution__footer">
          {#if amountErrorMessageState}
          <div class="error__message">{amountErrorMessage}</div>
          {/if}
          
       <ButtonRight  on:click={changeStep}/>
      </div>
    </div>
  </div>
</div>

<style>
.error__message{
    position: absolute;
    right: 200px;
    top: 50px;
    color: red;
}


  .contribution__main {
    display: flex;
    width: 100%;
    padding: 20px 40px 36px 40px;
  }

  .rules {
    background: #91EA6D;
    border-radius: 10px;
    margin-top: 36px;
    overflow: hidden;
  }
  .rules__head {
    font-weight: 500;
    font-size: 24px;
    line-height: 36px;
    color: #fff;
    background: #6DB94F;
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
  }
  .rules__val__wrapper{
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

  .green {
    color: #359fa1;
  }
  h2 {
    font-weight: 500;
    font-size: 36px;
    line-height: 54px;
  }

  .contribution__footer {
    margin: 56px 0 0 0 ;
    display: flex;
    justify-content: flex-end;
    position: relative;
  }
</style>
