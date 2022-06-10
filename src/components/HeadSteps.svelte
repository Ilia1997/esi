<script>
  import { stepCounter, headSteps } from "../stores/store";
  import { onDestroy } from "svelte";
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
    on:click={setStep}
    data-step="1"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      class="svg__icon"
    >
      <path
        d="M21 18V19C21 20.1 20.1 21 19 21H5C3.89 21 3 20.1 3 19V5C3 3.9 3.89 3 5 3H19C20.1 3 21 3.9 21 5V6H12C10.89 6 10 6.9 10 8V16C10 17.1 10.89 18 12 18H21ZM12 16H22V8H12V16ZM16 13.5C15.17 13.5 14.5 12.83 14.5 12C14.5 11.17 15.17 10.5 16 10.5C16.83 10.5 17.5 11.17 17.5 12C17.5 12.83 16.83 13.5 16 13.5Z"
        fill="white"
      />
    </svg><span>Contribution</span>
  </div>
  <div
    class="head__step"
    class:visited={$headSteps.secondStep}
    on:click={setStep}
    class:current={$stepCounter === 2}
    data-step="2"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      class="svg__icon"
    >
      <path
        d="M19 3H14.82C14.4 1.84 13.3 1 12 1C10.7 1 9.6 1.84 9.18 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM12 3C12.55 3 13 3.45 13 4C13 4.55 12.55 5 12 5C11.45 5 11 4.55 11 4C11 3.45 11.45 3 12 3ZM14 17H7V15H14V17ZM17 13H7V11H17V13ZM17 9H7V7H17V9Z"
        fill="white"
      />
    </svg>
    <span>Plan</span>
  </div>
  <div
    class="head__step"
    class:visited={$headSteps.thirdStep}
    class:current={$stepCounter === 3}
    data-step="3"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      class="svg__icon"
    >
      <path
        d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM14 17H7V15H14V17ZM17 13H7V11H17V13ZM17 9H7V7H17V9Z"
        fill="white"
      />
    </svg>
    <span>Legal</span>
  </div>
  <div
    class="head__step"
    class:visited={$headSteps.fourthStep}
    class:current={$stepCounter === 4}
    data-step="4"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      class="svg__icon"
    >
      <path
        d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM11 15H9V9H11V15ZM11 7H9V5H11V7Z"
        fill="white"
      />
    </svg>
    <span>Information</span>
  </div>
  <div
    class="head__step"
    class:visited={$headSteps.fifthStep}
    data-step="5"
    class:current={$stepCounter === 5}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      class="svg__icon"
    >
      <path
        d="M19 3H5C3.9 3 3 3.9 3 5V12C3 13.1 3.9 14 5 14H19C20.1 14 21 13.1 21 12V5C21 3.9 20.1 3 19 3ZM19 9H15C15 10.62 13.62 12 12 12C10.38 12 9 10.62 9 9H5V5H19V9ZM15 16H21V19C21 20.1 20.1 21 19 21H5C3.9 21 3 20.1 3 19V16H9C9 17.66 10.34 19 12 19C13.66 19 15 17.66 15 16Z"
        fill="white"
      />
    </svg>
    <span>Billing Information</span>
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
  svg.svg__icon {
    padding-right: 6px;
  }
  svg.svg__icon path {
    fill: #5a5a5a;
  }
  .visited svg.svg__icon path {
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
    cursor: pointer;
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
