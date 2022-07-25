<script>
  import { clientSecretToken, userAuthToken } from "../../../stores/store";
  import { onMount } from "svelte";
  import Preloader from "../../Preloader.svelte";
  import {contributionData} from '../../../stores/contributionsStore'
  import {postalCode} from '../../../stores/billingStore'
  let currentBillingMethod = 0;
  $: currentBillingMethod;

  let stripeReady = false;
  let mounted = false;
  let preloaderState = false;
  let stripeLoadedStatus = false;

  const client_secret = $clientSecretToken;
  console.log(client_secret);
  onMount(async () => {
    mounted = true;
    if (stripeReady) {
      console.log("strype is ready");
      loadStripeElements();
    }
  });

  function stripeLoaded() {
    stripeReady = true;
    if (mounted) {
      loadStripeElements();
    }
  }

  const options = {
    clientSecret: client_secret,
    // Fully customizable with appearance API.
    appearance: {},
  };

  function loadStripeElements() {
    // await sleep(500);
    // Create a Stripe client.
    // Note: this merchant has been set up for demo purposes.
    const stripe = Stripe("process.env.stripe_PK");

    // Create an instance of Elements.
    var elements = stripe.elements({ clientSecret: client_secret });

    // Create an instance of the idealBank Element.
    var paymentForm = elements.create("payment",{
        defaultValues:{
          billingDetails:{
            address:{
              country: $contributionData.country['2DigitCode'],
              postal_code: $postalCode
            }
          }
        }
    });

    

    // Add an instance of the idealBank Element into the `ideal-bank-element` <div>.
    paymentForm.mount("#payment-element");
    paymentForm.on("ready", function (event) {
      setTimeout(() => { 
        stripeLoadedStatus = true;
      }, 700);
    });

    // Handle form submission.

    const form = document.getElementById("payment-form");

    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      preloaderState = true;
      // set data to pass to webflow
      localStorage.setItem("stripe_PK", "process.env.stripe_PK");
      localStorage.setItem("AuthToken", $userAuthToken);

      
      const { error } = await stripe.confirmSetup({
        //`Elements` instance that was used to create the Payment Element
        elements,
        confirmParams: {
          return_url: "https://esi.webflow.io/successful-page",
        },
      });

      if (error) {
        // This point will only be reached if there is an immediate error when
        // confirming the payment. Show error to your customer (for example, payment
        // details incomplete)
        preloaderState = false;
        const messageContainer = document.querySelector("#error-message");
        messageContainer.textContent = error.message;
      } else {
        // Your customer will be redirected to your `return_url`. For some payment
        // methods like iDEAL, your customer will be redirected to an intermediate
        // site first to authorize the payment, then redirected to the `return_url`.
      }
    });
    // const clientSecret = new URLSearchParams(window.location.search).get(
    //   "setup_intent_client_secret"
    // );

    //  // Retrieve the SetupIntent
    //   stripe.retrieveSetupIntent(clientSecret).then(({ setupIntent }) => {
    //     const message = document.querySelector("#message");

    //     // Inspect the SetupIntent `status` to indicate the status of the payment
    //     // to your customer.
    //     //
    //     // Some payment methods will [immediately succeed or fail][0] upon
    //     // confirmation, while others will first enter a `processing` state.
    //     //
    //     // [0]: https://stripe.com/docs/payments/payment-methods#payment-notification
    //     switch (setupIntent.status) {
    //       case "succeeded": {
    //         message.innerText = "Success! Your payment method has been saved.";
    //         break;
    //       }

    //       case "processing": {
    //         message.innerText =
    //           "Processing payment details. We'll update you when processing is complete.";
    //         break;
    //       }

    //       case "requires_payment_method": {
    //         message.innerText =
    //           "Failed to process payment details. Please try another payment method.";

    //         // Redirect your user back to your payment page to attempt collecting
    //         // payment again

    //         break;ф
    //       }
    //     }
    //   });
  }
</script>

<svelte:head>
  <script src="https://js.stripe.com/v3/" on:load={stripeLoaded}></script>
</svelte:head>
<div class="tab__wrapper">
  {#if !stripeLoadedStatus}
    <div class="preloader__wrapper">
      <Preloader loaderWidth={7} loaderHeight={7} borderWidth={0.8} />
    </div>
  {/if}

  <!-- this is where your Stripe components go -->
  <form on:submit|preventDefault id="payment-form">
    <div id="payment-element">
      <!-- Elements will create form elements here -->
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
      <!-- Display error message to your customers here -->
    </div>
  </form>
</div>

<style>
  #error-message {
    color: var(--error-color);
    text-align: center;
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
    width: 182px;
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
</style>
