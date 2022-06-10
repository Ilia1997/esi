<script>
  import { Accordion, AccordionItem } from "svelte-collapsible";
  let openedKey = "a";
  import { checkboxStates, legalItems } from "./legalStore";
  import { headSteps, incrementStep, decrementStep } from "../../stores/store";
  import ButtonLeft from "../buttons/ButtonLeft.svelte";
  import ButtonRight from "../buttons/ButtonRight.svelte";
  let changeCounter = 0;

  function agreeAllTerms(e) {
    if (e.target.checked) {
      $checkboxStates.a = true;
      $checkboxStates.b = true;
      $checkboxStates.c = true;
    } else {
      $checkboxStates.a = false;
      $checkboxStates.b = false;
      $checkboxStates.c = false;
    }
  }

  let prevStep = () => {
    decrementStep();
  };

  let nextStep = () => {
    let state = Object.values($checkboxStates).every((value) => value === true);
    if (state) {
      $headSteps.fourthStep = true;
      if (changeCounter === 0) {
        incrementStep();
        changeCounter += 1;
      }
    } else {
      alert("fill all checkbox");
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
                on:click={(e) => {
                  e.stopPropagation();
                  console.log("clicked");
                }}
                bind:checked={$checkboxStates[item.key]}
              />
              <p>I agree to {item.name}</p>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              class="arrow"
            >
              <path
                d="M4.29279 7.30529C4.48031 7.11782 4.73462 7.0125 4.99979 7.0125C5.26495 7.0125 5.51926 7.11782 5.70679 7.30529L11.9998 13.5983L18.2928 7.30529C18.385 7.20978 18.4954 7.1336 18.6174 7.08119C18.7394 7.02878 18.8706 7.00119 19.0034 7.00004C19.1362 6.99888 19.2678 7.02419 19.3907 7.07447C19.5136 7.12475 19.6253 7.199 19.7192 7.29289C19.8131 7.38679 19.8873 7.49844 19.9376 7.62133C19.9879 7.74423 20.0132 7.87591 20.012 8.00869C20.0109 8.14147 19.9833 8.27269 19.9309 8.39469C19.8785 8.5167 19.8023 8.62704 19.7068 8.71929L12.7068 15.7193C12.5193 15.9068 12.265 16.0121 11.9998 16.0121C11.7346 16.0121 11.4803 15.9068 11.2928 15.7193L4.29279 8.71929C4.10532 8.53176 4 8.27745 4 8.01229C4 7.74712 4.10532 7.49282 4.29279 7.30529Z"
                fill="white"
              />
            </svg>
          </div>
          <div slot="body" class="body">
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
        type="checkbox"
        on:change={(e) => {
          agreeAllTerms(e);
        }}
      />
      <p>
        I agree to all Terms & Conditions, Contract Agreement, Privacy & Cookie
      </p>
    </div>
  </div>

  <div class="bottom__btns">
    <ButtonLeft on:click={prevStep} />
    <ButtonRight on:click={nextStep} />
  </div>
</div>



<style>
  .legal__wrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
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
  .header input,
  input[type="checkbox"] {
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
  .header input:checked,
  input[type="checkbox"]:checked {
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
