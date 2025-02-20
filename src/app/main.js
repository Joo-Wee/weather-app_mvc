const app = new App('#app');
const api = new API();

app.addComponent({
	name: 'cities',
	model: {
		cities: []
	},
	
	view(model){
		return `The API has about ${model.cities.length} cities`;
	},
	
	controller(model) {
		api
		.getCities()
		.then(result => {
			console.log(result);
		})
		
		.catch(error => {
			console.error('There was a problem with your fetch operation:', error);
		})
	}
});

const router = new Router(app);
router.addRoute('cities', '^#/cities$');

