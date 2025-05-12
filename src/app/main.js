const app = new App('#app');
const api = new API();

const msg = document.querySelector('.msg');

document.querySelector('#home').addEventListener('click', () => {
    // Clear the URL hash
    window.location.hash = '';
    // Clear the input field
    api.input.value = '';
    // Clear the cities array
    app.componentsByName['cities'].model.cities = [];
    // Show the initial state
    app.showComponent('cities');
});

const weatherTemplate = (city) => `
	<h2 class="city-name" data-name="${city.name}, ${city.sys.country}">
		<span>${city.name}</span>
		<sup>${city.sys.country}</sup>
	</h2>
	
	<div class="city-temp">${Math.round(city.main.temp)}<sup>°C</sup></div>
	
	<figure>
		<img class="city-icon" src="${city.icon}" alt="${city.weather[0].main}">
		<figcaption>${city.weather[0].description}</figcaption>
	</figure>
`;

app.addComponent({
	name: 'cities',
	model: {
		cities: []
	},
	
	view(model) {
		const weatherHTML = model.cities.reduce((html, city) => html + `<li>${weatherTemplate(city)}</li>`, '');
		return `
			<ul class="cities">
				${weatherHTML}
			</ul>
		`;
	},
	
	controller(model) {
		api
		.getCities()
		.then(result => {
			//console.log(result);
			const {main, name, sys, weather} = result;
			const icon = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;
			//console.log(icon);
			
			const city = {
				name,
				main,
				sys,
				weather,
				icon
			};
			
			model.cities = [...model.cities, city];
			msg.innerHTML = '';
		})
		.catch(error => {
			console.error('Error fetching city data:', error);
			msg.innerHTML = `<div class="error">Abeg, this your city, <span class="font-bold">${api.inputVal}</span>, no dey map top😆</div>`;
		});
	}
});

const router = new Router(app);
router.addRoute('cities', '^#/cities(\\?.*)?$');