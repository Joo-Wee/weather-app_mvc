class App {
	constructor(selector){
		this.appElement = document.querySelector(selector);
		this.componentsByName = {};
	}
	
	addComponent(component){
		this.componentsByName[component.name] = component;
		component.model = this.proxify(component.model);
	}
	
	showComponent(name){
		this.currentComponent = this.componentsByName[name];
		
		if(this.currentComponent){
			this.currentComponent.controller(this.currentComponent.model);
			this.updateView();
		}
		else{
			const msg = document.querySelector('.msg');
			msg.innerHTML = `<div class="error">Please a enter a valid city</div>`;
		}
	}
	
	updateView(){
		console.log('Updating view with model:', JSON.stringify(this.currentComponent.model));
		this.appElement.innerHTML = this.currentComponent.view(this.currentComponent.model);
		console.log('View updated');
	}
	
	proxify(model) {
		const self = this;
		return new Proxy(model, {
			set(target, property, value){
				console.log('Changing', property, 'from', target[property], 'to', value);	
				target[property] = value;
				self.updateView();
				return true;
			}
		})
	}
}