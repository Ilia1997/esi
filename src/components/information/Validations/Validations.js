export async function checkIfEmailExistInDB(email) {
  const url = `https://be.esi.kdg.com.ua/esi_public/esi_public/backend/checkEmail?email=${email}`;
  let status;
  if(email)
    try {
      await fetch(url)
        .then((response) => {
          return response.json();
        })
        .then((parsedData) => {

          // let parsedData = JSON.parse(data)
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
          if (data.status) {
            status = false;
          } else if (!data.status) {
            status = true;
          }
        });
    } catch (error) {
      console.log(error.message);
      status = true;
    }
  return status;
}

export async function checkIfPhoneExistInDB(phoneCode, phoneNumber) {
  phoneCode = phoneCode.replace("+", "");
  const url = `https://be.esi.kdg.com.ua/esi_public/esi_public/backend/checkPhone?phoneCode=%2B${phoneCode}&phoneNumber=${phoneNumber}`;
  let status;
  if(phoneNumber.length >= 5)
    try {
      await fetch(url)
        .then((response) => {
          return response.json();
        })
        .then((parsedData) => {
          // let parsedData = JSON.parse(data)
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