// mySubscriberComponent.js
import { LightningElement, track } from 'lwc';
import { createMessageContext, releaseMessageContext, subscribe, unsubscribe,publish } from 'lightning/messageService';
 
import SAMPLEMC from "@salesforce/messageChannel/SampleMessageChannel__c";
import AURATOLWC from "@salesforce/messageChannel/AuraMessageChannelToLWC__c";
export default class MySubscriberComponent extends LightningElement {
    context = createMessageContext();
    subscription = null;
    @track receivedMessage = '';
   
     
    publishMC() {
        const message = {
            message: 'Hello from LWC',
            time: new Date()
        };
        publish(this.context, SAMPLEMC, message);
    }

    subscribeMC() {
       if (this.subscription) {
           return;
       }
       this.subscription = subscribe(this.context, AURATOLWC, (message) => {
           this.handleMessage(message);
       });
    }
   
    unsubscribeMC() {
        unsubscribe(this.subscription);
        this.subscription = null;
    }
 
    handleMessage(message) {
        console.log('in handle message');
        console.log('received message ', JSON.parse(JSON.stringify(message)));
        this.receivedMessage = message ? JSON.stringify(message, null, '\t') : 'no message payload';
    }
 
    disconnectedCallback() {
        releaseMessageContext(this.context);
    }
}