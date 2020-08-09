import { LightningElement } from 'lwc';
import findAccounts from '@salesforce/apex/AccountSearchController.findAccounts';

export default class CallAMethodImperatively extends LightningElement {

    searchKey;
    accounts;

    handleKeyChange(event) {
        window.clearTimeout(this.delayTimeout);
        const searchKey = event.target.value;
        this.delayTimeout = setTimeout(() => {
            this.searchKey = searchKey;
            this.handleLoad();
        }, 1000);
       }
    
       handleLoad() {
        let value={};
        findAccounts({ searchKey: this.searchKey })
            .then(result => {
                value.data=result;
                this.accounts = value;
            })
            .catch(error => {
                value.error=error;
                this.accounts = value;
            });
       }
}