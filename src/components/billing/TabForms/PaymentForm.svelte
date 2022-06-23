<script>
  //  import CardsIcons from ".../CardsIcons.svelte";
  import Card_ico from "../../../../../esi/public/images/Card_ico.svelte";
  //import PayPal_ico from "../../../../../../public/images/PayPal_ico.svelte";
  import USbank_ico from "../../../../../esi/public/images/USbank_ico.svelte";
  // import Cvc_ico from "../../../../../../public/images/Cvc_ico.svelte";
  import CardPayment from "../TabForms/paymentMethods/CardPayment.svelte";
  import IbanPaymen from "./paymentMethods/IBANPaymen.svelte";

  import { onMount } from "svelte";
  let currentBillingMethod = 0;
   $: currentBillingMethod;

  // let stripeReady = false;
  // let mounted = false;

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
  //   clientSecret: '{{CLIENT_SECRET}}',
  //   // Fully customizable with appearance API.
  //   appearance: {
  //     /*...*/
  //   },
  // };

  // function loadStripeElements() {
  //   // await sleep(500);
  //   // Create a Stripe client.
  //   // Note: this merchant has been set up for demo purposes.
  //   const stripe = Stripe("process.env.vite_stripe_public_key");

  //   // Create an instance of Elements.
  //   var elements = stripe.elements({clientSecret: "{{CLIENT_SECRET}}"});

  //   // Custom styling can be passed to options when creating an Element.
  //   // (Note that this demo uses a wider set of styles than the guide below.)
  //   // var style = {
  //   //   base: {
  //   //     padding: "10px 12px",
  //   //     color: "#32325d",
  //   //     fontFamily:
  //   //       '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  //   //     fontSmoothing: "antialiased",
  //   //     fontSize: "16px",
  //   //     "::placeholder": {
  //   //       color: "#aab7c4",
  //   //     },
  //   //   },
  //   //   invalid: {
  //   //     color: "#fa755a",
  //   //   },
  //   // };

  //   // Create an instance of the idealBank Element.
  //   var paymentForm = elements.create("payment");

  //   // Add an instance of the idealBank Element into the `ideal-bank-element` <div>.
  //   paymentForm.mount("#payment-element");

  //   var errorMessage = document.getElementById("error-message");

  //   // Handle form submission.

  //   const form = document.getElementById("payment-form");

  //   form.addEventListener("submit", async (event) => {
  //     event.preventDefault();

  //     const { error } = await stripe.confirmSetup({
  //       //`Elements` instance that was used to create the Payment Element
  //       elements,
  //       confirmParams: {
  //         return_url: "https://example.com/account/payments/setup-complete",
  //       },
  //     });

  //     if (error) {
  //       // This point will only be reached if there is an immediate error when
  //       // confirming the payment. Show error to your customer (for example, payment
  //       // details incomplete)
  //       const messageContainer = document.querySelector("#error-message");
  //       messageContainer.textContent = error.message;
  //     } else {
  //       // Your customer will be redirected to your `return_url`. For some payment
  //       // methods like iDEAL, your customer will be redirected to an intermediate
  //       // site first to authorize the payment, then redirected to the `return_url`.
  //     }
  //   });
  //   const clientSecret = new URLSearchParams(window.location.search).get(
  //     "setup_intent_client_secret"
  //   );

  //   // Retrieve the SetupIntent
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

  //         break;
  //       }
  //     }
  //   });
  // }
</script>

<!-- <svelte:head>
  <script src="https://js.stripe.com/v3/" on:load={stripeLoaded}></script>
</svelte:head> -->
<div class="tab__wrapper">
  <div class="tab__head__items">
    <div
      class="card"
      on:click={() => (currentBillingMethod = 0)}
      class:active={currentBillingMethod === 0}
    >
      <Card_ico class={currentBillingMethod === 0 ? "active" : ""} />
      <div class="text">Card</div>
    </div>

    <div
      class="us__bank"
      on:click={() => (currentBillingMethod = 1)}
      class:active={currentBillingMethod === 1}
    >
      <USbank_ico class={currentBillingMethod === 1 ? "active" : ""} />
      <div class="text">Bank Account</div>
    </div>
  </div>
  <div class="tab__payment__fields">
    {#if currentBillingMethod === 0}
      <CardPayment />
    {:else if currentBillingMethod === 1}
      <IbanPaymen />
    {/if}
  </div>

  <!-- this is where your Stripe components go -->
  <!-- <form on:submit|preventDefault id="payment-form">
    <div id="payment-element"> -->
<!-- Elements will create form elements here -->
    <!-- </div>
    <button id="submit">Submit</button>
    <div id="error-message"> -->
      <!-- Display error message to your customers here -->
    <!-- </div>
  </form> -->
</div>

<style>
  :global(label) {
    display: inline-block;
    width: 100%;
    margin-bottom: 10px;
    text-align: left;
    color: #000;
  }

  .tab__payment__fields {
    display: flex;
    flex-direction: column;
    margin-top: 30px;
    margin-bottom: 24px;
  }

  .tab__head__items {
    display: flex;
    justify-content: center;
  }
  .tab__head__items > div {
    background: #ffffff;
    border: 1px solid #dddddd;
    border-radius: 10px;
    height: 86px;
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
  }
  .card {
    width: 132px;
    border: 1px solid #e4e4e4;
    padding-left: 30px;
    color: #e4e4e4;
    margin-right: 8px;
    cursor: pointer;
    transition: all ease 0.2s;
  }
  .card.active {
    border-color: #0085ff;
    color: #0085ff;
  }
  /* .card svg {
    margin-bottom: 5px;
  }

  .paypal {
    width: 138px;
    padding-left: 30px;
    margin-right: 8px;
  }
  .paypal svg {
    margin-bottom: 5px;
  } */
  .card:hover,
  .us__bank:hover {
    box-shadow: 0px 1px 15px -8px rgb(14 45 255 / 70%);
  }
  .us__bank {
    transition: all ease 0.2s;
    cursor: pointer;
    width: 170px;
    padding-left: 30px;
    margin-right: 8px;
  }
  .us__bank .text {
    color: #e4e4e4;
  }
  .us__bank.active {
    border-color: #0085ff;
    color: #0085ff;
  }
  .us__bank.active .text {
    color: #0085ff;
  }
  /* .us__bank svg {
    margin-bottom: 5px;
  }

  .more__payment {
    width: 56px;
    padding-left: 19px;
    margin-right: 0px;
  } */
</style>
