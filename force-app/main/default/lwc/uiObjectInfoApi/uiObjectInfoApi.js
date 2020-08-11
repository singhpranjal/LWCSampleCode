import { LightningElement, wire , api} from 'lwc';
import { getObjectInfo, getPicklistValues, getPicklistValuesByRecordType } from 'lightning/uiObjectInfoApi';
import INDUSTRY_FIELD from '@salesforce/schema/Account.Industry';

export default class UiObjectInfoApi extends LightningElement {
    @api objectApiName;
    objInfo={};
    @wire(getObjectInfo, { objectApiName: '$objectApiName' })
    getObjectInfo(response){
        if(response!== undefined && response.data!== undefined){
            this.objInfo=response.data;
            console.log(response.data);
        }
        
    }

    @wire(getPicklistValues, { recordTypeId: '$objInfo.defaultRecordTypeId', fieldApiName: INDUSTRY_FIELD })
    getPicklistValues(response){
        if(response!== undefined && response.data!== undefined){
            console.log(response.data);
        }
    }

    @wire(getPicklistValuesByRecordType, { objectApiName: '$objectApiName', recordTypeId: '$objInfo.defaultRecordTypeId' })
    getPicklistValuesByRecordType(response){
        if(response!== undefined && response.data!== undefined){
            console.log(response.data);
        }
    }
}