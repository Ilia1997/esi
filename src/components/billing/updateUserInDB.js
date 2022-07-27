export async function updateUserInDB(userData,userToken) {
    let status = false;
  
   
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
      status = content.status;
      // $userAuthToken = content.data.token;
    } catch (e) {
      alert(e.message);
    }
    return status;
  }