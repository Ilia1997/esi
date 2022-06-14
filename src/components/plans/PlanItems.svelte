<script>
  import { beforeUpdate, afterUpdate } from "svelte";
  import { subscribeAllState } from "../../stores/store";
  import {
    planData,
    plansModalState,
    plansModalData,
    sortPersantageVariable,
    disableAllDropdown,
  } from "../../stores/plansStore";
  import {
    contributionData,
    allocatedContributions,
  } from "../../stores/contributionsStore";
  import PlanBtn from "./PlanBtn.svelte";
  import PlanItem from "./PlanItem.svelte";

  let savePercentages;
  $: savePercentages;

  savePercentages = [...planData];

  let safePrice = 0,
    adventurePrice = 0,
    founderPrice = 0;

  let savePlan = "safe",
    advPlan = "adventure",
    foundPlan = "founder";

  let activeDropdownSave = false;
  let activeDropdownAdv = false;
  let activeDropdownFound = false;

  $: allowPercentageVal =
    100 -
    $allocatedContributions.safe -
    $allocatedContributions.adventure -
    $allocatedContributions.founder;

  let current = savePlan;

  beforeUpdate(() => {
    safePrice =
      ($allocatedContributions.safe * $contributionData.monthlyValue) / 100;
    adventurePrice =
      ($allocatedContributions.adventure * $contributionData.monthlyValue) /
      100;
    founderPrice =
      ($allocatedContributions.founder * $contributionData.monthlyValue) / 100;
    if ($disableAllDropdown === true) {
      activeDropdownSave = false;
      activeDropdownAdv = false;
      activeDropdownFound = false;
    }
  });
  afterUpdate(() => {});

  function setPercentage(item, plan) {
    if ($disableAllDropdown === false) {
      $sortPersantageVariable = item.sortName;
      $subscribeAllState = false;
      switch (plan) {
        case "safe":
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
  }

  function showModal(plan) {
    switch (plan) {
      case "safe":
        $plansModalData.class = "safe";
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
</script>

<div class="plans__items">
  <PlanItem
    {current}
    currentPlan={savePlan}
    className="safe"
    {allowPercentageVal}
    {savePercentages}
    currentPrice={safePrice}
    activeClass={"activeDropdownSave"}
    activeState={activeDropdownSave}
    btnText={"Green Safe info"}
    btnClass={"blue"}
  />
  <PlanItem
    {current}
    currentPlan={advPlan}
    className="adventure"
    {allowPercentageVal}
    {savePercentages}
    currentPrice={adventurePrice}
    activeClass={"activeDropdownAdv"}
    activeState={activeDropdownAdv}
    btnText={"Green Adventure info"}
    btnClass={"green"}
  />
  <PlanItem
    {current}
    currentPlan={foundPlan}
    className="founder"
    {allowPercentageVal}
    {savePercentages}
    currentPrice={founderPrice}
    activeClass={"activeDropdownFound"}
    activeState={activeDropdownFound}
    btnText={"Green Founder info"}
    btnClass={"violet"}
  />
</div>

<style>
  .plans__items {
    margin-top: 16px;
    display: flex;
    align-items: flex-start;
  }

  @media only screen and (max-width: 991px) {
    .plans__items {
      flex-wrap: wrap;
      justify-content: center;
      gap: 40px;
    }
  }
  @media only screen and (max-width: 768px) {
    .plans__items {
      margin-top: 20px;
      gap: 0;
    }
  }
</style>
