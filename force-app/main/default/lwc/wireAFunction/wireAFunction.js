import { LightningElement, wire } from 'lwc';
import findAccounts from '@salesforce/apex/AccountSearchController.findAccounts';
import { refreshApex } from '@salesforce/apex';

export default class WireAFunction extends LightningElement {
    searchKey;
    accounts;

    @wire(findAccounts, {searchKey: '$searchKey'})
    handleAccountResults(value){
        this.accounts=value;  
    }
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