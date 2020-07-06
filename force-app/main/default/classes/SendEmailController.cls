
public with sharing class SendEmailController {

 @AuraEnabled(Cacheable = true)
    public static List<Contact> getContacts(){
        return [SELECT Id, FirstName,LastName, Phone, Email FROM Contact ORDER BY Name limit 10];
    }

 @AuraEnabled
    public static void sendEmail(List<Contact> selectedConList){
        try{
           // List<Contact> conMailIdList = new List<Contact>();
            List<Messaging.SingleEmailMessage> emailList = new List<Messaging.SingleEmailMessage>();
            for(Contact con : selectedConList){
                Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
                List<String> sendTo = new List<String>{con.Email};
                mail.setToAddresses(sendTo);
                mail.setSubject('Special Offer');
                mail.setPlainTextBody('Hey '+con.firstName+', We have a special offer for you.');
                emailList.add(mail);
            }
            if(emailList.size() > 0) {
                Messaging.sendEmail(emailList);
            }
        }
        catch(Exception ex){
            throw new AuraHandledException(ex.getMessage());
        }

    }
}


