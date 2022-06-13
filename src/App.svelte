<script>
  import Contribution from "./components/contributions/Contribution.svelte";
  import { onDestroy } from "svelte";
  import HeadSteps from "./components/HeadSteps.svelte";
  import Plan from "./components/plans/Plan.svelte";
  import FinalReview from "./components/FinalReview.svelte";
  import { stepCounter, successMessageState } from "./stores/store";
  import Legal from "./components/legal/Legal.svelte";
  import Information from "./components/information/Information.svelte";
  import Billing from "./components/billing/Billing.svelte";
  import { confirmPopUpState } from "./stores/infoStore";
  import SuccessMessage from "./components/SuccessMessage.svelte";
  let stepCountValue;
  const unsubscribe = stepCounter.subscribe((value) => {
    stepCountValue = value;
  });
  onDestroy(unsubscribe);
</script>
<!-- test max -->
<main>
  <div class="container__form">
   {#if $successMessageState === false}
      <div class="wrapper">
      <HeadSteps />
      <div class="step__content">
        {#if stepCountValue === 1}
          <Contribution />
        {:else if stepCountValue === 2}
          <Plan />
        {:else if stepCountValue === 3}
          <Legal />
        {:else if stepCountValue === 4}
          <Information />
        {:else if stepCountValue === 5}
          <Billing />
        {/if}
      </div>
    </div>
    {:else if $successMessageState === true}
     <SuccessMessage />
   {/if}
   

   
  </div>
</main>
{#if $confirmPopUpState === true}
  <FinalReview />
{/if}

<style>
  main {
    padding: 50px 0 150px 0;
  }
  .container__form {
    max-width: 1360px;
    margin-right: auto;
    margin-left: auto;
    padding-right: 40px;
    padding-left: 40px;
  }
  .step__content {
    display: flex;
    min-height: 810px;
    background: rgba(255, 255, 255, 0.8);
    box-shadow: 0px 25px 35px rgba(0, 0, 0, 0.15),
      inset 0px 0px 35px rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(5px);
    border-radius: 0px 0px 10px 10px;
    padding: 40px;
  }
  :global(.bottom__btns) {
    margin-top: 20px;
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  @media only screen and (max-width: 768px) {
    .container__form {
      padding: 0 6.5px;
    }
    .step__content {
      padding: 20px 0;
      min-height: auto;
    }
    :global(.bottom__btns) {
      padding: 0 16px;
    }
  }
</style>
