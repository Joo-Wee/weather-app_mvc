class API {
	constructor() {
		this.input = document.querySelector(".top-banner input");
		this.inputVal = "Kumasi";
		this.apiKey = "1b30122e2a01bc70894fda1adcd12be5";
		this.API_URL = `https://api.openweathermap.org/geo/1.0/direct?q=${this.inputVal}&appid=${this.apiKey}`;
	}
	
	getCities(){
		return fetch(this.API_URL)
		.then(res => {
			if(!res.ok) {
				throw new Error('Network response was not ok' + response.statusText);
			}
			
			return res.json()});
	}
}