import { LightningElement, api } from 'lwc';

export default class DemoComp extends LightningElement {
    @api name='';
    @api lastName='';
    get getfullName(){
        return (this.name+' '+ this.lastName);
    }
    handleChange(event){
        const fieldName=event.target.name;
        const value=event.target.value;
        if(fieldName==='lastname')
            this.lastName=value;
        if(fieldName==='firstname')
            this.name=value;
    }

}