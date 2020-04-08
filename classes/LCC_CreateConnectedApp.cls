public class LCC_CreateConnectedApp {
    
    @AuraEnabled
    public static void createconnectedapp(String appName, String appLabel, String ContactEmail, String CallBackUrl, boolean flag){
     
        String sessionId = getUserSessionId();
        system.debug('sessionId::::'+sessionId);
        string consumerSecret = LCC_CreateConnectedApp.generaterandomnumber();
        String reqBody = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">';
        reqBody +='<soapenv:Header>';
        reqBody +='<SessionHeader xmlns="http://soap.sforce.com/2006/04/metadata">';
        reqBody+='<sessionId>'+sessionId+'</sessionId>';
        reqBody+='</SessionHeader>';
        reqBody+='</soapenv:Header>';
        reqBody+='<soapenv:Body>';
        
        reqBody+='<upsertMetadata xmlns="http://soap.sforce.com/2006/04/metadata">';
        
        reqBody+='<metadata xsi:type="ConnectedApp" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">';
        reqBody+='<fullName>';
        reqBody+=appName+'</fullName>';
        reqBody+='<label>'+appLabel+'</label>';
        reqBody+='<contactEmail>'+ContactEmail+'</contactEmail>';
        reqBody+='<oauthConfig><callbackUrl>'+CallBackUrl+'</callbackUrl>';
        if(flag)
        reqBody+='<consumerSecret>'+consumerSecret+'</consumerSecret>';
            
         reqBody+='<scopes>Full</scopes></oauthConfig></metadata></upsertMetadata></soapenv:Body></soapenv:Envelope>';
        system.debug('LLLL'+reqBody);
        Http http = new Http();
        HttpRequest req = new HttpRequest();
        req.setTimeout(120000);
        req.setEndpoint(Url.getOrgDomainUrl().toExternalForm()+ '/services/Soap/m/44.0');
        req.setHeader('SOAPAction', 'Wololo');
        req.setMethod('POST');
        req.setHeader('Content-Type', 'text/xml; charset=UTF-8');
        req.setHeader('Authorization', 'Bearer ' + sessionId);
        req.setBody(reqBody);            
        HTTPResponse res = http.send(req);
        String xml = res.getBody();
        system.debug('res: '+xml);
        
       
       // String s = ' <?xml version="1.0" encoding="UTF-8"?><soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns="http://soap.sforce.com/2006/04/metadata"><soapenv:Body><createMetadataResponse><result><fullName>connectedApp9</fullName><success>true</success></result></createMetadataResponse></soapenv:Body></soapenv:Envelope>';
        
        list<string> lst = xml.split('<fullName>');
        system.debug('lst::'+lst);
       
        list<string> lst1 = lst[1].split('</fullName>');
        String sss = lst1[0];
        system.debug('sss:::'+sss);
        
        ConnectedApps__c css = new ConnectedApps__c();
        
        if(flag){
        css.Name = sss;
        css.User__c = userinfo.getUserId();
        css.ConusmerSecrect__c = consumerSecret;
        css.Email__c = ContactEmail;
        css.ConnectedAppLabel__c = sss;
        css.Callback__c = CallBackUrl;
        }
        else{
            css.Name = appName;
            css.ConnectedAppLabel__c = appName;
            css.Callback__c = CallBackUrl;
        }
        system.debug('KKKKLLL::'+css);
        upsert css ConnectedAppLabel__c;
        system.debug('css:::::::'+css.Id);
        
    }
    public static string generaterandomnumber(){
        Integer len = 8;
        String str = string.valueof(Math.abs(Crypto.getRandomLong()));
        String randomNumber = str.substring(0, len);
        system.debug('Random Number-' + randomNumber);
        return randomNumber;
    }
    @AuraEnabled
    public static List<ConnectedApps__c> retriveConnectedapps(){
    List<ConnectedApps__c> lst = [select id,AppID__c,Name,Callback__c,ClientID__c,ConnectedAppLabel__c,Email__c,ConusmerSecrect__c,User__c FROM ConnectedApps__c where User__c =: UserInfo.getUserId()];
        return lst;
    }
    @AuraEnabled
    public static List<ConnectedApps__c> retriveConnectedappswithName(String ConnectedAppLabel){
       
        /*String sessionId = getUserSessionId();
        string returndata;
        String allAppNames = '';
        for(ConnectedApps__c pp : [select id,Name,ConusmerSecrect__c,User__c FROM ConnectedApps__c where User__c =: UserInfo.getUserId() limit 10]){
            allAppNames += '<fullNames>'+pp.Name+'</fullNames>';
        }
        system.debug('allAppNames::'+allAppNames);
        String reqBody = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">'+
            '<soapenv:Header>'
            +'<SessionHeader xmlns="http://soap.sforce.com/2006/04/metadata">'
            +'<sessionId>'+sessionId+'</sessionId>'
            +'</SessionHeader>'
            +'</soapenv:Header>'
            +'<soapenv:Body>'
            +' <readMetadata xmlns="http://soap.sforce.com/2006/04/metadata">'
            +' <type>ConnectedApp</type>'
            +allAppNames
           // +' <fullNames>connectedapp0</fullNames>'
            +' </readMetadata>'
            +'</soapenv:Body>'
            +'</soapenv:Envelope>';
        
         
        Http http = new Http();
        HttpRequest req = new HttpRequest();
        req.setTimeout(120000);
        req.setEndpoint(Url.getOrgDomainUrl().toExternalForm()+ '/services/Soap/m/44.0');
        req.setHeader('SOAPAction', 'Wololo');
        req.setMethod('GET');
        req.setHeader('Content-Type', 'text/xml; charset=UTF-8');
        req.setHeader('Authorization', 'Bearer ' + sessionId);
        req.setBody(reqBody);            
        HTTPResponse res = http.send(req);
        String xml = res.getBody();
        system.debug('res: '+xml);
        
        returndata = string.valueOf(xml);
        return returndata;
        */
        List<ConnectedApps__c> lst = [select id,AppID__c,Name,Callback__c,ClientID__c,ConnectedAppLabel__c,Email__c,ConusmerSecrect__c,User__c FROM ConnectedApps__c where User__c =: UserInfo.getUserId() AND ConnectedAppLabel__C =: ConnectedAppLabel];
        System.debug('===>'+lst);
        return lst;
    }
    
    public class wrapfields{
        public string contactEmail;
        public string AppId;
        public string AppSecret;
        public String displayName;
        public string NameSpace;
        public String appDomain;
        public string PrivacypolicyURL;
        public string termsofserviceURL;
    }
        public static String getUserSessionId(){
     String sessionId = '';
    // Refer to the Page
    PageReference reportPage = Page.GetSessionIdVF;
    // Get the content of the VF page
    String vfContent = reportPage.getContent().toString();
    System.debug('vfContent '+vfContent);
    // Find the position of Start_Of_Session_Id and End_Of_Session_Id
    Integer startP = vfContent.indexOf('Start_Of_Session_Id') + 'Start_Of_Session_Id'.length(),
    endP = vfContent.indexOf('End_Of_Session_Id');
    // Get the Session Id
    sessionId = vfContent.substring(startP, endP);
    System.debug('sessionId '+sessionId);
    // Return Session Id
    return sessionId;
 }

}