<script>
  import {
    headSteps,
    incrementStep,
    decrementStep,
    subscribeAllState,
  } from "../../stores/store";
  import { disableAllDropdown, plansModalState } from "../../stores/plansStore";
  import { allocatedContributions } from "../../stores/contributionsStore";
  import PlanHead from "./PlanHead.svelte";
  import ButtonLeft from "../buttons/ButtonLeft.svelte";
  import ButtonRight from "../buttons/ButtonRight.svelte";
  import PlanItems from "./PlanItems.svelte";
  import PlanModal from "./PlanModal.svelte";

  let changeCounter = 0;

  let prevStep = () => {
    decrementStep();
  };
  let nextStep = () => {
    if (validate()) {
      $headSteps.thirdStep = true;
      if (changeCounter === 0) {
        incrementStep();
        changeCounter += 1;
      }
    } else {
      alert("Chouse all 100% of your money");
    }
  };
  let validate = () => {
    let sumOfPlans =
      $allocatedContributions.safe +
      $allocatedContributions.adventure +
      $allocatedContributions.founder;
    console.log(sumOfPlans);
    if (sumOfPlans > 99 && sumOfPlans <= 100) {
      return true;
    } else {
      return false;
    }
  };

  function subscribeAllPlans() {
    if (!$subscribeAllState) {
      $disableAllDropdown = true;

      $allocatedContributions.safe = 33.33;
      $allocatedContributions.safeName = "1/3 of Total Contribution";

      $allocatedContributions.adventure = 33.33;
      $allocatedContributions.adventureName = "1/3 of Total Contribution";

      $allocatedContributions.founder = 33.33;
      $allocatedContributions.founderName = "1/3 of Total Contribution";
      $subscribeAllState = true;
    } else {
      $disableAllDropdown = false;

      $allocatedContributions.safe = 0;
      $allocatedContributions.safeName = "0 of Total Contribution";

      $allocatedContributions.adventure = 0;
      $allocatedContributions.adventureName = "0 of Total Contribution";

      $allocatedContributions.founder = 0;
      $allocatedContributions.founderName = "0 of Total Contribution";

      $subscribeAllState = false;
    }
  }
</script>

<div class="plans__main">
  <div class="plans__main__wrapper">
    <h2>
      Plans <span class="green">Selector</span> and
      <span class="green">Distributor</span>
    </h2>
    <div class="main__mob_h2">
      Choose any <span class="green">plan</span> and allocate you
      <span class="green">contribution</span>
    </div>
    <PlanHead />
  </div>

  <div class="plans__wrapper">
    <div class="plans__wrapper__head">
      <h2>
        Please allocate you <span class="green">contribution</span> between our
        <span class="green">plans</span>
      </h2>
      <div class="mob__plan__h2">Select plans</div>
      <div class="subscribe__all" on:click={subscribeAllPlans}>
        <div class="subscribe__checkbox" class:active={$subscribeAllState}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              d="M7.08286 13.8212L3.92203 10.6604C3.76486 10.5086 3.55436 10.4246 3.33586 10.4265C3.11736 10.4284 2.90835 10.516 2.75384 10.6705C2.59934 10.825 2.5117 11.034 2.5098 11.2525C2.5079 11.471 2.59189 11.6815 2.74369 11.8387L6.49369 15.5887C6.64997 15.7449 6.86189 15.8327 7.08286 15.8327C7.30383 15.8327 7.51575 15.7449 7.67203 15.5887L16.8387 6.42203C16.9905 6.26486 17.0745 6.05436 17.0726 5.83586C17.0707 5.61736 16.983 5.40835 16.8285 5.25384C16.674 5.09934 16.465 5.0117 16.2465 5.0098C16.028 5.0079 15.8175 5.09189 15.6604 5.24369L7.08286 13.8212Z"
              fill="url(#paint0_linear_2960_1067)"
            />
            <defs>
              <linearGradient
                id="paint0_linear_2960_1067"
                x1="17.0726"
                y1="5.00977"
                x2="1.10357"
                y2="13.0343"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#FF2E00" />
                <stop offset="1" stop-color="#FF6B00" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div class="subscribe__text">Subscribe to All Plan</div>
      </div>
    </div>

    <PlanItems />
  </div>
  {#if $plansModalState}
    <PlanModal />
  {/if}

  <div class="bottom__btns">
    <ButtonLeft on:click={prevStep} />
    <ButtonRight on:click={nextStep} />
  </div>
</div>

<style>
  .green {
    color: #6DB94F;
  }
  .subscribe__all {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    cursor: pointer;
    min-width: 200px;
  }
  .subscribe__checkbox {
    width: 24px;
    height: 24px;
    position: relative;
    background: #ffffff;
    border: 1px solid #dddddd;
    border-radius: 3px;
  }
  .subscribe__checkbox svg {
    opacity: 0;
    width: 100%;
    height: 100%;
    transition: all ease 0.2s;
  }
  .subscribe__checkbox.active svg {
    opacity: 1;
  }
  .subscribe__text {
    margin-left: 8px;
    color: #0085ff;
  }
  .plans__wrapper {
    margin-top: 32px;
  }
  .plans__wrapper__head {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .plans__main {
    width: 100%;
  }
  .mob__plan__h2,
  .main__mob_h2 {
    display: none;
  }
  @media only screen and (max-width: 991px) {
    .mob__plan__h2 {
      display: block;
      font-weight: 500;
      font-size: 24px;
      line-height: 32px;
      color: #032b01;
    }
    .plans__wrapper__head h2 {
      display: none;
    }
  }
  @media only screen and (max-width: 768px) {
    .main__mob_h2 {
      margin-top: 8px;
      display: block;
      font-weight: 500;
      font-size: 12px;
      line-height: 18px;
      color: #032b01;
    }
    .mob__plan__h2 {
      font-size: 16px;
      line-height: 24px;
    }
    .main__mob_h2 span {
      font-size: 12px;
      line-height: 18px;
    }
    .plans__wrapper {
      margin-top: 20px;
    }
    .plans__main__wrapper,
    .plans__wrapper__head {
      padding: 0 16px;
    }
  }
</style>
