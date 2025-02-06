class App {
	constructor(selector){
		this.appElement = document.querySelector(selector);
		this.componentsByName = {};
	}
	
	addComponent(component){
		this.componentsByName[component.name] = component;
	}
	
	showComponent(name){
		this.currentComponent = this.componentsByName[name];
		this.updateView();
	}
	
	updateView(){
		this.appElement.innerHTML = this.currentComponent.view(this.currentComponent.model);
	}
}