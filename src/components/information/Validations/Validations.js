export async function checkIfEmailExistInDB(email) {
  const url = `http://195.211.240.82:9998/esi_public/esi_public/backend/checkemail?email=${email}`;
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
  const url = `http://195.211.240.82:9998/esi_public/esi_public/backend/checklogin?login=${userName}`;
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
