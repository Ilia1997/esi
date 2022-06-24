export async function getPeriodsFromDB() {
    const url = `http://195.211.240.82:9998/esi_public/esi_public/backend/getPeriods`;
    try {
        const res = await fetch(url);
		const json = await res.json();
        if (res.ok) {
			return json;
		} else {
			throw new Error(json);
		}
    } catch (error) {
      console.log(error.message);
    }
  }
  
export async function getCurrenciesFromDB() {
    const url = `http://195.211.240.82:9998/esi_public/esi_public/backend/getCurrencies`;
    try {
        const res = await fetch(url);
		const json = await res.json();
        if (res.ok) {
			return json;
		} else {
			throw new Error(json);
		}
    } catch (error) {
      console.log(error.message);
    }
  }
  