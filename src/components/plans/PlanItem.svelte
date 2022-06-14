<script>
  import { beforeUpdate, afterUpdate } from "svelte";
  import { subscribeAllState } from "../../stores/store";
  import {clickOutside} from '../../functions/clickOutside';
  import {
    planData,
    plansModalState,
    plansModalData,
    sortPersantageVariable,
    disableAllDropdown,
    planModalData,
    portfolioItems,
  } from "../../stores/plansStore";
  import {
    contributionData,
    allocatedContributions,
  } from "../../stores/contributionsStore";
  import PlanBtn from "./PlanBtn.svelte";
  import Portfolio from "./Portfolio.svelte";

  export let current,
    currentPlan,
    className = "",
    allowPercentageVal,
    savePercentages,
    currentPrice,
    activeClass,
    activeState = false,
    btnText,
    btnClass;

  let modalData = planModalData[0];
  function setPercentage(item, plan) {
    if ($disableAllDropdown === false) {
      $sortPersantageVariable = item.sortName;
      $subscribeAllState = false;
      switch (plan) {
        case "safe":
          $allocatedContributions.safe = item.persentage;
          $allocatedContributions.safeName = item.value;
          break;
        case "adventure":
          $allocatedContributions.adventure = item.persentage;
          $allocatedContributions.adventureName = item.value;
          break;
        case "founder":
          $allocatedContributions.founder = item.persentage;
          $allocatedContributions.founderName = item.value;
          break;
        default:
          console.log("Error");
      }
    }
  }
  let svgIcons = {
    safe: "https://uploads-ssl.webflow.com/627ca4b5fcfd5674acf264e6/627e4841370604453befc5d7_green.svg",
    adventure:
      "https://uploads-ssl.webflow.com/627ca4b5fcfd5674acf264e6/627e4bde122aa36a24438411_tab-icon-02.svg",
    founder:
      "https://uploads-ssl.webflow.com/627ca4b5fcfd5674acf264e6/627e4be882a78868831022d1_founder.svg",
  };

  let currentSvgIcon = svgIcons[className];

  function showModal(plan) {
    $plansModalData.class = modalData[plan].class;
    $plansModalData.name = modalData[plan].head;
    $plansModalData.desc = modalData[plan].desc;
    $plansModalData.lottie = modalData[plan].lottie;

    $plansModalState = true;
  }

// close dropdown by click ouside
function handleClickOutside(event) {
    activeState = false
	}

</script>

