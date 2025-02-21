class API {
	constructor() {
		this.input = document.querySelector(".top-banner input");
		this.inputVal = "Kumasi";
		this.apiKey = "1b30122e2a01bc70894fda1adcd12be5";
		this.API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${this.inputVal}&appid=${this.apiKey}&units=metric`;
	}
	
	getCities(){
		return fetch(this.API_URL)
		.then(res => {
		return res.json()});
	}
}