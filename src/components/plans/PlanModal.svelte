<script>
  import { plansModalState, plansModalData } from "../../stores/plansStore"
	import {clickOutside} from '../../functions/clickOutside'
  import { LottiePlayer } from "@lottiefiles/svelte-lottie-player";
  import Close_ico from "../../../public/images/Close_ico.svelte";

  let lottieWidth = 450;
  if ($plansModalData.class === "safe") {
    lottieWidth = 370;
  }
  function handleClickOutside(event) {
		$plansModalState = false
	}

</script>

<div class="pop_up {$plansModalData.class}" use:clickOutside on:click_outside={handleClickOutside}>
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
    <Close_ico />
  </div>
</div>

<style>
  .pop_up {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: auto;
    z-index: 10;
    margin-top: 16px;
    padding: 64px;
    display: flex;
    width: 100%;
    box-shadow: 0px 25px 35px rgba(0, 0, 0, 0.15);
    background-color: white;
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
  .pop_up.safe {
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
      max-width: 100%;
    }
  }
</style>