<div class="plans__item {className}" class:active={current === currentPlan}>
  <div
    class="item__head"
    on:click={() =>
      current === currentPlan ? (current = "") : (current = currentPlan)}
  >
    <div class="column">
      <img class="plan__icon" src={currentSvgIcon} alt="" />

      <div class="item__head__name">Select GREEN {className}</div>
    </div>
    <div class="column">
      <div class="item__head__checkbox" class:visible={$allocatedContributions[className] != 0}>
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
      <div class="mob__arrow">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          class="arrow"
          ><path
            d="M4.29279 7.30529C4.48031 7.11782 4.73462 7.0125 4.99979 7.0125C5.26495 7.0125 5.51926 7.11782 5.70679 7.30529L11.9998 13.5983L18.2928 7.30529C18.385 7.20978 18.4954 7.1336 18.6174 7.08119C18.7394 7.02878 18.8706 7.00119 19.0034 7.00004C19.1362 6.99888 19.2678 7.02419 19.3907 7.07447C19.5136 7.12475 19.6253 7.199 19.7192 7.29289C19.8131 7.38679 19.8873 7.49844 19.9376 7.62133C19.9879 7.74423 20.0132 7.87591 20.012 8.00869C20.0109 8.14147 19.9833 8.27269 19.9309 8.39469C19.8785 8.5167 19.8023 8.62704 19.7068 8.71929L12.7068 15.7193C12.5193 15.9068 12.265 16.0121 11.9998 16.0121C11.7346 16.0121 11.4803 15.9068 11.2928 15.7193L4.29279 8.71929C4.10532 8.53176 4 8.27745 4 8.01229C4 7.74712 4.10532 7.49282 4.29279 7.30529Z"
            fill="white"
          /></svg
        >
      </div>
    </div>
  </div>
  <div class="item__body">
    <div>
      <div class="item__top">
        <div class="item__top__head">You contribute to Green Safe</div>
        <div
          class="dropdown__wrapper"
          class:disabled={$disableAllDropdown === true}
        >
          <div
            class="dropdown {activeState ? activeClass : ''}"
            on:click={() => (activeState = !activeState)}
            use:clickOutside on:click_outside={handleClickOutside}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M4.29279 7.30529C4.48031 7.11782 4.73462 7.0125 4.99979 7.0125C5.26495 7.0125 5.51926 7.11782 5.70679 7.30529L11.9998 13.5983L18.2928 7.30529C18.385 7.20978 18.4954 7.1336 18.6174 7.08119C18.7394 7.02878 18.8706 7.00119 19.0034 7.00004C19.1362 6.99888 19.2678 7.02419 19.3907 7.07447C19.5136 7.12475 19.6253 7.199 19.7192 7.29289C19.8131 7.38679 19.8873 7.49844 19.9376 7.62133C19.9879 7.74423 20.0132 7.87591 20.012 8.00869C20.0109 8.14147 19.9833 8.27269 19.9309 8.39469C19.8785 8.5167 19.8023 8.62704 19.7068 8.71929L12.7068 15.7193C12.5193 15.9068 12.265 16.0121 11.9998 16.0121C11.7346 16.0121 11.4803 15.9068 11.2928 15.7193L4.29279 8.71929C4.10532 8.53176 4 8.27745 4 8.01229C4 7.74712 4.10532 7.49282 4.29279 7.30529Z"
                fill="#032B01"
              />
            </svg>
            <div class="dropdown__item--current">
              {$allocatedContributions[className]}% Total Contribution
            </div>
            <div class="dropdown__items">
              {#each savePercentages as item}
                <div
                  class="dropdown__item"
                  class:disabled={!item.visibility ||
                    (item.persentage > allowPercentageVal &&
                      allowPercentageVal + $allocatedContributions[className] <
                        item.persentage)}
                  on:click={() => setPercentage(item, currentPlan)}
                >
                  {item.persentage}%
                </div>
              {/each}
            </div>
          </div>
        </div>
        <div class="item__current__money {className}">
          <div class="money">
            {$contributionData.currencySymbol + Math.round(currentPrice)}
          </div>
        </div>
      </div>

      <div class="mob__plan__info">
        <div class="plan__info__head">{modalData[className].head}</div>
        <div class="plan__info__text">{modalData[className].desc}</div>
      </div>
      <Portfolio name={className} />
      <PlanBtn
        content={btnText}
        className={btnClass}
        on:click={() => showModal(currentPlan)}
      />
    </div>
  </div>
</div>

<style>
  .mob__plan__info {
    display: none;
  }
  .plans__items {
    margin-top: 16px;
    display: flex;
    align-items: flex-start;
  }
  .plans__item {
    width: 100%;
    max-width: 387px;
    border-radius: 6px;
    overflow: hidden;
  }
  .plan__icon {
    width: 38px;
    height: 38px;
  }
  .plans__item .item__head {
    display: flex;
    justify-content: space-between;
    padding: 11px 34px 11px 24px;
  }
  .plans__item.safe .item__head {
    background: #338df3;
  }
  .plans__item.adventure .item__head {
    background: #6cc800;
  }
  .plans__item.founder .item__head {
    background: #8336e4;
  }
  .plans__item.safe .item__body {
    background: linear-gradient(
      90deg,
      rgba(168, 224, 255, 0.56) 0.14%,
      rgba(104, 191, 233, 0.42) 59.37%
    );
  }
  .plans__item.adventure .item__body {
    background: linear-gradient(
      243.71deg,
      rgba(138, 196, 72, 0.86) 0%,
      rgba(152, 206, 127, 0.79) 91.93%
    );
  }
  .plans__item.founder .item__body {
    background: linear-gradient(
      249.93deg,
      rgba(195, 145, 217, 0.63) -0.25%,
      rgba(244, 225, 252, 0.8) 100.33%
    );
  }

  .item__head__checkbox,
  .subscribe__checkbox {
    width: 24px;
    height: 24px;
    position: relative;
    background: #ffffff;
    border: 1px solid #dddddd;
    border-radius: 3px;
  }
  .item__head__checkbox{
    opacity: 0;
    transition: all ease 0.2s;
  }
  .item__head__checkbox.visible{
    opacity: 1;
  }
  .item__head__checkbox svg{
    width: 100%;
    height: 100%;
  }
  
  .subscribe__checkbox svg {
    opacity: 0;
    width: 100%;
    height: 100%;
    transition: all ease 0.2s;
  }
  .item__head__checkbox svg.visible,
  .subscribe__checkbox svg.visible {
    opacity: 1;
  }
  .item__head__name {
    color: white;
    text-transform: uppercase;
    margin-left: 8px;
  }
  .mob__arrow {
    margin-left: 10px;
    display: none;
  }

  .item__head .column {
    display: flex;
    align-items: center;
  }
  .item__top {
    padding: 32px 43px 24px 43px;
  }
  .item__top__head {
    color: #000;
    padding: 10px;
  }
  .item__current__money {
    border-radius: 10px;
    width: 100%;
    height: 70px;
    color: #000;
    padding: 23px 30px;
    margin-top: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .item__current__money .money {
    font-weight: 700;
    font-size: 24px;
    line-height: 36px;
    color: #ffffff;
  }
  .item__current__money.safe {
    background: #338df3;
  }
  .item__current__money.adventure {
    background: #6cc800;
  }
  .item__current__money.founder {
    background: #8336e4;
  }

  .portfolio {
    padding: 32px 20px 40px 43px;
    width: 100%;
    min-height: 257px;
    background: rgba(0, 110, 255, 0.25);
    border: 2px solid rgba(0, 110, 255, 0.7);
    color: #fff;
  }
  .plans__item.safe .portfolio {
    background: rgba(0, 110, 255, 0.25);
    border: 2px solid rgba(0, 110, 255, 0.7);
  }
  .plans__item.adventure .portfolio {
    background: rgba(89, 165, 0, 0.25);
    border: 2px solid rgba(89, 165, 0, 0.7);
  }
  .plans__item.founder .portfolio {
    background: rgba(94, 11, 201, 0.25);
    border: 2px solid rgba(94, 11, 201, 0.7);
  }
  .portfolio__head {
    font-weight: 600;
    font-size: 18px;
    line-height: 27px;
  }
  
  .portfolio__heler {
    font-weight: 400;
    font-size: 13px;
    line-height: 20px;
  }

  .dropdown__wrapper {
    position: relative;
    width: 100%;
    max-width: 301px;
    height: 70px;
    font-size: 16px;
    line-height: 24px;
  }
  .dropdown__wrapper.disabled,
  .dropdown__wrapper.disabled * {
    opacity: 0.7;
    pointer-events: none;
    user-select: none;
  }

  .dropdown {
    position: absolute;
    width: 100%;
    padding: 23px 30px;
    cursor: pointer;
    background-color: #fff;
    border: 1px solid #dddddd;
    border-radius: 10px;
  }
  .dropdown svg {
    position: absolute;
    right: 15px;
    z-index: 3;
    top: 25px;
  }
  .dropdown__items {
    display: none;
  }
  .dropdown__item {
    padding: 12px 30px;
    transition: all ease-in 0.3s;
  }
  .dropdown__item.disabled {
    pointer-events: none;
    opacity: 0.5;
  }
  .dropdown__item:hover {
    background-color: #f5f5f5;
  }
  .plans__item.adventure {
    margin: 0 20px;
  }
  .dropdown.activeDropdownSave,
  .dropdown.activeDropdownAdv,
  .dropdown.activeDropdownFound {
    background-color: #fff;
    padding: 11px 0;
  }
  .dropdown.activeDropdownSave svg,
  .dropdown.activeDropdownAdv svg,
  .dropdown.activeDropdownFound svg {
    transform: rotate(180deg);
  }
  .dropdown.activeDropdownSave .dropdown__item--current,
  .dropdown.activeDropdownAdv .dropdown__item--current,
  .dropdown.activeDropdownFound .dropdown__item--current {
    display: none;
  }
  .dropdown.activeDropdownSave .dropdown__items,
  .dropdown.activeDropdownAdv .dropdown__items,
  .dropdown.activeDropdownFound .dropdown__items {
    display: block;
  }

  @media only screen and (max-width: 1280px) {
    .item__top {
      padding: 32px 20px 24px 20px;
    }
    .portfolio {
      padding: 20px;
    }
    .dropdown__item--current,
    .dropdown__item,
    .item__head__name {
      font-size: 14px;
    }
  }
  @media only screen and (max-width: 991px) {
    .plans__items {
      flex-wrap: wrap;
      justify-content: center;
      gap: 40px;
    }
    .plans__item {
      max-width: 340px;
    }
    .plans__item.adventure {
      margin: 0;
    }
    .dropdown__item--current,
    .dropdown__item {
      font-size: 16px;
      line-height: 24px;
      color: #000000;
    }
  }
  @media only screen and (max-width: 768px) {
    .mob__plan__info {
      display: block;
      text-align: center;
      padding: 24px 21px;
      color: #053900;
    }
    .plan__info__head {
      font-weight: 600;
      font-size: 24px;
      line-height: 36px;
    }
    .plan__info__text {
      font-weight: 400;
      font-size: 14px;
      line-height: 21px;
      margin-top: 16px;
    }

    .item__top__head {
      font-size: 16px;
      line-height: 24px;
    }
    .plans__items {
      margin-top: 20px;
      gap: 0;
    }
    .plans__item {
      max-width: 100%;
      border-radius: 0;
    }
    .mob__arrow {
      display: flex;
      align-items: center;
      color: white;
    }

    .dropdown__wrapper {
      max-width: none;
    }
    .portfolio {
      padding: 20px 24px;
      min-height: 150px;
    }

    .plans__item.active .mob__arrow {
      transform: rotate(180deg);
    }
    /* accordion logic style */
    .plans__item .item__body {
      padding: 0;
      max-height: 0rem;
      overflow: hidden;
      transition: all ease 0.4s;
    }
    .plans__item.active .item__body {
      padding-bottom: 36px;
      max-height: 45rem;
    }
  }
  @media only screen and (max-width: 568px) {
    .portfolio ul li {
      font-weight: 400;
      font-size: 12px;
      line-height: 36px;
    }
    .portfolio__heler {
      font-size: 10px;
      line-height: 15px;
    }
  }
</style>
