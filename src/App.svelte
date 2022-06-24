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
  import { fade } from "svelte/transition";
  let stepCountValue;
  const unsubscribe = stepCounter.subscribe((value) => {
    stepCountValue = value;
  });
  onDestroy(unsubscribe);
</script>

<main>
  <div class="container__form">
    {#if $successMessageState === false}
      <div class="wrapper">
        <HeadSteps />
        <div class="step__content">
          {#if stepCountValue === 1}
            <div class="component__wrapper" in:fade={{ duration: 500 }}>
              <Contribution />
            </div>
          {:else if stepCountValue === 2}
            <div class="component__wrapper" in:fade={{ duration: 500 }}>
              <Plan />
            </div>
          {:else if stepCountValue === 3}
            <div class="component__wrapper" in:fade={{ duration: 500 }}>
              <Legal />
            </div>
          {:else if stepCountValue === 4}
            <div class="component__wrapper" in:fade={{ duration: 500 }}>
              <Information />
            </div>
          {:else if stepCountValue === 5}
            <div class="component__wrapper" in:fade={{ duration: 500 }}> 
              <Billing />
            </div>
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
  @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap");
  
  :global(*) {
    box-sizing: border-box;
    margin: 0;
    padding: 0px;
    font-size: var(--text-size-normal);
    line-height: var(--text-normal-height);
  }
  :global(.input-sv) {
    margin-bottom: 8px;
  }
  :global(.input-sv:last-child) {
    margin-bottom: 0px;
  }
  :global(.input-sv:not(.error)::placeholder) {
    color: var(--black-color);
  }
  :global(.input-sv.success) {
    border: 1px solid var(--color-dark-st3);
    box-shadow: -2px 1px 20px #5b9c422b;
  }
  :global(.input-sv.error),
  :global(.select-sv.error) {
    border: 1px solid var(--error-color);
    color: var(--error-color);
  }
  :global(.input-sv.error::placeholder) {
    color: var(--error-color);
  }
  :global(.select-sv) {
    font-size: 17px;
    padding: 0 30px;
    font-weight: 400;
    height: 70px;
    -webkit-appearance: none;
    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAeCAYAAABuUU38AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAUxJREFUeNrM1sEJwkAQBdCsngXPHsQO9O5FS7AAMVYgdqAd2IGCDWgFnryLFQiCZ8EGnJUNimiyM/tnk4HNEAg/8y6ZmMRVqz9eUJvRaSbvutCZ347bXVJy/ZnvTmdJ862Me+hAbZCTs6GHpyUi1tTSvPnqTpoWZPUa7W7ncT3vK4h4zVejy8QzM3WhVUO8ykI6jOxoGA4ig3BLHcNFSCGqGAkig2yqgpEiMsjSfY9LxYQg7L6r0X6wS29YJiYQYecemY+wHrXD1+bklGhpAhBDeu/JfIVGxaAQ9sb8CI+CQSJ+QmJg0Ii/EE2MBiIXooHRQhRCkBhNhBcEhLkwf05ZCG8ICCOpk0MULmvDSY2M8UawIRExLIQIEgHDRoghihgRIgiigBEjgiFATBACAgFgghEwSAAGgoBCBBgYAg5hYKAIFYgHBo6w9RRgAFfy160QuV8NAAAAAElFTkSuQmCC");
    background-size: 12px;
    background-position: 90% center;
    background-repeat: no-repeat;
    padding-right: 30px;
    color: var(--grey-color-dark);
  }
  :global(.body-sv .error__message) {
    font-size: 12px;
    line-height: var(--text-normal-height);
    color: var(--error-color);
  }
  :global(.tab__head) {
    font-weight: 600;
    font-size: var(--h3-size);
    line-height: 36px;
    color: var(--color-darkest);
  }
  :global(.tab__wrapper) {
    text-align: center;
    margin-bottom: 8px;
  }
  :global(.tab__subhead) {
    color: var(--color-darkest);
    margin-top: 10px;
  }
  :global(.tab__form__fields) {
    margin-top: 24px;
    position: relative;
    z-index: 3;
  }
  :global(.bottom__btns) {
    margin-top: 20px;
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  :global(.success__text) {
    color: var(--color-dark);
    padding: 40px;
    border: 1px solid;
    border-radius: 10px;
  }
  
  main {
    padding: 36px 0 150px 0;
  }
  .component__wrapper {
    width: 100%;
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
