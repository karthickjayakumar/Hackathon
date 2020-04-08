({
    getCapps : function(component) {
        var action = component.get("c.retriveConnectedapps");
        action.setCallback(this, function(response) {
            var state = response.getState();
            console.log('state '+state);
            if (state === "SUCCESS") {
                var obj = response.getReturnValue();
                component.set("v.displayName",obj[0].Name);
                component.set("v.conEmail",obj[0].Email__c);
                component.set("v.appId",obj[0].AppID__c);
                component.set("v.appSecret",obj[0].ConusmerSecrect__c);
                component.set("v.callbackURL",obj[0].Callback__c);
                
            }
        });
        
        $A.enqueueAction(action);
    },
    updateCApp : function(component) {
         var action = component.get("c.createconnectedapp");
        action.setParams({
            'appName' : component.get("v.displayName"),
            'appLabel' : component.get("v.displayName"),
            'ContactEmail': component.get("v.conEmail"),
            'CallBackUrl': component.get("v.callbackURL"),
            'flag' : false
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            console.log('state '+state);
            if (state === "SUCCESS") {
                var obj = response.getReturnValue();
            }
        });
        
        $A.enqueueAction(action);
        
        
    }
})