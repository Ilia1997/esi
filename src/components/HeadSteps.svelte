<script>
  import {stepCounter} from '../stores/store'
  import { onDestroy } from 'svelte';
  let stepCountValue;
  const unsubscribe = stepCounter.subscribe(value => {
		stepCountValue = value;
	});
  onDestroy(unsubscribe)
</script>

<div class="head__steps">
    <div class="head__step" class:visited ={stepCountValue > 0}>Step 1 Contribution</div>
    <div class="head__step" class:visited ={stepCountValue > 1}>Step 2 Plan</div>
    <div class="head__step" class:visited ={stepCountValue > 2}>Step 3 Information</div>
    <div class="head__step" class:visited ={stepCountValue > 3}>Step 4 Legal</div>
    <div class="head__step" class:visited ={stepCountValue > 4}>Step 5 Payment</div>
  </div>


<style>
    .head__steps{
      display: flex;
    }
    .head__step.visited{
        color: white;
    }
    .head__step:nth-child(1).visited{
      background: #359FA1;
    }
    .head__step:nth-child(2).visited{
      background: #2C8486;
    }
    .head__step:nth-child(3).visited{
      background: #236A6B;
    }
    .head__step:nth-child(4).visited{
      background: #1A4F50;
    }
    .head__step:nth-child(5).visited{
      background: #113535;
    }
    
    .head__step{
      width: 100%;
      background: #E2E6DF;
      padding: 13.5px 30px;
      font-weight: 500;
  font-size: 14px;
  line-height: 21px;
    }
    .head__step:nth-child(1){
      max-width: 260px;
      clip-path: polygon(0% 0%, 95% 0, 100% 50%, 95% 100%, 0% 100%);
    }
    .head__step:nth-child(2),.head__step:nth-child(3),.head__step:nth-child(4){
      margin-left: -0.7%;
      clip-path:  polygon(95% 0, 100% 50%, 95% 100%, 0% 100%, 5% 50%, 0% 0%)
  
    }
    .head__step:last-child{
      margin-left: -0.7%;
      clip-path: polygon(100% 0, 100% 50%, 100% 100%, 0% 100%, 5% 50%, 0% 0%);
    }
    
  </style>