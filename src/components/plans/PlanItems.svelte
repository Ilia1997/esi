<script>
  import { beforeUpdate, afterUpdate } from "svelte";
  import {
    contributionData,
    allocatedContributions,
    plansModalState,
    plansModalData,
    sortPersantageVariable,
    planData,
    firstClickedDropdown,
    subscribeAllState
  } from "../../stores/store";
  import PlanBtn from "./PlanBtn.svelte";

  let savePercentages;
  $: savePercentages;

  savePercentages = [...planData];

  let safePrice = 0,
    adventurePrice = 0,
    founderPrice = 0;

  beforeUpdate(() => {
    safePrice =
      ($allocatedContributions.safe * $contributionData.monthlyValue) / 100;
    adventurePrice =
      ($allocatedContributions.adventure * $contributionData.monthlyValue) /
      100;
    founderPrice =
      ($allocatedContributions.founder * $contributionData.monthlyValue) / 100;

    // set allow point to dropdown
    switch ($sortPersantageVariable) {
      case "all":
        savePercentages = [...planData];
        break;
      case "fourth":
        savePercentages = planData.map((n) =>
          n.sortName === "third" ? { ...n, visibility: !n.visibility } : n
        );
        break;
      case "third":
        savePercentages = planData.map((n) =>
          n.sortName === "fourth" ? { ...n, visibility: !n.visibility } : n
        );
        break;
    }
  });
  afterUpdate(() => {});

  let savePlan = "save",
    advPlan = "adv",
    foundPlan = "found";

  let activeDropdownSave = false;
  let activeDropdownAdv = false;
  let activeDropdownFound = false;

  $: allowPercentageVal =
    100 -
    $allocatedContributions.safe -
    $allocatedContributions.adventure -
    $allocatedContributions.founder;

  function setPercentage(item, plan) {
    $sortPersantageVariable = item.sortName;
    $subscribeAllState = false;
    switch (plan) {
      case "save":
        $allocatedContributions.safe = item.persentage;
        $allocatedContributions.safeName = item.value;
        break;
      case "adv":
        $allocatedContributions.adventure = item.persentage;
        $allocatedContributions.adventureName = item.value;
        break;
      case "found":
        $allocatedContributions.founder = item.persentage;
        $allocatedContributions.founderName = item.value;
        break;
      default:
        console.log("Error");
    }
  }

  function showModal(plan) {
    switch (plan) {
      case "save":
        $plansModalData.class = "save";
        $plansModalData.name = "Green Safe";
        $plansModalData.desc =
          "Safe as a bank account. This fund invests exclusively in green bonds and is the perfect option for Green Savers who want to be sure their funds are secure. The Green Safe plan involves a commitment to institutional and governmental bonds and enables subscribers to have a global, national, and local impact.";
        $plansModalData.lottie =
          "https://uploads-ssl.webflow.com/627ca4b5fcfd5674acf264e6/6281f1b9694dfd538fae0ee3_Safe.json";
        break;
      case "adv":
        $plansModalData.class = "adventure";
        $plansModalData.name = "Green Adventure";
        $plansModalData.desc =
          "A growth fund with more risks and more rewards. The Green Adventure plan is for Green Savers who want to put their funds toward ventures that have a significantly more direct impact on mitigating climate change and are devoted to creating and developing green businesses around the world. The plan also includes investments in green equities to reward companies that already make a difference and an activism investment fund for pressuring companies to become green.";
        $plansModalData.lottie =
          "https://uploads-ssl.webflow.com/627ca4b5fcfd5674acf264e6/628203b9fca88d2dde5b697f_Adventure.json";
        break;
      case "found":
        $plansModalData.class = "founder";
        $plansModalData.name = "Green Change";
        $plansModalData.desc =
          "The ESi future is green, and we want YOU to be part of it. Becoming a founder Green Saver involves owning part of ESi. This option is limited to a predetermined target, and you will own a portion of ESi based on your contribution up to a collective 35% of ESi capital. Our vision is to create a sustainable green finance ecosystem making ethical green investing accessible. Collectively, we plan to become the most prominent green investor and green financial product provider.";
        $plansModalData.lottie =
          "https://uploads-ssl.webflow.com/627ca4b5fcfd5674acf264e6/628203e11d51fd22eede66f3_Founder.json";
        break;
      default:
        console.log("Error");
    }
    $plansModalState = true;
  }
  function setFirstClikedItem(name) {
    // switch (name){
    //   case'save':
    //   if($allocatedContributions.safe === 0 && $allocatedContributions.founder + $allocatedContributions.adventure < 1){
    //    $firstClickedDropdown.safe = true;
    //    console.log($firstClickedDropdown)
    //   }else if ($allocatedContributions.safe === 0 &&  $allocatedContributions.founder + $allocatedContributions.adventure < 1 && sortPersantageVariable === 'all'){
    //     $firstClickedDropdown.safe = false;
    //    console.log($firstClickedDropdown)
    //   }
    //   break
    // }
  }
