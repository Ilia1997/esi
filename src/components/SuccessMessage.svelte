<div class="success__message">
  <div class="success__top"><div>You are now a Green Saver!</div></div>
  <div class="success__body">
    <div class="like_h2">
      You have opened your account <span class="green"
        >and added a payment/ withdraw source!
      </span>
      <div>Welcome to ESi <span class="green">green saver!</span></div>
    </div>
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
  .success__message {
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0px 0px 180px;
    background-color: transparent;
    position: relative;
    min-height: 690px;
    background: rgba(255, 255, 255, 0.8);
    box-shadow: 0px 25px 35px rgba(0, 0, 0, 0.15),
      inset 0px 0px 35px rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(5px);
    border-radius: 0px 10px 10px 10px;
  }

  .success__top {
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
    .like_h2 {
      font-size: 20px;
      line-height: 28px;
    }
  }
</style>
