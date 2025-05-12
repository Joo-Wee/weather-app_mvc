class API {
	constructor() {
		this.input = document.querySelector(".top-banner input");
		this.form = document.querySelector(".top-banner form");
		this.apiKey = "1b30122e2a01bc70894fda1adcd12be5";
		this.inputVal = '';
		this.API_URL = '';
		
		this.form.addEventListener("submit", e => {
			e.preventDefault();
			this.inputVal = this.input.value.trim();
			if (this.inputVal) {
				this.API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${this.inputVal}&appid=${this.apiKey}&units=metric`;
				
				const cityAddedEvent = new CustomEvent('cityAdded', {
					detail: {
						city: this.inputVal
					}
				});
				document.dispatchEvent(cityAddedEvent);
			}
			window.location.hash = `#/cities?city=${encodeURIComponent(this.inputVal)}`;
		});
	}
	
	async getCities(){
		const res = await fetch(this.API_URL);
		return await res.json();
	}
}