({
   
    publishMC : function(component, event, helper) {
        var message = {
            message: 'Hello from Aura',
            time: new Date()
        };
        component.find("auraToLwcMC").publish(message);
    },
    handleMessage: function(cmp, message, helper) { 
        // Read the message argument to get the values in the message payload
        if (message != null && message.getParam("message") != null) {
            cmp.set("v.receivedMessage", JSON.stringify(message.getParams(),null,'\t'));
        }
    }
})