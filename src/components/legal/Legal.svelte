<script>
  import { afterUpdate } from "svelte";

  import { Accordion, AccordionItem } from "svelte-collapsible";
  let openedKey = "a";
  import {
    checkboxStates,
    legalItems,
    allSelected,
  } from "../../stores/legalStore";
  import { headSteps, incrementStep, decrementStep } from "../../stores/store";
  import ButtonLeft from "../buttons/ButtonLeft.svelte";
  import ButtonRight from "../buttons/ButtonRight.svelte";
  import { scrollToTop } from "../../functions/scrollToTop";
  import ErrorMessage from "../ErrorMessage.svelte";
  import Toggle_ico from "../../../public/images/Toggle_ico.svelte";
  let changeCounter = 0;
  let errorMessageState = false;
  let errorMessage;

  afterUpdate(() => {
    if ($checkboxStates.a && $checkboxStates.b && $checkboxStates.c) {
      $allSelected = true;
      errorMessageState = false
    } else {
      $allSelected = false;
    }
  });

  function agreeAllTerms(e) {
    if (e.target.checked) {
      $checkboxStates.a = true;
      $checkboxStates.b = true;
      $checkboxStates.c = true;
      $allSelected = true;
    } else {
      $checkboxStates.a = false;
      $checkboxStates.b = false;
      $checkboxStates.c = false;
      $allSelected = false;
    }
  }

  let prevStep = () => {
    decrementStep();
    scrollToTop();
  };

  let nextStep = () => {
    let state = Object.values($checkboxStates).every((value) => value === true);
    if (state) {
      $headSteps.fourthStep = true;
      if (changeCounter === 0) {
        incrementStep();
        changeCounter += 1;
        scrollToTop();
      }
    } else {
      errorMessageState = true;
      errorMessage = "Confirm all legal agreements";
    }
  };
</script>

<div class="legal__wrapper">
  <div>
    <h2 class="heading">Legal <span class="green">Agreement</span></h2>
    <Accordion bind:key={openedKey}>
      {#each legalItems as item}
        <AccordionItem key={item.key}>
          <div slot="header" class="header">
            <div class="column">
              <input
                type="checkbox"
                class="input-ch-sv"
                on:click={(e) => {
                  e.stopPropagation();
                  console.log("clicked");
                }}
                bind:checked={$checkboxStates[item.key]}
              />
              <p>I agree to {item.name}</p>
            </div>
            <Toggle_ico />
          </div>
          <div slot="body" class="body body-sv">
            <h3 class="body__head">{item.title}</h3>
            <p>
              {item.text}
            </p>
          </div>
        </AccordionItem>
      {/each}
    </Accordion>
    <div class="agree__all">
      <input
        class="input-ch-sv"
        type="checkbox"
        on:change={(e) => {
          agreeAllTerms(e);
        }}
        checked={$allSelected}
      />
      <p>
        I agree to all Terms & Conditions, Contract Agreement, Privacy & Cookie
      </p>
    </div>
  </div>
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
  .legal__wrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
  }

  :global(.accordion) {
    width: 100%;
    margin: 0 auto;
  }

  :global(.accordion-item[aria-expanded="true"] svg.arrow) {
    transform: rotate(180deg);
  }
  :global(.accordion-item) {
    margin-bottom: 10px;
  }

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 18px 24px 18px 40px;
    background: #4e8538;
    border-radius: 10px;
  }
  .header .column {
    display: flex;
    align-items: center;
  }
  .header .input-ch-sv,
  .input-ch-sv[type="checkbox"] {
    width: 24px;
    height: 24px;
    min-width: 24px;
    margin-right: 8px;
    background: #ffffff;
    border: 1px solid #dddddd;
    border-radius: 3px;
    -webkit-appearance: none;
    appearance: none;
    cursor: pointer;
  }
  .header .input-ch-sv:checked,
  .input-ch-sv[type="checkbox"]:checked {
    background-image: url("https://uploads-ssl.webflow.com/627ca4b5fcfd5674acf264e6/6298c07528d25ce00212030f_svgexport-6.svg");
    background-position: center;
  }
  h2.heading {
    margin-bottom: 16px;
  }
  .green {
    color: #4e8538;
  }
  h3.body__head {
    font-weight: 500;
    font-size: 24px;
    line-height: 48px;
    color: #032b01;
    margin-bottom: 10px;
  }
  .header p {
    text-transform: uppercase;
    color: #ffffff;
  }

  .body {
    max-width: 1170px;
    margin: 0 15px;
    padding: 0px 40px;
    font-size: 18px;
    overflow: auto;
    height: 413px;
    margin-top: 20px;
    margin-bottom: 31px;
  }
  .body p {
    font-size: 16px;
    line-height: 24px;
    color: #053900;
  }

  /* Custom scroll bar */
  /* width */
  .body::-webkit-scrollbar {
    width: 5px;
  }
  /* Track */
  .body::-webkit-scrollbar-track-piece {
    border-radius: 10px;
    background: #daedc4;
  }
  /* Track */
  .body::-webkit-scrollbar-track {
    border-radius: 10px;
  }

  /* Handle */
  .body::-webkit-scrollbar-thumb {
    background: #6cc800;
    border-radius: 10px;
  }
  .agree__all {
    display: flex;
    align-items: center;
    margin: 16px 0 32px 0;
  }

  @media only screen and (max-width: 768px) {
    .legal__wrapper h2,
    .agree__all {
      padding: 0 16px;
    }
    :global(.accordion-item) {
      margin-bottom: 0px;
    }
    .header {
      border-radius: 0;
      border: 1px solid #113535;
    }
    .body {
      padding: 0 17px;
    }
  }
</style>
