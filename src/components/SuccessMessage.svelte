<script>
  import { afterUpdate, onMount } from "svelte";
  import Button_right_ico from "../../public/images/Button_right_ico.svelte";

  let inputDay, inputHour, inputMin, inputSec;
  let counterVisibility = true;
  let sumOfDateNumbers;
  $: sumOfDateNumbers, counterVisibility;
  function countdown() {
    const timeSpan =
      new Date("September 1,2022 00:00:00").getTime() - new Date().getTime();

    // 1day = 86400000 milisec, 1hour = 3600000 milisec, 1minute = 60000 milisec
    inputDay = Math.floor(timeSpan / 86400000);
    inputHour = Math.floor((timeSpan % 86400000) / 3600000);
    inputMin = Math.floor((timeSpan % 3600000) / 60000);
    inputSec = Math.floor((timeSpan % 60000) / 1000);
  }

  let setTimeItnerval = setInterval(countdown, 1000);

  afterUpdate(() => {
    sumOfDateNumbers = inputDay + inputHour + inputMin + inputSec;
    if (sumOfDateNumbers <= 0) {
      counterVisibility = false;
      clearInterval(setTimeItnerval);
    }
  });
  onMount(countdown);
</script>

<div class="success__message">
  <div class="success__top-sv"><div>You are now a Green Saver!</div></div>
  <div class="success__body">
    <div class="like_h2">
      You have opened your account <span class="green"
        >and added a payment/ withdraw source!
      </span>
      <div class="like_h2">
        Welcome to ESi <span class="green">green saver!</span>
      </div>
    </div>
    {#if counterVisibility}
      <div class="under__development">
        <p>
          <span class="green">Esi </span>is currently under development,
          <span class="green">starting</span> September 1, 2022
        </p>

        <div class="countdown__wrapper">
          <div class="countdown__item">
            <div class="value">{inputDay}</div>
            <span>days</span>
          </div>
          <div class="dots">:</div>
          <div class="countdown__item">
            <div class="value">{inputHour}</div>
            <span>hours</span>
          </div>
          <div class="dots">:</div>
          <div class="countdown__item">
            <div class="value">{inputMin}</div>
            <span>minutes</span>
          </div>
          <div class="dots">:</div>
          <div class="countdown__item">
            <div class="value">{inputSec}</div>
            <span>seconds</span>
          </div>
        </div>
      </div>
    {/if}

    <button class="btn-sv login" disabled={counterVisibility}>
      <span>Log In</span> <Button_right_ico className={"white"} /></button
    >
    <p class="success__content">Share with your friends</p>
    <div class="success__icons">
      <a href="#" class="success__icon w-inline-block"
        ><img
          src="https://uploads-ssl.webflow.com/627ca4b5fcfd5674acf264e6/628b8ff16ae2f89abf979078_Facebook%20-%20Negative.svg"
          loading="lazy"
          alt=""
        /></a
      ><a href="#" class="success__icon w-inline-block"
        ><img
          src="https://uploads-ssl.webflow.com/627ca4b5fcfd5674acf264e6/628b9087dc3e1e5c47d96b35_entypo-social_linkedin-with-circle.svg"
          loading="lazy"
          alt=""
        /></a
      ><a href="#" class="success__icon w-inline-block"
        ><img
          src="https://uploads-ssl.webflow.com/627ca4b5fcfd5674acf264e6/628b9097061243a2b52c214a_ant-design_twitter-circle-filled.svg"
          loading="lazy"
          alt=""
        /></a
      >
    </div>
  </div>
</div>

<style>
  .btn-sv.login {
    background: var(--btn-color);
    border: none;
    color: #fff;
    padding: 21px 79px;
    margin: 32px auto;
  }
  .btn-sv.login:disabled {
    background: var(--btn-color) !important;
    border: none !important;
    pointer-events: none !important;
    opacity: 0.5;
  }

  .btn-sv.login:hover {
    background-color: var(--btn-color-hover);
  }
  .btn-sv.login span {
    font-weight: var(--font-weight-bold);
    margin-right: 10px;
  }

  .countdown__wrapper {
    display: grid;
    grid-template-columns: 1fr auto 1fr auto 1fr auto 1fr;
    grid-column-gap: 11px;
    max-width: 491px;
    margin: 14px auto 0 auto;
    align-items: center;
  }
  .dots {
    font-size: 13px;
    line-height: 20px;
    color: #7d7d7d;
  }
  .under__development {
    margin: 24px 0 0 0;
  }
  .under__development p,
  .under__development span.green {
    font-size: var(--text-size-normal);
    font-weight: var(--font-weight-normal);
    color: var(--main-text-color);
  }
  .under__development span.green {
    color: var(--success-color);
  }
  .countdown__item {
    padding: 24px;
    border: 1px solid #dce9d3;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .value {
    font-size: 20px;
    line-height: 30px;
    font-weight: var(--font-weight-bold);
  }
  .countdown__item span {
    font-size: 13px;
    line-height: 20px;
    color: #7d7d7d;
  }
  .success__message {
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0px 0px 67px;
    background-color: transparent;
    position: relative;
    min-height: 690px;
    background: rgba(255, 255, 255, 0.8);
    box-shadow: 0px 25px 35px rgba(0, 0, 0, 0.15),
      inset 0px 0px 35px rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(5px);
    border-radius: 0px 10px 10px 10px;
  }
  .like_h2 span {
    font-weight: var(--font-weight-medium);
    font-size: var(--h2-size);
    line-height: var(--h2-line-height);
  }

  .success__top-sv {
    position: absolute;
    left: 0%;
    top: 0%;
    right: 0%;
    bottom: auto;
    width: 100%;
    padding-top: 13.5px;
    padding-bottom: 13.5px;
    background-color: var(--success-color);
    color: var(--white-color);
    font-size: var(--text-size-small);
    line-height: 21px;
    text-align: center;
  }
  .success__body {
    text-align: center;
    padding: 0 20px;
    max-width: 625px;
    margin-top: 97px;
    margin-right: auto;
    margin-left: auto;
  }
  .like_h2 {
    font-weight: var(--font-weight-medium);
    font-size: var(--h2-size);
    line-height: var(--h2-line-height);
  }
  .green {
    color: var(--success-color);
  }
  .success__content {
    margin-top: 32px;
    margin-bottom: 24px;
  }
  .success__icons {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    width: 162px;
    margin-right: auto;
    margin-left: auto;
    -webkit-box-pack: justify;
    -webkit-justify-content: space-between;
    -ms-flex-pack: justify;
    justify-content: space-between;
  }
  .success__icon {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    width: 36px;
    height: 36px;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    border-radius: 50%;
    background-color: rgba(0, 110, 255, 0.1);
    -webkit-transition: all 300ms ease;
    transition: all 300ms ease;
  }
  @media only screen and (max-width: 768px) {
    .like_h2,
    .like_h2 span {
      font-size: 20px;
      line-height: 28px;
      font-weight: var(--font-weight-bold);
    }
    .countdown__item {
      padding: 14px;
    }
    .countdown__wrapper {
      grid-column-gap: 11px;
    }
  }
  @media only screen and (max-width: 480px) {
    .countdown__item {
      padding: 7px;
      width: 70px;
      height: 78px;
    }
    .countdown__wrapper {
      grid-template-columns: 70px auto 70px auto 70px auto 70px;
      grid-column-gap: 4px;
    }
    .under__development p {
      padding: 0 10px;
    }
    .btn-sv.login {
      margin-top: 24px;
    }
  }
</style>
