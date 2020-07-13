import { LightningElement } from 'lwc';

export default class LifecycleContainer extends LightningElement {

    isVisible=true;
    handleChange(){
        this.isVisible=!this.isVisible;
    }
}