</script>

<div class="plans__items">
  <div class="plans__item save">
    <div class="item__head">
      <div class="column">
        <img
          class="plan__icon"
          src="https://uploads-ssl.webflow.com/627ca4b5fcfd5674acf264e6/627e4841370604453befc5d7_green.svg"
          alt=""
        />

        <div class="item__head__name">Select GREEN SAFE</div>
      </div>
      <div class="column">
        <!-- <div class="current__value">
          {$contributionData.currencySymbol + safePrice}
        </div> -->
        <div class="item__head__checkbox">
          <svg
            class:visible={$allocatedContributions.safe != 0}
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
      </div>
    </div>
    <div class="item__body">
      <div>
        <div class="item__top">
          <div class="item__top__head">You contribute to Green Safe</div>
          <div
            class="dropdown__wrapper"
            on:click={() => setFirstClikedItem(savePlan)}
          >
            <div
              class="dropdown"
              class:activeDropdownSave
              on:click={() => (activeDropdownSave = !activeDropdownSave)}
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
                {$allocatedContributions.safeName}
              </div>
              <div class="dropdown__items">
                {#each savePercentages as item}
                  <div
                    class="dropdown__item"
                    class:disabled={!item.visibility ||
                      (item.persentage > allowPercentageVal &&
                        allowPercentageVal + $allocatedContributions.safe <
                          item.persentage)}
                    on:click={() => setPercentage(item, savePlan)}
                  >
                    {item.value}
                  </div>
                {/each}
              </div>
            </div>
          </div>
          <div class="item__current__money safe">
            <div class="percents">{$allocatedContributions.safe}%</div>
            <div class="money">
              {$contributionData.currencySymbol + Math.round(safePrice)}
            </div>
            
          </div>
        </div>
        <div class="portfolio">
          <div class="portfolio__head">Portfolio</div>
          <ul>
            <li>50% international green bonds</li>
            <li>25% national green bonds</li>
            <li>25% municipal or provincial green bonds*</li>
          </ul>
          <div class="portfolio__heler">
            *depending on availability and contribution size
          </div>
        </div>
        <PlanBtn
          content={"Green Safe info"}
          className={"blue"}
          on:click={() => showModal(savePlan)}
        />
      </div>
    </div>
  </div>
  <div class="plans__item adventure">
    <div class="item__head">
      <div class="column">
        <img
          src="https://uploads-ssl.webflow.com/627ca4b5fcfd5674acf264e6/627e4bde122aa36a24438411_tab-icon-02.svg"
          alt=""
          class="plan__icon"
        />
        <div class="item__head__name">Select GREEN Adventure</div>
      </div>
      <div class="column">
        <!-- <div class="current__value">
          {$contributionData.currencySymbol + adventurePrice}
        </div> -->
        <div class="item__head__checkbox">
          <svg
            class:visible={$allocatedContributions.adventure != 0}
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
      </div>
    </div>
    <div class="item__body">
      <div>
        <div class="item__top">
          <div class="item__top__head">You contribute to Green Safe</div>
          <div class="dropdown__wrapper">
            <div
              class="dropdown"
              class:activeDropdownAdv
              on:click={() => (activeDropdownAdv = !activeDropdownAdv)}
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
                {$allocatedContributions.adventureName}
              </div>
              <div class="dropdown__items">
                {#each savePercentages as item}
                  <div
                    class="dropdown__item"
                    class:disabled={!item.visibility ||
                      (item.persentage > allowPercentageVal &&
                        allowPercentageVal + $allocatedContributions.adventure <
                          item.persentage)}
                    on:click={() => setPercentage(item, advPlan)}
                  >
                    {item.value}
                  </div>
                {/each}
              </div>
            </div>
          </div>
          <div class="item__current__money adventure">
            <div class="percents">{$allocatedContributions.adventure}%</div>
            <div class="money">
              {$contributionData.currencySymbol + Math.round(adventurePrice)}
            </div>
          </div>
        </div>
        <div class="portfolio">
          <div class="portfolio__head">Portfolio</div>
          <ul>
            <li>50% venture investment</li>
            <li>25% green stock</li>
            <li>25% green activism investment</li>
          </ul>
          <div class="portfolio__heler" />
        </div>
        <PlanBtn
          content={"Green Adventure info"}
          className={"green"}
          on:click={() => showModal(advPlan)}
        />
      </div>
    </div>
  </div>
  <div class="plans__item founder">
    <div class="item__head">
      <div class="column">
        <img
          src="https://uploads-ssl.webflow.com/627ca4b5fcfd5674acf264e6/627e4be882a78868831022d1_founder.svg"
          alt=""
          class="plan__icon"
        />
        <div class="item__head__name">Green Founder</div>
      </div>
      <div class="column">
        <!-- <div class="current__value">
          {$contributionData.currencySymbol + founderPrice}
        </div> -->
        <div class="item__head__checkbox">
          <svg
            class:visible={$allocatedContributions.founder != 0}
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
      </div>
    </div>
    <div class="item__body">
      <div>
        <div class="item__top">
          <div class="item__top__head">You contribute to Green Safe</div>
          <div class="dropdown__wrapper">
            <div
              class="dropdown"
              class:activeDropdownFound
              on:click={() => (activeDropdownFound = !activeDropdownFound)}
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
                {$allocatedContributions.founderName}
              </div>
              <div class="dropdown__items">
                {#each savePercentages as item}
                  <div
                    class="dropdown__item"
                    class:disabled={!item.visibility ||
                      (item.persentage > allowPercentageVal &&
                        allowPercentageVal + $allocatedContributions.founder <
                          item.persentage)}
                    on:click={() => {
                      setPercentage(item, foundPlan);
                    }}
                  >
                    {item.value}
                  </div>
                {/each}
              </div>
            </div>
          </div>
          <div class="item__current__money founder">
            <div class="percents">{$allocatedContributions.founder}%</div>
            <div class="money">
              {$contributionData.currencySymbol + Math.round(founderPrice)}
            </div>
          </div>
        </div>
        <div class="portfolio">
          <div class="portfolio__head">Portfolio</div>
          <ul>
            <li>100% invest in ESi capital</li>
          </ul>
          <div class="portfolio__heler">
            *Limited offer of 150K shares at 20$ per share for 35% equity stake
          </div>
        </div>
        <PlanBtn
          content={"Green Founder info"}
          className={"violet"}
          on:click={() => showModal(foundPlan)}
        />
      </div>
    </div>
  </div>
</div>

<style>
  .plans__items {
    margin-top: 16px;
    display: flex;
    align-items: center;
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
  .plans__item.save .item__head {
    background: #338df3;
  }
  .plans__item.adventure .item__head {
    background: #6cc800;
  }
  .plans__item.founder .item__head {
    background: #8336e4;
  }
  .plans__item.save .item__body {
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
  .item__head__checkbox svg,
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
  .item__head .current__value {
    font-weight: 700;
    color: white;
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
    justify-content: space-between;
    align-items: center;
  }
  .item__current__money .percents {
    color: #ffffff;
  }
  .item__current__money .money {
    font-weight: 600;
    font-size: 20px;
    line-height: 30px;
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
  /* founder   #6CC800*/

  .portfolio {
    padding: 32px 20px 40px 43px;
    width: 100%;
    min-height: 257px;
    background: rgba(0, 110, 255, 0.25);
    border: 2px solid rgba(0, 110, 255, 0.7);
    color: #fff;
  }
  .plans__item.save .portfolio {
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
  .portfolio ul {
    padding-left: 25px;
    margin: 10px 0 6px 0;
    max-width: 291px;
  }
  .portfolio ul li {
    font-weight: 400;
    font-size: 16px;
    line-height: 30px;
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
  .dropdown {
    position: absolute;
    width: 100%;
    padding: 23px 30px;
    cursor: pointer;
    background-color: #fff;
    border: 1px solid #dddddd;
    border-radius: 10px;
    z-index: 2;
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
</style>
