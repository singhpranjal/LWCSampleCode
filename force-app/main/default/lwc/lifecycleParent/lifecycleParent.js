import { LightningElement } from 'lwc';
import template from './lifecycleParent.html';
export default class LifecycleParent extends LightningElement {

    constructor() {
        super();
       console.log('Parent: Constructor'+ new Date());
    }
    connectedCallback() {
        console.log('Parent: connectedCallback' + new Date());
    }

    disconnectedCallback() {
        console.log('Parent: disconnectedCallback'+ new Date());
    }
    renderedCallback(){
        console.log('Parent: renderedCallback'+ new Date());
    }
    render(){
        console.log('Parent: render'+ new Date());
        return template;
    }
    
    // To show change
    isVisible=true;
    handleChange(){
        this.isVisible=!this.isVisible;
    }

    displayScreenTwo=false;
    handleDisplayChange(){
        this.displayScreenTwo=!this.displayScreenTwo;
    }



    errorCallback(error, stack) {
        console.log(error.name);
        console.log(error.message);
        console.log(error.stack);
        console.log(stack);
    }
}