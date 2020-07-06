import { LightningElement, track, wire } from 'lwc';
// importing apex class methods
import getContacts from '@salesforce/apex/sendEmailController.getContacts';
import sendListEmail from '@salesforce/apex/sendEmailController.sendEmail';

// importing to show toast notifictions
import {ShowToastEvent} from 'lightning/platformShowToastEvent';



    // datatable columns
    const columns = [
        {
            label: 'FirstName',
            fieldName: 'FirstName'
        }, {
            label: 'LastName',
            fieldName: 'LastName'
        }, {
            label: 'Phone',
            fieldName: 'Phone',
            type: 'phone'
        }, {
            label: 'Email',
            fieldName: 'Email',
            type: 'email'
        }
    ];


export default class SendEmail extends LightningElement {

    columns = columns;
    buttonLabel = 'Email Selected Contacts';
    buttonDisabled = false;
    recordsCount = 0;
    selectedRecords = [];
 
    // retrieving the data using wire service
    @wire(getContacts)
    contactList;
 
 
     // Getting selected rows 
    getSelectedRecords(event) {
        // getting selected rows
        const selectedRows = event.detail.selectedRows; 
        this.recordsCount = selectedRows.length;
        this.selectedRecords = selectedRows;
    }
 
 
     // mail records process function
    sendEmail() {
         if (this.selectedRecords) {
             // setting values to reactive variables
             this.buttonLabel = 'Processing....';
             this.buttonDisabled = true;
 
             // calling apex class to send Email to  selected records.
             this.sendListEmail();
         }
    }
 
    sendListEmail(){
         sendListEmail({selectedConList: this.selectedRecords})
         .then(result=> {

            // showing success message
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success!!', 
                    message: 'Email sent successfully!!', 
                    variant: 'success'
                }),
            );
            this.buttonLabel = 'Email Selected Contacts';
            this.buttonDisabled = false;   
            // Clearing selected row indexs 
            this.template.querySelector('lightning-datatable').selectedRows = [];
            this.recordsCount = 0;
        })
        .catch(error => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error while email', 
                    message: error.message, 
                    variant: 'error'
                }),
            );
        });
 
    }
   
}