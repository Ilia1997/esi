<script>
  import Contribution from "./components/contributions/Contribution.svelte";
  import { onDestroy } from 'svelte';
  import HeadSteps from "./components/HeadSteps.svelte";
  import Plan from "./components/plans/Plan.svelte";
  import {stepCounter} from './stores/store'
  let stepCountValue;
  const unsubscribe = stepCounter.subscribe(value => {
		stepCountValue = value;
    console.log(value)
	});
  onDestroy(unsubscribe)
</script>

<main>
  <div class="container">
    <HeadSteps />
    <div class="step__content">
      {#if stepCountValue === 1}
      <Contribution /> 
      {:else if stepCountValue === 2 }
      <Plan />
       {/if}
     
    </div>
    {stepCountValue}
  </div>
</main>

<style>
  main {
    padding: 50px 0;
  }
  .container {
    max-width: 1360px;
    margin-right: auto;
    margin-left: auto;
    padding-right: 40px;
    padding-left: 40px;
  }
  .step__content {
    display: flex;
    background: rgba(255, 255, 255, 0.8);
    box-shadow: 0px 25px 35px rgba(0, 0, 0, 0.15),
      inset 0px 0px 35px rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(5px);
    border-radius: 0px 0px 10px 10px;
  }
  .column-left {
    width: 100%;
    max-width: 760px;
  }
  .column-right {
    width: 100%;
    max-width: 520px;
  }
  .green {
    color: #359fa1;
  }
  h2 {
    font-weight: 500;
    font-size: 36px;
    line-height: 54px;
  }
</style>
