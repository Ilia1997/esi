export async function getCountriesFromDB() {
    const url = `http://195.211.240.82:9998/esi_public/esi_public/backend/getCountriesList`;
    try {
        const res = await fetch(url);
		const json = await res.json();
        if (res.ok) {
			return json;
		} else {
			throw new Error(json);
		}
    } catch (error) {
      alert(error);
    }
  }
  