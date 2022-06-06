<script>
  import { plansModalState, plansModalData } from "../../stores/store";

  let lottieWidth = 450;
  if ($plansModalData.class === "save") {
    lottieWidth = 370;
  }
  import { LottiePlayer } from "@lottiefiles/svelte-lottie-player";
</script>

<div class="pop_up {$plansModalData.class}">
  <div class="column">
    <div class="content">
      <div class="content__head">{$plansModalData.name}</div>
      <div class="content__text">{$plansModalData.desc}</div>
    </div>
  </div>
  <div class="column">
    <div class="littie__wrapper">
      <LottiePlayer
        src={$plansModalData.lottie}
        autoplay={true}
        loop={true}
        renderer="svg"
        background="transparent"
        width={lottieWidth}
      />
    </div>
  </div>
  <div class="close__icon" on:click={() => ($plansModalState = false)}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M10.6739 11.9999L3.83691 18.8369L5.16291 20.1629L11.9999 13.3259L18.8369 20.1629L20.1629 18.8369L13.3259 11.9999L20.1629 5.16291L18.8369 3.83691L11.9999 10.6739L5.16291 3.83691L3.83691 5.16291L10.6739 11.9999Z"
        fill="white"
      />
    </svg>
  </div>
</div>

<style>
  .pop_up {
    margin-top: 16px;
    padding: 64px;
    display: flex;
    width: 100%;
    box-shadow: 0px 25px 35px rgba(0, 0, 0, 0.15);
    position: relative;
  }
  .close__icon {
    position: absolute;
    top: 24px;
    right: 24px;
    cursor: pointer;
    transition: all ease 0.2s;
    z-index: 2;
  }
  .close__icon:hover {
    opacity: 0.5;
  }
  .pop_up.save {
    background: #006eff;
  }
  .pop_up.adventure {
    background: #6db94f;
  }
  .pop_up.founder {
    background: #5e0bc9;
  }

  .content {
    color: #ffffff;
    max-width: 417px;
    margin-right: 74px;
  }
  .content__head {
    font-weight: 600;
    font-size: 36px;
    line-height: 54px;
  }
  .content__text {
    margin-top: 16px;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
  }
  .littie__wrapper {
    width: 450px;
    height: 650px;
    background: white;
    box-shadow: 0px 25px 35px rgba(0, 0, 0, 0.15);
    border-radius: 20px;
    overflow: hidden;
    display: flex;
    justify-content: center;
  }
  @media only screen and (max-width: 991px) {
    .pop_up {
      flex-direction: column;
    }
    .content{
      margin: 0 0 40px 0;
    }
  }
</style>
