import { LightningElement, wire, api } from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import NAME_FIELD from '@salesforce/schema/Account.Name';
import OWNER_NAME_FIELD from '@salesforce/schema/Account.Owner.Name';

export default class UiRecordApi extends LightningElement {
    @api recordId;
    @wire(getRecord, { recordId: '$recordId', fields: [NAME_FIELD], optionalFields: [ OWNER_NAME_FIELD] })
    account;

    get name() {
        return getFieldValue(this.account.data, NAME_FIELD);
    }
    get ownerName() {
        return getFieldValue(this.account.data, OWNER_NAME_FIELD);
    }

}