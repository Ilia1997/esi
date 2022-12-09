export async function updateUserInDB(userData, userToken) {
  const mainEndpoint =
    "https://be.esi.kdg.com.ua/esi_private/esi_private/backend/updateClient";
  try {
    const rawResponse = await fetch(mainEndpoint, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: userToken,
      },
      body: JSON.stringify(userData),
    });
    const content = await rawResponse.json();
    return content;
  } catch (e) {
    alert(e.message);
  }
  return { status: false };
}
