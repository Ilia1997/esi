<script>
  import { clientSecretToken, userAuthToken } from "../../../stores/store";
  import { fade, slide } from "svelte/transition";
  import { onMount } from "svelte";
  import Preloader from "../../Preloader.svelte";
  import { contributionData } from "../../../stores/contributionsStore";
  import { postalCode } from "../../../stores/billingStore";
  import InfoDemo from "../demo/InfoDemo.svelte";
  import { infoFormData } from "../../../stores/infoStore";
  import Dropdown from "./Dropdown.svelte";
  import { setPaymentSystem } from "./setPaymentSystemInDB";
  export let addressData;

  let currentBillingMethod = 0;
  $: currentBillingMethod;

  let stripeReady = false;
  let mounted = false;
  let preloaderState = false,
    preloaderBtnState = false;
  let stripeLoadedStatus = false;

  //const client_secret = $clientSecretToken;
  let paymentMethods = [],
    mainPaymentMethod,
    addictionPaymentMethod = null,
    paymentMethodErrorState = false;

  $contributionData.country.paymentSystems.forEach((item) => {
    paymentMethods.push(item);
  });

  const handleSubmit = async () => {
    if (!mainPaymentMethod || mainPaymentMethod === "") {
      paymentMethodErrorState = true;
      return;
    }
    preloaderBtnState = true;
    const res = await setPaymentSystem(
      mainPaymentMethod,
      addictionPaymentMethod,
      $userAuthToken
    );

    if (
      res.status === true ||
      (res.status != 500 && res.data.message == "SUCCESS")
    ) {
      window.location.href = "https://esi.webflow.io/successful-page";
    }
    setTimeout(() => {
      preloaderBtnState = false;
    }, 1000);
  };

  // onMount(async () => {
  //   mounted = true;
  //   if (stripeReady) {
  //     console.log("strype is ready");
  //     loadStripeElements();
  //   }
  // });

  // function stripeLoaded() {
  //   stripeReady = true;
  //   if (mounted) {
  //     loadStripeElements();
  //   }
  // }

  // const options = {
  //   clientSecret: client_secret,
  //   // Fully customizable with appearance API.
  //   appearance: {},
  // };

  // function loadStripeElements() {
  //   // await sleep(500);
  //   // Create a Stripe client.
  //   // Note: this merchant has been set up for demo purposes.

  //   const stripe = Stripe("process.env.stripe_PK");

  //   // Create an instance of Elements.
  //   var elements = stripe.elements({ clientSecret: client_secret });

  //   // Create an instance of the idealBank Element.
  //   var paymentForm = elements.create("payment", {
  //     defaultValues: {
  //       billingDetails: {
  //         name: `${$addressData.firstName} ${$addressData.lastName}`,
  //         email: $infoFormData.email,
  //         address: {
  //           country: $contributionData.country["2DigitCode"],
  //           postal_code: $postalCode,
  //           line1: $addressData.streetNumber,
  //           city: $addressData.city,
  //           state: $addressData.state,
  //         },
  //       },
  //     },
  //   });

  //   // Add an instance of the idealBank Element into the `ideal-bank-element` <div>.
  //   paymentForm.mount("#payment-element");
  //   paymentForm.on("ready", function (event) {
  //     setTimeout(() => {
  //       stripeLoadedStatus = true;
  //     }, 700);
  //   });

  //   // Handle form submission.

  //   const form = document.getElementById("payment-form");

  //   form.addEventListener("submit", async (event) => {
  //     event.preventDefault();
  //     preloaderState = true;
  //     // set data to pass to webflow
  //     localStorage.setItem("stripe_PK", "process.env.stripe_PK");
  //     localStorage.setItem("AuthToken", $userAuthToken);

  //     const { error } = await stripe.confirmSetup({
  //       //`Elements` instance that was used to create the Payment Element
  //       elements,
  //       confirmParams: {
  //         return_url: "https://esi.webflow.io/successful-page",
  //       },
  //     });

  //     if (error) {
  //       // This point will only be reached if there is an immediate error when
  //       // confirming the payment. Show error to your customer (for example, payment
  //       // details incomplete)
  //       preloaderState = false;
  //       const messageContainer = document.querySelector("#error-message");
  //       messageContainer.textContent = error.message;
  //     } else {
  //       // Your customer will be redirected to your `return_url`. For some payment
  //       // methods like iDEAL, your customer will be redirected to an intermediate
  //       // site first to authorize the payment, then redirected to the `return_url`.
  //     }
  //   });
  // }
</script>

<!-- <svelte:head>
  <script src="https://js.stripe.com/v3/" on:load={stripeLoaded}></script>
