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
  import { fade } from "svelte/transition";
  import { scrollToTop } from "../../functions/scrollToTop";
  import ErrorMessage from "../ErrorMessage.svelte";
  import SubscribeAllIco from "../../../public/images/SubscribeAll_ico.svelte";
  import { afterUpdate } from "svelte";

  let changeCounter = 0;
  let errorMessageState = false;
  let errorMessage;
  $: errorMessage, errorMessageState;

  let prevStep = () => {
    decrementStep();
    scrollToTop();
  };
  let nextStep = () => {
    if (validate()) {
      $headSteps.thirdStep = true;
      if (changeCounter === 0) {
        incrementStep();
        changeCounter += 1;
        scrollToTop();
      }
      errorMessageState = false;
    } else {
      errorMessageState = true;
      errorMessage = "Chouse all 100% of your money";
    }
  };
  let validate = () => {
    let sumOfPlans =
      $allocatedContributions.safe +
      $allocatedContributions.adventure +
      $allocatedContributions.founder;
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

      $allocatedContributions.adventure = 33.33;

      $allocatedContributions.founder = 33.33;
      $subscribeAllState = true;
    } else {
      $disableAllDropdown = false;

      $allocatedContributions.safe = 0;

      $allocatedContributions.adventure = 0;

      $allocatedContributions.founder = 0;

      $subscribeAllState = false;
    }
  }
  afterUpdate(() => {
    let sumOfPlans =
      $allocatedContributions.safe +
      $allocatedContributions.adventure +
      $allocatedContributions.founder;
    if (sumOfPlans > 99 && sumOfPlans <= 100) {
      errorMessageState = false;
    }
  });
</script>

<div class="plans__main">
  <div class="plans__main__wrapper">
    <h2 class="h2-sv">
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
      <h3 class="h3-sv">
        Please allocate you <span class="green">contribution</span> between our
        <span class="green">plans</span>
      </h3>
      <div class="mob__plan__h2">Select plans</div>
      <div class="subscribe__all" on:click={subscribeAllPlans}>
        <div class="subscribe__checkbox">
          <SubscribeAllIco className={$subscribeAllState ? "active__cb" : ""} />
        </div>

        <div class="subscribe__text">Subscribe to All Plan</div>
      </div>
    </div>

    <PlanItems />
  </div>
  {#if $plansModalState}
    <div transition:fade>
      <PlanModal />
    </div>
  {/if}
  <div class="relative__wrapper">
    {#if errorMessageState}
      <ErrorMessage {errorMessage} />
    {/if}
    <div class="bottom__btns">
      <ButtonLeft on:click={prevStep} />
      <ButtonRight on:click={nextStep} />
    </div>
  </div>
</div>

<style>
  .relative__wrapper {
    position: relative;
  }
  .bottom__btns {
    position: relative;
  }
  .green {
    color: var(--color-dark-st2);
  }
  .subscribe__all {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    cursor: pointer;
    min-width: 180px;
  }
  .subscribe__checkbox {
    width: 24px;
    height: 24px;
    position: relative;
    background: var(--white-color);
    border: 1px solid var(--border-color);
    border-radius: 3px;
  }

  .subscribe__text {
    margin-left: 8px;
    color: var(--color-dark-st5);
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
    position: relative;
  }
  .mob__plan__h2,
  .main__mob_h2 {
    display: none;
  }
  @media only screen and (max-width: 991px) {
    .mob__plan__h2 {
      display: block;
      font-weight: var(--font-weight-medium);
      font-size: var(--h3-size);
      line-height: 32px;
      color: var(--main-text-color);
    }
    .h3-sv {
      display: none;
    }
  }
  @media only screen and (max-width: 767px) {
    .main__mob_h2 {
      margin-top: 8px;
      display: block;
      font-weight: var(--font-weight-medium);
      font-size: var(--text-size-smaller);
      line-height: 18px;
      color: var(--main-text-color);
    }
    .mob__plan__h2 {
      white-space: nowrap;
    }
    .main__mob_h2 span {
      font-size: var(--text-size-smaller);
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
