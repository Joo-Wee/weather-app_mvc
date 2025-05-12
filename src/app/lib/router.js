class Router {
	constructor(app) {
		this.app = app;
		this.routes = [];
		this.hashChange = this.hashChange.bind(this);
		window.addEventListener('hashchange', this.hashChange);
		window.addEventListener('DOMContentLoaded', this.hashChange);
	}
	
	addRoute(name, url) {
		this.routes.push({
			name,
			url
		})
	}
	
	hashChange() {
		const hash = window.location.hash;
		const [path, queryString] = hash.split('?');
		
		const route = this.routes.find(route => path.match(new RegExp(route.url)));
		
		if(route){
			const params = new URLSearchParams(queryString);
			const city = params.get('city');
			this.app.showComponent(route.name);

			if(city){
				const cityUpdateEvent = new CustomEvent('cityUpdate', {
					detail: {
						city: decodeURIComponent(city)
					}
				});
				document.dispatchEvent(cityUpdateEvent);
			}
		}
		
		else {
			this.app.showComponent("Not Found");
		}
	}
}