import { LightningElement, wire } from 'lwc';
import findAccounts from '@salesforce/apex/AccountSearchController.findAccounts';
import { refreshApex } from '@salesforce/apex';

export default class WireAProperty extends LightningElement {
    searchKey;
    
    @wire(findAccounts, {searchKey: '$searchKey'})
    accounts;

    handleKeyChange(event) {
        window.clearTimeout(this.delayTimeout);
        const searchKey = event.target.value;
        this.delayTimeout = setTimeout(() => {
            this.searchKey = searchKey;
        }, 1000);
       }

    refreshRecords() {
        refreshApex(this.accounts);
    }
}