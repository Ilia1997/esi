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
    addictionPaymentMethod,
    paymentMethodErrorState = false;

  // const array = [
  //   { paymentSystemId: 5252330, paymentSystemName: "ACH Direct Debit" },
  //   { paymentSystemId: 5252335, paymentSystemName: "Interact" },
  //   { paymentSystemId: 5252333, paymentSystemName: "MasterCard" },
  //   { paymentSystemId: 5252332, paymentSystemName: "Visa" },
  //   { paymentSystemId: 5252331, paymentSystemName: "Paypal" },
  // ];
  // const paymentSystems = [
  //   {
  //     paymentSystemId: 5252330,
  //     paymentSystemName: "ACH Direct Debit",
  //     icon: {
  //       image: {
  //         mime: "image/png",
  //         data: "iVBORw0KGgoAAAANSUhEUgAAAFAAAAA1CAMAAADh9px2AAAAM1BMVEVHcEwODg4dHR0aGhoMDAwJCQk1NTUFBQUEBAROTk4kJCQWFhYUFBQHBwcSEhIsLCwAAABB0MEAAAAAEHRSTlMAsU9kxdoa/fIMOXiK6Z8rYNw6iAAAAndJREFUWMPdmNmCqyAMhoEQ9sX3f9phU6ljBeZ4dXJTW/Qz5E8ClBDg3qtisrdtaP3dFeARCAGfx85btgnUb3L93KQCgtur5ol8F7j9f8Aq6EMSzAMV8uCAMZOMMXAU1d+BCgMYocmHCWOp+gtQcWcEuTVtnF8ESnRGkweLQS0AFQdBRgY4C5SUaTJhBueAfA6XiX4CiFaQaQM5Aioarw+JaOLXd9ATeB89F4X4yDsTMHVNpKx8Y85Za1kdyNdhANy8R0R3euf23FAheal51SwPuWsePiQN312MvPvVJn6V1X1OdgxEccNTJk2z+Csh1wouAPOz+ZkPJ2hym8ljOPoFoGTXnEiW3bLnBJhcAOZwpYC1CfsAQGWhVE2LJrCtAAM5ffDZXW2zEFXkVEnJ6BKwyOw6bxOMHCKnRVP9Lgvype74HqUmie8qx6inNeVL8OyuY8sL7KoOtlVgcqc+xI759R7aZSA30coWuKbA5q6dAHkynAPmpfKQuemobNKj9Iv2Cku0JmFbUrnIvE9Q8kB5jqTwR9ZrvgjMUvTtuEhTRJYlqAIXgaVcwyUx4by8SSBy113B7mtjnlfEu0zvq2gA7Pum/VzVCpCeI3YmbbBkXGtLtJYGbVtUeghRO1EYAKmzAKaVg8sGrYJZSElHXR7TYNNdTHSN6CswPKyUWujrMm34qFIUm1+KibB+WHoS4yxOMz5Ty5KKSRxVk82Bxn/C3aQNjuIogK81WBXMA40FXD8FKHq7zdQRAg530Le7LymRWhb3zNNCGGYD9zMHwe8bTulTT6bZeNp4TZ8+5o4VC6ej949m6m3g6+dleNVFtf9H8JZ/lvwA0QTEVYxQH5AAAAAASUVORK5CYII=",
  //       },
  //     },
  //   },
  //   {
  //     paymentSystemId: 5252332,
  //     paymentSystemName: "Visa",
  //     icon: {
  //       image: {
  //         mime: "image/png",
  //         data: "iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABmJLR0QA/wD/AP+gvaeTAAAEkUlEQVRoge2XbWxTVRjHf325a9d1hbWsvGyj29jUgNLinC8kBLeZIYY38YNRowQF9IMfTIwZ8YuRGKMxiMZAjBJMiEaFxJcoLEAwbmxjEAcbcc5uE3TsfWVtt3WM9eX44W63vQTYBLINc3+fep5zzznP/57/ee4paGhoaGho3MHorg7YN1dkGYzsAlEKpE5DTtdiUMBxorHtvn3F3sQOlQD75ooso1HUC7BPbX6Txh+N6Nz9X6y8OB7QJ/YajOyawckDpBmMYmdiQK/uF6VTmc1NsiqxcZWAGeP5G2FLbFwt4I5DEzDdaAKmG+O1gnbTAM/llbNmYTWSXhCNCWp6l/L2mS3EhKzZJOlp2rkcq9nAaETgLjvJh8/fxWrPHABWv3eWuvMDzLIYeXVVFkVL7GQ5zOh18HffZb492cPeXzqUNQsX2ThUtkxpe8pq6fRfuTkB/VdsfNL4NEfbH+b7jQeZEz6G29FCdY+bo+0PAVByrx2r2QBAeb2PS4Nh8uZZlDlau4exmAz8XLaMu+dbVPO7XanUNAdVsS3FGar2UlfqpATc0ELeoIvdnR9D/m4EEg86W5S+dQXpyu/9lV1IBh3Z6ckA9ARHCQ5H2FjoVJKv8gZY90E9RTvqeOvgX1T84VfGz5udxJr74/MBeFzWCZOH6+xAIlV/BuCpl9AlOVkT2c07Z8As6VnldgCyHaq8fhbNtSAZ5KtVS/cwAHarpMzT1BGitkV+643tQ6o1Nq1cgGTQ4Q+FCY1EyXSYcbsm902d8BD/fnGIwHAEHGtxuh4HoOQ+Oykm2T5fnuhGCMibm6yMaemSBZxqjdtka3EGh8qW8Uj+LNX8SUY9L6yYD8B3p3upuzAIgOd2CYjGBCebAwBYXZvJTx9lfYETgHBU8HVNN4DK/+M7cKo1yLs/XCASE4B8UH98w8ObG3KUZzcUppNuSwLgm5oezrXJAhypEpl2060LgDEbARhnsdiVQelS+cJ6pMFH38DodQUAfHS4jaIddZTX+5TYa08sZEmm7PHxw9vUEaLhn0HOtcXt5c6eeBcmJeCEN6Ba3DJmn/2VXUr8WhYax9sZYtOeRn6q61NimXYTD+TaFKuYJT17X17MK49lxgUsnFjAhId4PAHfYJg5qZLy5tp8I1Q2xStJ/li1GRqJ0hW4QkGujScLndQ0B/APhVmQZlIOpj8UobY1yPvP5ivjc5zJ5DiTScQziR2YlAAhZBttKIyXuq+quhizNnarRFqKXHFae4YRAlbcM5ttJRlsK1HX9+BwhBc/bSQ5Sc/asVJ8ujXIgdoe5Zlnls+jINeG22VFp5PXvyUBANVevyIgEosfXoD8xA/YmH0u9F7mt/MDLJprIcVkoKU7xJGGS3x2vIP+oTBl67OVsrvnWDuHz8bPiN0qUZBrIy1FIsthps03ct28VP+J07f+egOtM4e+zx9V8r7jL3OagOnmfydgcFqy+G+o7uEqAQKOT20uN8WRxIZ6B6Kx7YCfmYrgUlSI1xNDKgG+fcXeaETnBg4CA1OZ2wQMAAeiCE//3qL26U5GQ0NDQ0PjtvEviauGDQcG+KsAAAAASUVORK5CYII=",
  //       },
  //     },
  //   },
  //   {
  //     paymentSystemId: 5252331,
  //     paymentSystemName: "Paypal",
  //     icon: {
  //       image: {
  //         mime: "image/png",
  //         data: "iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABmJLR0QA/wD/AP+gvaeTAAAD4UlEQVRoge2YwW8bRRTGv292N7ZjO7VjsNukSUCpVKVCIFBJgwQn4MQNiUqAQIIm4YC4ceTQf6MiUKkXqFJXqiqVA1eKQoSEhIpAKtBSVw4oUCJCEhnb+zikgHB3582um/bi33HnvTfv23nzdmeAAQMGDLif0NnynUuZ4tbWKoBHU8zTAfAbgC9Bnt/8I/wIy8d3UsS5A+NqWNzcmkW65AHAB1AD8AJEPigW+W3+zfpzKWP9D2cBMDJ3Nya8zZRBeKkwv/xiv4HcBQDH+p2sh4AhTpdO1Kf6CZJAAO/mCvzDSCeUd/sJ4CQgN18/CGC8n4niIOXlfvydBHgSPtXPJAqV4cX6gbTOvosRRa//rudf384/OALBaNIkKtP7P933fqMAyGUKzjYXJi6CFBdfxz2gd6C2X7ieJnkAMB7zgEwBeEWICweWGqsHlxqHnHxVi8VTAcAnNLOOH2RdJoxy9YJgrOfZ0a7ISm3pxiOasypgX6fyGICcZifGf1iziYKe9w2JoYihiglx9qHT16wvRhUgDNXyCek3sfulTczwSHYjdpA40uqal2z+ugBQ38BB5ifNJoadQrU0Y0+Ar9qG9T0gUFeg42XaapwIMoXsigm8qtWIOGwbtgoovn6+AmBaS6TrDSXuPiSvlierT6qGgv22YasABp05aL/cZFtIp5b3n4+sPTBdMzQoOFiv2wbtJSQO9e8FVwE4t1Aaflc9NN72s0PqygKAQG7axq1f4lAwR+XI0/Zzv7okAmA9N1r4ujQ2+gwQ2TYjMcLLtnGLACF5Tq3R0AwFEY9bADdoeMvPBL/kysN+vlw8CuJZNePeLAwu2sZjBRTeWJ4BWNImGD08nvWzmd7HGex+F2oA7G3SzpW1mxOf2Qxi9wCNUdsnA/93P5t5PE1mTghP4iRDm0n8Jnb4A/XL5e9TpOWEEB+vLU7U1RwsIdQV8Mrl7WRpucLPu63Mgotl5ArUXjuTB3BEc/ZGCsWEmTnAcwy959ffrv7pYh25AltBfpYIlcMOhV6Q7ANm5wqB95oLExeSOEUmSQnntCsvkx/+AURaARsAbgl4jZAVUj5pzk9Z+30c0W/Z4BiUA11QLq0BqoBthv5M862xG2mScyG6CwlmVcdyyeXMurqXyQOxbVR+VB1zOetf4i5cSZpQUiJLaPPD40/bnGpnfs6z9Vf8Seo2pHyRNjFXklwt/gvbnVk4XMl4xGqa+ElIJ0C6LteMjcaJyWaa+ElIJcDlnABwz8sHSClAAPU3W+5B/QMpBIydak4S6L2IugNi7+sfSCEgDLgjgFLb/Cq/3bonKzBgwIAB95e/AZt05oycDxcnAAAAAElFTkSuQmCC",
  //       },
  //     },
  //   },
  //   {
  //     paymentSystemId: 5252335,
  //     paymentSystemName: "Interact",
  //     icon: {
  //       image: {
  //         mime: "image/png",
  //         data: "iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAMAAAC5zwKfAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAABLUExURf7Vb/////29GP/////++/7PWf///////////v////7ejv66ChoWGh8aGjAmGfSzC1ZBFtObDWxRFMOQDo1pEuOnDK2AEUIzGP/y0RcMPagAAAALdFJOU/wh/lfv/df+ArD+D0ViRAAABIhJREFUWMOtmel66iAQhi3a52gDDDve/5WeGbIBgcQl/FBry5tvNhjo5Y7j+rj9+3rcHldiXe73n8ft+Xf5evw9b48fAv48nr9sOGGw3ycSL3fkDScNJN4v19tpPCTerpfHk50HZM/H5fY3nDj+bpd/l/kH+PYFB+JW4BljAcLZwOTRL16GtskfuG02jcGJPoSWwq+TEbyHHAjvu43RpFkI2BAsbE2Gtz9NfK1d0LrtwzdQ60Cg8xXwrVxk1RO8xeFzINu89n5sP98TbwFCw2xWzmPrHzHYCgWAZh7CRxkI1hmlnG8nNtsNReuJ2khOwxRpA6z5dFZCSi+OZurIuYxCcLlJG9aZ2SokHYyKxiLWcB6tdygxHNRyRZltAKwxcDFZiaIs2uuGIYhodCcobDePtYmWVMkohRBucFwIS2lT1vJL8fUYTau4sAEdFiCg39xgks5ytcHKNmabi1pX7keOQFOFRYgZBpuAagHCEmVyg6oz3ylppo/BxOR/sk4I5TSGIwwatXIHE5D+aAkKPUpBWRBaJhX4U5j8bwlIpqJ2D9pJnptM6lvA1fcIjA6FJDspzUwCmiWXRZyAKSiOZ3m4BYIPFENMCB+5cODRsOgJGOjXyUdh9GF6iqfsXiulAHob9OAVwlCaDI5IkwDyIQE9zfZTUAL5Ncrkkw0Qo+nQEBlIl+AxaJKmQAeVA4kR0hsCPcWGU7UMFZDWDOcEkZQ3JnktiZFKkt5kcgKO7ynKlD34a5nWmgqY5gopSZqfo4xvBMMJwQ+LQvwuGopJMgy01VAk9gSkuUqTw2UOxGBjWXkdYAba9BRuHD4GWq3IAqTIY6aKEkiZEqJQCxDIMdJN9bMLjDCk1C+AavzSLCbTEh30TrO0Ase5mcLk2OCpLAIBKTeOu68amCmkQuCSooxpG0zQ8AlwVkghtON+IY1/oz/sKUzJHpTEpLF9ZflutKMwOU+vfVV7k4DqYwl0Tq0KQUll9Ict8VTLXns9Amk50Dv+Z6W6df8ogJS7mrbFXY/Vuw/rKsQVbVw+AfabLrbd0tgGiOFIBaqgr4g1e6ryyxkYjbO6B+zAanvzKOOGGcII9PqgB4HO9yxTaI2Ss8k6Oqims6PgsCrKlCeLD7VMoS45dfsFB3loCiBPW29rGivtZVWtrEBsBNQclPQq5hJh2QkGXulm16DYsAJpU9GvTN/22lNQsI0Rq8m0z1LH90qdNM961OwJXgFN0S8WmOqsUWTBAuQd4LboOkkKZVAktme6CWRN46DngiwoY5Sjox6pUAidbISW1kmhwy4gmTx2SDOQwf4iPdcR9H24jNyHrHGI2a0UoJ1yB9hfKFj+liW2jTKqoA+Bua27qw1tJjC0gayMLDRXwc2eMjfVFRBeWFF3LoL6JjNoHOF3N6kD4OFJkL0MLLeSzmfYLl9j9x9fS5u8qDf5WZxGTR/IWlXcuqIogLnNa5TZS0tipnC9MoUgeFMhHCQ3K65Ms0tdmI6J6ULipUN+61K3uHbGM6oah/v42rm+GIdxfH4xfv7V/en/XDj53x//AfNLGvICiByQAAAAAElFTkSuQmCC",
  //       },
  //     },
  //   },
  //   {
  //     paymentSystemId: 5252333,
  //     paymentSystemName: "MasterCard",
  //     icon: {
  //       image: {
  //         mime: "image/png",
  //         data: "iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABmJLR0QA/wD/AP+gvaeTAAADa0lEQVRoge3YzW8VVRjH8c+Z9gI1IOBrkJKIEL0tYQFGEyKY4MK4I4qQaEhclRf/BVmpK/cG1iYaXTSxSzcaMCSsfImFVhMDBlDUNBIgNFzaOS6mt0zvS3vvTHxZzHc1M+d5fs/5zT33nDmHioqKioqKiv+O0GtgJEyzO3IA+yKbMLzQfCVwPXI2MDHKN235UXDKbsEBwT4t+biOs4KJcKw9v7CBSLjIIbyHp3vU/REnRxkXcdohof98x4yHIC4XuKyBH9iW8Ame77HwEobWmxoeE2rb1Yvk47wBb4Yxl7oFdDVwgb0Yx2NFKq/dyHA9q9AYYc1zRVTAjOhwOOHLTo0dDUyyP/AFakUqrt3IllFCkt3HlEad1cVNNCReDkedaW1IWh9MszXwmYKdXzWUvfmQUw4JtWnuXS6imMlKjccPbW9tWGIgEub5FI8WrbT5GZLB9udJQvoV0qLKHjbgoxiXjpolBqY4rOAfFjY8ztC67u2rVzHbNgj6Yo/TXss/WDQQCZF3y6g/smXlmMFfsmKFCd7P3y4amORZvc/TbTywPhv/K1Gr0bhQtAqox1N2NW8WDYRshS3Muod6j52bLlMJub4muYu9ZRSXG/utJLfLVGLhUyTTal5ENpfR7GX4NBns+QusK4t9zc9Cm8ooDnSYOrvGtq0+fdPRQJm54d9mcTXJG/itjOL8XB+xxRezJr82L/IGrpVRbMz2Hjv3Dxn4uozi7K3eY9MHy1SC+x91+XVgoozirZneYwdHylRCrq+LBkb4VrYTKsSdm9y9s3LcvQaryhgIpsJx3zdv879AxMkS0maurhwzv1UfO/EOpN7J3y6ZkUezHdj5oto3fmf2Zvf2uw3WvFhUHZxz3Of5B0sMBGLCG/izaIVrP3WeUtOUZH9rxb6YEbzVuslvkxvhcpKdQjSKVGnMcm0620Y2iSn3dlB7sohiJiv1ajjm59aGju9jhDORl/BHkWq3/+LKRdI50nnu1lm9u4gSsjf/Sni78zS/7N9pmq3zfIw9RSoPbTA5PCbUttlRJB/nREfCCV1308uOyDqXRnkh8jr6+YqfSjn41A07ax/YKfaZH0zhYDhu73Kdz0L74AK7LBwt4gn3jwavypb3s5jYwXed8hd2Us2jxfb8sHC0eLRzfkVFRUVFRcX/jb8B0JLPkiChhj4AAAAASUVORK5CYII=",
  //       },
  //     },
  //   },
  // ];

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
    preloaderBtnState = false;
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
  @media only screen and (max-width: 991px) {
    .flex_payments {
      flex-wrap: wrap;
    }
  }
</style>
