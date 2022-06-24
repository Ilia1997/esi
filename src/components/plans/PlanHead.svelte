<script>
  import { contributionData } from "../../stores/contributionsStore";
  import { onDestroy } from "svelte";
  import { priceConvertation } from "../../functions/priceConvertation";
  let data;
  const unsubscribe = contributionData.subscribe((value) => {
    data = value;
  });
  let moVal = data.monthlyValue;
  onDestroy(unsubscribe);
</script>

<div class="plans__head">
  <div class="column">
    <div class="column__item left">
      <div class="text">
        Your <span class="green">Green</span>
        Contribution
      </div>
      <div class="plans__val">
        {data.currencySymbol}{moVal ? priceConvertation(moVal) : 0}<span>/mo</span>
      </div>
    </div>

    <div class="line" />
  </div>
  <div class="column right">
    <div class="column__item rigth">
      <p>
        You can choose between numerous plans, from the Green Safe to the Green
        Adventure and/or Green Founder. Change your plan selection and choose
        how to distribute your periodic contribution anytime. You can change,
        and therefore we adapt!
      </p>
    </div>
  </div>
</div>

<style>
  .plans__head {
    display: flex;
    max-width: 874px;
    min-height: 136px;
    margin-top: 32px;
  }
  .column__item.left {
    padding-top: 8px;
    padding-right: 50px;
  }
  .column__item.rigth {
    padding-top: 19px;
    padding-left: 50px;
  }
  .column__item.rigth p {
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    color: #053900;
  }
  .plans__head .column {
    position: relative;
  }
  .plans__head .line {
    height: 100%;
    width: 1px;
    background-color: #032b01;
    position: absolute;
    top: 0;
    right: 0;
  }
  .plans__head .text {
    font-size: 18px;
    line-height: 27px;
    text-transform: uppercase;
  }
  .plans__val {
    font-size: 36px;
    line-height: 54px;
    margin-top: 10px;
  }
  .plans__val span {
    font-size: 14px;
    line-height: 21px;
  }
  .green {
    color: #6DB94F;
  }
  @media only screen and (max-width: 768px) {
    .plans__head .line,
    .column.right {
      display: none;
    }
    .plans__head{
      min-height: auto;
      margin-top: 24px;
    }
    .plans__head .text,
    .plans__head span {
      font-size: 14px;
      line-height: 21px;
     
    }
    .plans__val {
      font-size: 24px;
      line-height: 36px;
    }
    .plans__val span {
      font-size: 10px;
      line-height: 15px;
    }
  }
</style>
