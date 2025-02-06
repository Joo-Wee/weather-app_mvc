const app = new App('#app');

app.addComponent({
	name: 'cities',
	model: {
		cities: []
	},
	
	view(model){
		return `The API has about ${model.cities.length} cities`;
	}
});

const router = new Router(app);
router.addRoute('cities', '^#/cities$');

