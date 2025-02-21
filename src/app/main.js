const app = new App('#app');
const api = new API();

const weatherTemplate = (city) => `
	<h2 class ="city-name" data-name="${name}, ${sys.country}">
		<span>${name}</span>
		<sup>${sys.country}</sup>
	</h2>
	
	<div class="city-temp">${Math.round(main.temp)}<sup>°C</sup></div>
	
	<figure>
		<img class="city-icon" src=${icon} alt=${weather[0]["main"]}
		<figcaption>${weather[0]["description"]}</figcaption>
	</figure>
	`

app.addComponent({
	name: 'cities',
	model: {
		cities: []
	},
	
	view(model){
		const weatherHTML = model.cities.reduce((html, city) => html + `<li>${weatherTemplate(city)}</li>`, '')
		return `
			<ul class="cities">
				${weatherHTML}
			</ul>
			`
	},
	
	controller(model) {
		api
		.getCities()
		.then(result => {
			console.log(result);
			        const {main, name, sys, weather} = result;
			const icon = `https://openweather.org/img/wn/${weather[0]["icon"]}@2x.png`;
			});
	}
});

const router = new Router(app);
router.addRoute('cities', '^#/cities$');