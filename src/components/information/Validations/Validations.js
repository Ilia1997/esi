export async function checkIfEmailExistInDB(email) {
  const url = `https://be.esi.kdg.com.ua/esi_public/esi_public/backend/checkEmail?email=${email}`;
  let status;
  if(email)
    try {
      await fetch(url)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          let parsedData = JSON.parse(data)
          if (parsedData.status === true) {
            status = false;
          } else if (parsedData.status === false) {
            status = true;
          }
        });
    } catch (error) {
      console.log(error.message);
      status = true;
    }
  return status;
}

export async function checkIfUserNameExistInDB(userName) {
  const url = `https://be.esi.kdg.com.ua/esi_public/esi_public/backend/checkUsername?username=${userName}`;
  let status;
  if(userName)
    try {
      await fetch(url)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          if (data.valid === "1") {
            status = false;
          } else if (data.valid === "0") {
            status = true;
          }
        });
    } catch (error) {
      console.log(error.message);
      status = true;
    }
  return status;
}

export async function checkIfPhoneExistInDB(phoneCode,phoneNumber) {
  const url = `https://be.esi.kdg.com.ua/esi_public/esi_public/backend/checkPhone?phoneCode=${phoneCode}&phoneNumber=${phoneNumber}`;
  let status;
  if(phone.length >= 7)
    try {
      await fetch(url)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          let parsedData = JSON.parse(data)
          if (parsedData.status === true) {
            status = false;
          } else if (parsedData.status === false) {
            status = true;
          }
        });
    } catch (error) {
      console.log(error.message);
      status = true;
    }
  return status;
}