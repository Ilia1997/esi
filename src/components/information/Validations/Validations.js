export async function checkIfEmailExistInDB(email) {
  const url = `https://be.esi.kdg.com.ua/esi_public/esi_public/backend/checkEmail?email=${email}`;
  let status;
  
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

export async function checkIfUserNameExistInDB(userName) {
  const url = `https://be.esi.kdg.com.ua/esi_public/esi_public/backend/checkUsername?username=${userName}`;
  let status;
  try {
    await fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.valid === "1") {
          console.log('1')
          status = false;
        } else if (data.valid === "0") {
          console.log('0')
          status = true;
        }
      });
  } catch (error) {
    console.log(error.message);
    status = true;
  }
  return status;
}

export async function checkIfPhoneExistInDB(phone) {
  const url = `https://be.esi.kdg.com.ua/esi_public/esi_public/backend/checkPhone?phone=${phone}`;
  let status;
  
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