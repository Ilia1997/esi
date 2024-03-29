<script>
  import { subscribeAllState } from "../../stores/store";
  import { clickOutside } from "../../functions/clickOutside";
  import { priceConvertation } from "../../functions/priceConvertation";
  import {
    plansModalState,
    plansModalData,
    sortPersantageVariable,
    planModalData,
    errorMessageState,
  } from "../../stores/plansStore";
  import {
    contributionData,
    allocatedContributions,
  } from "../../stores/contributionsStore";
  import PlanBtn from "./PlanBtn.svelte";
  import Portfolio from "./Portfolio.svelte";
  import MobArrow_ico from "../../../public/images/MobArrow_ico.svelte";
  import Checkbox_ico from "../../../public/images/Checkbox_ico.svelte";
  import Dropdown_ico from "../../../public/images/Dropdown_ico.svelte";
  import Tooltip from "./Tooltip.svelte";

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
  function setPercentage(item, plan, disableState) {
    if (disableState) {
      return false;
    } else {
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
    $errorMessageState = false;
    activeState = !activeState;
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
    document.body.classList.add("o-hidden");
    $plansModalState = true;
  }

  // close dropdown by click ouside
  function handleClickOutside(event) {
    activeState = false;
  }
  function checkItemDisableState(item) {
    let status =
      item.persentage > allowPercentageVal &&
      allowPercentageVal + $allocatedContributions[className] < item.persentage;
    return status;
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
      <div
        class="item__head__checkbox"
        class:visible={$allocatedContributions[className] != 0}
      >
        <Checkbox_ico />
      </div>
      <div class="mob__arrow">
        <MobArrow_ico />
      </div>
    </div>
  </div>
  <div class="item__body">
    <div>
      <div class="item__top">
        <div class="item__top__head">You contribute to Green Safe</div>
        <div class="dropdown__wrapper">
          <div
            class="dropdown  {activeState ? activeClass : ''} plan__dropdown"
            use:clickOutside
            class:error={$errorMessageState}
            on:click_outside={handleClickOutside}
          >
            <Dropdown_ico
              on:click={() => {
                $errorMessageState = false;
                activeState = !activeState;
              }}
            />
            <div
              class="dropdown__item--current"
              on:click={() => {
                $errorMessageState = false;
                activeState = !activeState;
              }}
            >
              {$allocatedContributions[className]}% Total Contribution
            </div>
            <div class="dropdown__items">
              {#each savePercentages as item}
                {#if item.persentage > allowPercentageVal && allowPercentageVal + $allocatedContributions[className] < item.persentage}
                  <div style="position:relative">
                    <Tooltip title={"Remove allocation from other plans"}>
                      <div
                        class="dropdown__item"
                        class:disabled={item.persentage > allowPercentageVal &&
                          allowPercentageVal +
                            $allocatedContributions[className] <
                            item.persentage}
                        on:click={function () {
                          let status = checkItemDisableState(item);
                          setPercentage(item, currentPlan, status);
                        }}
                      >
                        {item.persentage}%
                      </div>
                    </Tooltip>
                  </div>
                {:else}
                  <div
                    class="dropdown__item"
                    class:disabled={item.persentage > allowPercentageVal &&
                      allowPercentageVal + $allocatedContributions[className] <
                        item.persentage}
                    on:click={function () {
                      let status = checkItemDisableState(item);
                      setPercentage(item, currentPlan, status);
                    }}
                  >
                    {item.persentage}%
                  </div>
                {/if}
              {/each}
            </div>
          </div>
        </div>
        <div class="item__current__money {className}">
          <div class="money">
            {$contributionData.country.currency.symbol +
              priceConvertation(Math.round(currentPrice * 100) / 100)}
          </div>
        </div>
      </div>

      <div class="mob__plan__info">
        <div class="plan__info__head">{modalData[className].head}</div>
        <div class="plan__info__text">{modalData[className].desc}</div>
      </div>
      <Portfolio name={className} />
    </div>
    <PlanBtn
      content={btnText}
      className={btnClass}
      on:click={() => showModal(currentPlan)}
    />
  </div>
</div>

<style>
  .mob__plan__info {
    display: none;
  }
  .plans__items {
    margin-top: 8px;
    display: flex;
    align-items: flex-start;
  }
  .plans__item {
    width: 100%;
    max-width: 387px;
    border-radius: 6px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }
  .plan__icon {
    width: 38px;
    height: 38px;
  }
  .plans__item .item__head {
    display: flex;
    justify-content: space-between;
    padding: 11px 24px 11px 24px;
  }
  .plans__item.safe .item__head {
    background: var(--plan-safe-bg);
  }
  .plans__item.adventure .item__head {
    background: var(--plan-adventure-bg);
  }
  .plans__item.founder .item__head {
    background: var(--plan-founder-bg);
  }
  .plans__item .item__body {
    height: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
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
  .item__head__checkbox {
    width: 24px;
    height: 24px;
    position: relative;
    background: var(--white-color);
    border: 1px solid var(--border-color);
    border-radius: 3px;
    opacity: 0;
    transition: all ease 0.2s;
  }

  .item__head__checkbox.visible {
    opacity: 0.7;
  }

  .item__head__name {
    color: var(--white-color);
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
    padding: 24px 43px 18px 43px;
  }
  .item__top__head {
    color: var(--black-color);
    padding: 10px;
  }
  .item__current__money {
    border-radius: 10px;
    width: 100%;
    height: 65px;
    color: var(--black-color);
    padding: 19px 30px;
    margin-top: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .item__current__money .money {
    font-weight: var(--font-weight-bolder);
    font-size: var(--h3-size);
    line-height: var(--h3-line-height);
    color: var(--white-color);
  }
  .item__current__money.safe {
    background: var(--plan-safe-bg);
  }
  .item__current__money.adventure {
    background: var(--plan-adventure-bg);
  }
  .item__current__money.founder {
    background: var(--plan-founder-bg);
  }
  .portfolio {
    padding: 20px 30px;
    width: 100%;
    min-height: 240px;
    background: var(--plan-safe-portfolio-bg);
    border: 2px solid var(--plan-safe-portfolio-border);
    color: var(--white-color);
  }
  .plans__item.safe .portfolio {
    background: var(--plan-safe-portfolio-bg);
    border: 2px solid var(--plan-safe-portfolio-border);
  }
  .plans__item.adventure .portfolio {
    background: var(--plan-adventure-portfolio-bg);
    border: 2px solid var(--plan-adventure-portfolio-border);
  }
  .plans__item.founder .portfolio {
    background: var(--plan-founder-portfolio-bg);
    border: 2px solid var(--plan-founder-portfolio-border);
  }
  .portfolio__head {
    font-weight: var(--font-weight-bold);
    font-size: 18px;
    line-height: 27px;
  }
  .dropdown__wrapper {
    position: relative;
    width: 100%;
    height: 65px;
  }
  .dropdown__wrapper.disabled,
  .dropdown__wrapper.disabled * {
    opacity: 0.7;
    user-select: none;
  }
  .dropdown {
    position: absolute;
    width: 100%;
    cursor: pointer;
    background-color: var(--white-color);
    border: 1px solid var(--border-color);
    border-radius: 10px;
  }
  .dropdown.error {
    border-color: var(--error-color);
  }
  .dropdown__items {
    display: none;
  }
  .dropdown__item {
    position: relative;
    padding: 12px 30px;
    transition: all ease-in 0.3s;
  }
  .dropdown__item--current {
    padding: 19px 30px;
  }
  .dropdown__item.disabled {
    /* pointer-events: none; */
    opacity: 0.5;
  }
  .dropdown__item:hover {
    background-color: var(--grey-color-lightest);
  }
  .plans__item.adventure {
    margin: 0 20px;
  }
  .dropdown.activeDropdownSave,
  .dropdown.activeDropdownAdv,
  .dropdown.activeDropdownFound {
    background-color: var(--white-color);
    padding: 11px 0;
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
      font-size: var(--text-size-small);
    }
  }
  @media only screen and (max-width: 1080px) and (min-width: 991px) {
    .dropdown__item--current {
      padding: 19px 25px;
    }
  }

  @media only screen and (max-width: 991px) {
    .plans__item.adventure {
      margin: 0;
    }
    .dropdown__item--current,
    .dropdown__item {
      color: var(--black-color);
    }
    .mob__plan__info {
      display: block;
      text-align: center;
      padding: 24px 21px;
      color: var(--color-darkest);
    }
    .plan__info__head {
      font-weight: var(--font-weight-bold);
      font-size: var(--h3-size);
      line-height: var(--h3-line-height);
    }
    .plan__info__text {
      font-size: var(--text-size-small);
      line-height: 21px;
      margin-top: 16px;
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
      color: var(--white-color);
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
      max-height: 55rem;
    }
  }
  @media only screen and (max-width: 480px) {
    .item__head__checkbox {
      width: 16px;
      display: flex;
      height: 16px;
    }
  }
</style>
