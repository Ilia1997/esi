<script>
  import { stepCounter, headSteps } from "../stores/store";
  import { onDestroy } from "svelte";
  import StepContribution_ico from "../../public/images/StepContribution_ico.svelte";
  import StepPlan_ico from "../../public/images/StepPlan_ico.svelte";
  import StepLegal_ico from "../../public/images/StepLegal_ico.svelte";
  import StepInformation_ico from "../../public/images/StepInformation_ico.svelte";
  import StepBilling_ico from "../../public/images/StepBilling_ico.svelte";

  let stepCountValue;
  const unsubscribe = stepCounter.subscribe((value) => {
    stepCountValue = value;
  });
  function setStep() {
    let stepValue = this.getAttribute("data-step");
    $stepCounter = parseInt(stepValue);
    console.log($stepCounter);
  }
  onDestroy(unsubscribe);
</script>

<div class="head__steps">
  <div
    class="head__step"
    class:visited={$headSteps.firstStep}
    class:current={$stepCounter === 1}
    data-step="1"
  >
    <StepContribution_ico /><span>Contribution</span>
  </div>
  <div
    class="head__step"
    class:visited={$headSteps.secondStep}
    class:current={$stepCounter === 2}
    data-step="2"
  >
    <StepPlan_ico /><span>Plan</span>
  </div>
  <div
    class="head__step"
    class:visited={$headSteps.thirdStep}
    class:current={$stepCounter === 3}
    data-step="3"
  >
    <StepLegal_ico /><span>Legal</span>
  </div>
  <div
    class="head__step"
    class:visited={$headSteps.fourthStep}
    class:current={$stepCounter === 4}
    data-step="4"
  >
    <StepInformation_ico /><span>Information</span>
  </div>
  <div
    class="head__step"
    class:visited={$headSteps.fifthStep}
    data-step="5"
    class:current={$stepCounter === 5}
  >
    <StepBilling_ico /><span>Billing Information</span>
  </div>
</div>

<style>
  .head__steps {
    display: flex;
  }
  .head__step {
    display: flex;
    align-items: center;
    pointer-events: none;
  }
  :global(.head__step svg.svg__icon) {
    padding-right: 6px;
  }
  :global(.head__step:not(.current) svg.svg__icon path) {
    fill: #5a5a5a;
  }
  :global(.head__step.visited svg.svg__icon path) {
    fill: #fff;
  }
  .head__step.visited {
    pointer-events: auto;
    color: white;
  }
  .head__step:nth-child(1).visited {
    background: #78c759;
  }
  .head__step:nth-child(2).visited {
    background: #6db94f;
  }
  .head__step:nth-child(3).visited {
    background: #5b9c42;
  }
  .head__step:nth-child(4).visited {
    background: #4e8538;
  }
  .head__step:nth-child(5).visited {
    background: #3e6b2c;
  }

  .head__step {
    width: 100%;
    background: #e2e6df;
    padding: 13.5px 30px;
    font-weight: 500;
    font-size: 14px;
    line-height: 21px;
  }
  .head__step:nth-child(1) {
    max-width: 260px;
    clip-path: polygon(0% 0%, 95% 0, 100% 50%, 95% 100%, 0% 100%);
  }
  .head__step:nth-child(2),
  .head__step:nth-child(3),
  .head__step:nth-child(4) {
    margin-left: -0.7%;
    clip-path: polygon(95% 0, 100% 50%, 95% 100%, 0% 100%, 5% 50%, 0% 0%);
  }
  .head__step:last-child {
    margin-left: -0.7%;
    clip-path: polygon(100% 0, 100% 50%, 100% 100%, 0% 100%, 5% 50%, 0% 0%);
  }

  @media only screen and (max-width: 991px) {
    .head__step {
      display: none;
    }

    .head__step:nth-child(1) {
      max-width: none;
    }
    .head__step.current {
      display: flex;
    }
    .head__step.current + .head__step {
      display: flex;
    }
    .head__step:nth-child(1) {
      clip-path: polygon(0% 0%, 97% 0, 100% 50%, 97% 100%, 0% 100%);
    }
    .head__step:nth-child(2),
    .head__step:nth-child(3),
    .head__step:nth-child(4) {
      margin-left: -0.7%;
      clip-path: polygon(97% 0, 100% 50%, 97% 100%, 0% 100%, 3% 50%, 0% 0%);
    }
    .head__step:last-child {
      margin-left: -0.7%;
      clip-path: polygon(100% 0, 100% 50%, 100% 100%, 0% 100%, 3% 50%, 0% 0%);
    }
  }
  @media only screen and (max-width: 768px) {
    .head__step span {
      font-size: 13px;
      line-height: 18px;
    }
    .head__step:nth-child(1) {
      clip-path: polygon(0% 0%, 95% 0, 100% 50%, 95% 100%, 0% 100%);
    }
    .head__step:nth-child(2),
    .head__step:nth-child(3),
    .head__step:nth-child(4) {
      margin-left: -1%;
      clip-path: polygon(95% 0, 100% 50%, 95% 100%, 0% 100%, 5% 50%, 0% 0%);
    }
    .head__step:last-child {
      margin-left: -1%;
      clip-path: polygon(100% 0, 100% 50%, 100% 100%, 0% 100%, 5% 50%, 0% 0%);
    }
  }
  @media only screen and (max-width: 500px) {
    .head__step span {
      font-size: 13px;
      line-height: 18px;
    }
    .head__step:nth-child(1) {
      clip-path: polygon(0% 0%, 93% 0, 100% 50%, 93% 100%, 0% 100%);
    }
    .head__step:nth-child(2),
    .head__step:nth-child(3),
    .head__step:nth-child(4) {
      margin-left: -2%;
      clip-path: polygon(93% 0, 100% 50%, 93% 100%, 0% 100%, 7% 50%, 0% 0%);
    }
    .head__step:last-child {
      margin-left: -2%;
      clip-path: polygon(100% 0, 100% 50%, 100% 100%, 0% 100%, 7% 50%, 0% 0%);
    }
  }
</style>
