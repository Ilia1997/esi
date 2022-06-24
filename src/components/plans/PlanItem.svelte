<script>
  import { beforeUpdate, afterUpdate } from "svelte";
  import { subscribeAllState } from "../../stores/store";
  import {clickOutside} from '../../functions/clickOutside';
  import { priceConvertation } from "../../functions/priceConvertation";
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
  import MobArrow_ico from "../../../public/images/MobArrow_ico.svelte";
  import Checkbox_ico from "../../../public/images/Checkbox_ico.svelte";
  import Dropdown_ico from "../../../public/images/Dropdown_ico.svelte";

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
        <div
          class="dropdown__wrapper"
          class:disabled={$disableAllDropdown === true}
        >
          <div
            class="dropdown {activeState ? activeClass : ''}"
            on:click={() => (activeState = !activeState)}
            use:clickOutside on:click_outside={handleClickOutside}
          >
            <Dropdown_ico />    
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
            {$contributionData.currencySymbol + priceConvertation(Math.round(currentPrice))}
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
    padding: 11px 24px 11px 24px;
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
    opacity: 0.7;
  }
  :global(.item__head__checkbox svg){
    width: 100%;
    height: 100%;
  }
  :global(.subscribe__checkbox svg) {
    opacity: 0;
    width: 100%;
    height: 100%;
    transition: all ease 0.2s;
  }
  :global(.item__head__checkbox svg.visible),
  :global(.subscribe__checkbox svg.visible) {
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
  .dropdown__wrapper {
    position: relative;
    width: 100%;
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
  :global(.dropdown.activeDropdownSave svg),
  :global(.dropdown.activeDropdownAdv svg),
  :global(.dropdown.activeDropdownFound svg) {
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
      max-height: 55rem;
    }
  }
  @media only screen and (max-width: 568px) {
  }
</style>
