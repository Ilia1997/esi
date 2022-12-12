export async function setPaymentSystem(pm1, pm2 = null, userToken) {
  const mainEndpoint =
    "https://be.esi.kdg.com.ua/esi_private/esi_private/backend/setPreferredPaymentSystem";
  const body = JSON.stringify({
    paymentSystemId: pm1,
    alternativePaymentSystemId: pm2,
  });
  try {
    const rawResponse = await fetch(mainEndpoint, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: userToken,
      },
      body,
    });
    const content = await rawResponse.json();
    return content;
  } catch (e) {
    alert(e.message);
  }
}
