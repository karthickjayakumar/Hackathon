({
    addConnectedApp : function(component,event,helper) {
        var action = component.get("c.createconnectedapp");
        action.setParams({
            'appName' : component.get("v.displayName"),
            'appLabel' : component.get("v.displayName"),
            'ContactEmail': component.get("v.conEmail"),
            'CallBackUrl': 'HTTPS://WWW.google.com',
            'flag' : true
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            console.log('state '+state);
            if (state === "SUCCESS") {
                var obj = response.getReturnValue();
                console.log('==>'+obj)
                component.set("v.showCaptcha", false);
             }
        });
        
        $A.enqueueAction(action);
    },
    
    getCapps : function(component) {
        var action = component.get("c.retriveConnectedapps");
        action.setCallback(this, function(response) {
            var state = response.getState();
            console.log('state '+state);
            if (state === "SUCCESS") {
                var obj = response.getReturnValue();
                component.set("v.lstCapps",obj);
            }
        });
        
        $A.enqueueAction(action);
    },
    getCappByName : function(component) {
        var action = component.get("c.retriveConnectedappswithName");
        console.log('++++ '+component.get("v.selectedCapp"));
        action.setParams({
            'ConnectedAppLabel' : component.get("v.selectedCapp")
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            console.log('state '+state);
            if (state === "SUCCESS") {
                var obj = response.getReturnValue();
                component.set("v.conDisplayName",obj[0].Name);
                component.set("v.contactEmail",obj[0].Email__c);
                component.set("v.appId",obj[0].AppID__c);
                component.set("v.appSecret",obj[0].ConusmerSecrect__c);
                component.set("v.callbackURL",obj[0].Callback__c);
                component.set("v.showStepOne",false);
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
        
        
    }})