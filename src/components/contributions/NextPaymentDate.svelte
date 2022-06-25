<script>
  import { contributionData } from "../../stores/contributionsStore";

  let currentDate = new Date();
  let currentYear = currentDate.getFullYear();
  let currentDay = currentDate.getDate();

  $: currentYear;

  if ($contributionData.nextPaymentMonth === "January") {
    if ($contributionData.period === "Monthly") {
      currentYear = currentYear + 1;
    } else if ($contributionData.period === "Bi-Monthly" && currentDay >= 15) {
      currentYear = currentYear + 1;
    }
  }
</script>

<div class="next__payment">
  *The next payment will be on the <span
    >{$contributionData.nextPaymentMonth}</span
  > <span class="payment__day">{$contributionData.nextPaymentDay}st</span>
  <span class="currentYear">{currentYear}</span>
</div>

<style>
  .next__payment {
    max-width: 266px;
    margin: 0 0 12px 47px;
    color: var(--main-text-color);
  }
  .next__payment span {
    font-weight: var(--font-weight-bolder);
  }
  .payment__day {
    font-size: 20px;
  }
  @media only screen and (max-width: 991px) {
    .next__payment{
      display: none;
    }
  }
</style>