</svelte:head> -->
<!-- <InfoDemo />
<div class="tab__wrapper">
  {#if !stripeLoadedStatus}
    <div class="preloader__wrapper">
      <Preloader loaderWidth={7} loaderHeight={7} borderWidth={0.8} />
    </div>
  {/if} -->

<!-- this is where your Stripe components go -->

<!-- <form on:submit|preventDefault id="payment-form">
    <div id="payment-element">
     
    </div>
    <button class="btn-sv" id="submit">
      {#if preloaderState}
        <div class="preload_btn_wrapper">
          <Preloader loaderWidth={1.5} loaderHeight={1.5} borderWidth={0.3} />
        </div>
      {/if}
      Open Account</button
    >
    <div id="error-message">
     
    </div>
  </form>
</div> -->
<form on:submit|preventDefault={handleSubmit}>
  <div class="mb_6">Set main payment method*</div>
  <div class="flex_payments">
    {#each paymentMethods as item}
      <label
        class="container_radio"
        on:click={() => {
          paymentMethodErrorState = false;
          mainPaymentMethod = item.paymentSystemId;
        }}
      >
        <div class="img_wrapper">
          <img
            src="data:{item.icon.image.mime || undefined};base64,{item.icon
              .image.data}"
            alt={item.paymentSystemName}
            class="flag"
          />
        </div>

        <input type="radio" name="radio1" />
        <span class="p_name">{item.paymentSystemName}</span>
        <span class="checkmark" />
      </label>
    {/each}
  </div>
  {#if paymentMethodErrorState}
    <div class="error__message" transition:slide|local>
      Main payment method is required
    </div>
  {/if}

  <div class="mt_20 mb_6">Set additional payment method</div>
  <div class="flex_payments">
    {#each paymentMethods as item}
      <label
        class="container_radio"
        on:click={() => {
          addictionPaymentMethod = item.paymentSystemId;
        }}
      >
        <div class="img_wrapper">
          <img
            src="data:{item.icon.image.mime || undefined};base64,{item.icon
              .image.data}"
            alt={item.paymentSystemName}
            class="flag"
          />
        </div>

        <input type="radio" name="radio2" />
        <span class="p_name">{item.paymentSystemName}</span>
        <span class="checkmark" />
      </label>
    {/each}
  </div>

  <button
    class="btn-sv mt_20 cnf {preloaderBtnState ? 'disabled_sb' : ''}"
    type="submit"
  >
    {#if preloaderBtnState}
      <div class="preload_btn_wrapper">
        <Preloader loaderWidth={1.5} loaderHeight={1.5} borderWidth={0.3} />
      </div>
    {/if}
    Confirm</button
  >
</form>

<style>
  .preload_btn_wrapper {
    position: absolute;
    top: 0%;
    left: 0%;
    width: 100%;
    height: 100%;
    background: var(--btn-color);
    z-index: 2;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .flex_payments {
    display: flex;
    gap: 10px;
    justify-content: space-between;
  }
  span.p_name {
    font-size: 14px;
  }
  .img_wrapper {
    width: 35px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .img_wrapper img {
    max-width: 85%;
  }
  /* The container */
  .container_radio {
    display: flex;
    flex-direction: column;
    position: relative;
    padding: 8px 16px;
    height: 100%;
    cursor: pointer;
    font-size: 14px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  /* Hide the browser's default radio button */
  .container_radio input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
  }

  /* Create a custom radio button */
  .checkmark {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    border: 1px solid #dddddd;
    border-radius: 10px;
  }
  .container_radio:hover {
    color: #0085ff;
  }
  /* On mouse-over, add a grey background color */
  .container_radio:hover input ~ .checkmark {
    border-color: #0085ff;
  }

  /* When the radio button is checked, add a blue background */
  .container_radio input:checked ~ .checkmark {
    border-color: #0085ff;
  }
  .container_radio input:checked ~ span.p_name {
    color: #0085ff;
  }

  /* Create the indicator (the dot/circle - hidden when not checked) */
  .checkmark:after {
    content: "";
    position: absolute;
    display: none;
  }

  /* Show the indicator (dot/circle) when checked */
  .container_radio input:checked ~ .checkmark:after {
    display: block;
  }

  /* Style the indicator (dot/circle) */

  .mt_20 {
    margin-top: 20px;
  }
  .mb_6 {
    margin-bottom: 6px;
  }

  .btn-sv.cnf {
    margin-left: auto;
    position: relative;
    top: auto;
    left: auto;
    bottom: auto;
    right: auto;
    overflow: hidden;
  }
  .btn-sv.cnf.disabled_sb {
    pointer-events: none;
  }
  #error-message {
    color: var(--error-color);
    text-align: left;
  }
  .tab__wrapper {
    min-height: 400px;
    padding-top: 20px;
  }
  .preloader__wrapper {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    z-index: 2;
    background: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  button.btn-sv {
    bottom: 0;
    right: 20px;
    position: absolute;
    width: 100%;
    max-width: 200px;
    font-size: 16px;
    height: 66px;
    background: var(--btn-color);
    border: 1px solid var(--btn-color);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 5;
    overflow: hidden;
  }
  .preload_btn_wrapper {
    position: absolute;
    top: 0%;
    left: 0%;
    width: 100%;
    height: 100%;
    background: var(--btn-color);
    z-index: 6;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  @media only screen and (max-width: 768px) {
    .flex_payments {
      flex-wrap: wrap;
      justify-content: flex-start;
    }
  }
</style>
