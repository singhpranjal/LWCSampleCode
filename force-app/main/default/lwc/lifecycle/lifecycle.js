import { LightningElement, api } from 'lwc';
import template1 from './lifecycle.html';
import template2 from './secondScreen.html';

export default class Lifecycle extends LightningElement {

    @api screenTwoEnabled=false;
    constructor() {
        super();
       console.log('Child: Constructor'+ new Date());
    }
    connectedCallback() {
        console.log('Child: connectedCallback' + new Date());
    }

    disconnectedCallback() {
        console.log('Child: disconnectedCallback'+ new Date());
    }
    renderedCallback(){
        console.log('Child: renderedCallback'+ new Date());
    }
    render(){
        console.log('Child: render'+ new Date());
        return this.screenTwoEnabled?template2:template1;
    }
}