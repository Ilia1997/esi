<script>
  import Form from "./components/contributions/Form.svelte";
  import HeadSteps from "./components/HeadSteps.svelte";
</script>

<main>
  <div class="container">
    <HeadSteps />
    <div class="step__content">
      <div class="column-left">
        <div class="contribution__left">
          <div class="contribution__head">
            <h2>Choose your <span class="green">Contribution</span></h2>
            <Form />
          </div>
          <div class="rules">
            <div class="rules__head">Projection & Rules</div>
            <div class="rules__items">
              <div class="rules__item">
                <div class="rules_text">
                  Your <span>Green</span>
                  Contribution
                </div>
                <div class="rules__val">
                  $600<span>/mo</span>
                </div>
              </div>
              <div class="rules__item center">
                <div class="rules_text">
                  Annual <span>Green</span> Conversion
                </div>
                <div class="rules__val">
                  $7200<span>/yr</span>
                </div>
              </div>
              <div class="rules__item">
                <div class="rules_text">
                  <span>Green</span>
                  Saving Projection
                </div>
                <div class="rules__val">
                  $36,000<span>/5yrs</span>
                </div>
              </div>
            </div>
          </div>
          <div class="contribution__footer">
            <div class="btn">
              Next
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M4 11C3.44772 11 3 11.4477 3 12C3 12.5523 3.44772 13 4 13V11ZM20.7071 12.7071C21.0976 12.3166 21.0976 11.6834 20.7071 11.2929L14.3431 4.92893C13.9526 4.53841 13.3195 4.53841 12.9289 4.92893C12.5384 5.31946 12.5384 5.95262 12.9289 6.34315L18.5858 12L12.9289 17.6569C12.5384 18.0474 12.5384 18.6805 12.9289 19.0711C13.3195 19.4616 13.9526 19.4616 14.3431 19.0711L20.7071 12.7071ZM4 13H20V11H4V13Z"
                  fill="#0085FF"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div class="column-right" />
    </div>
  </div>
</main>

<style>
  .rules {
    padding: 20px 67px 20px 40px;
    background: linear-gradient(
      90deg,
      rgba(53, 159, 161, 0.48) 0.23%,
      rgba(53, 159, 161, 0.36) 100%
    );
    border: 2px solid #359fa1;
    border-right: none;
  }
  .rules__head {
    font-weight: 500;
    font-size: 24px;
    line-height: 36px;
    color: #032b01;
  }
  .rules__items {
    display: flex;
    justify-content: space-between;
    width: 100%;
    max-width: 653px;
    margin-top: 16px;
  }
  .rules__item {
    padding: 16px 50px 26px 50px;
  }
  .rules__item.center {
    border-left: 1px solid #032b01;
    border-right: 1px solid #032b01;
  }
  .rules_text {
    max-width: 134px;
    font-weight: 500;
    font-size: 18px;
    line-height: 27px;
    text-transform: uppercase;
    color: #032b01;
  }
  .rules__item:first-child {
    padding: 16px 50px 26px 0px;
  }
  .rules__item:last-child {
    padding: 16px 0px 26px 50px;
  }
  .rules_text span {
    color: #fff;
  }
  .rules__val {
    font-weight: 500;
    font-size: 36px;
    line-height: 54px;
    color: #032b01;
  }
  .rules__val span {
    font-size: 14px;
    line-height: 21px;
  }

  .btn {
    padding: 21px 35px;
    background: rgba(0, 110, 255, 0.1);
    border: 1px solid #006eff;
    border-radius: 10px;
    display: flex;
    transition: all ease 0.3s;
    margin: 32px 55px 36px auto;
    cursor: pointer;
  }
  .btn svg {
    margin-left: 10px;
  }
  .btn:hover {
    background: #006eff;
    color: #fff;
  }
  .btn:active {
    background: rgba(0, 110, 255, 0.2);
  }

  main {
    padding: 50px;
  }
  .container {
    max-width: 1360px;
    margin-right: auto;
    margin-left: auto;
    padding-right: 40px;
    padding-left: 40px;
  }
  .step__content {
    background: rgba(255, 255, 255, 0.8);
    box-shadow: 0px 25px 35px rgba(0, 0, 0, 0.15),
      inset 0px 0px 35px rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(5px);
    border-radius: 0px 0px 10px 10px;
  }
  .column-left {
    width: 100%;
    max-width: 760px;
  }
  .column-right {
    width: 100%;
    max-width: 520px;
  }
  .green {
    color: #359fa1;
  }
  h2 {
    font-weight: 500;
    font-size: 36px;
    line-height: 54px;
  }
  .contribution__head {
    padding: 20px 40px;
  }
  .contribution__footer {
    display: flex;
  }
</style>
