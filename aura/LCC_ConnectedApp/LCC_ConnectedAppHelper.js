({
	updateCApp : function(component) {
        var action = component.get("c.createconnectedapp");
        action.setParams({
            'appName' : component.get("v.conDisplayName"),
            'appLabel' : component.get("v.conDisplayName"),
            'ContactEmail': component.get("v.contactEmail"),
            'CallBackUrl': component.get("v.callbackURL"),
            'flag' : false
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            console.log('state '+state);
            if (state === "SUCCESS") {
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "title": "Success!",
                    "message": "The record has been updated successfully."
                });
                toastEvent.fire();
                var obj = response.getReturnValue();
            }
        });
        
        $A.enqueueAction(action);
   },
    
    getoptions: function(component) {
       var action = component.get("c.retriveConnectedapps");
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                console.log('RESPONSE'+response.getReturnValue());
                component.set("v.lstCapps",response.getReturnValue());
                /*var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "title": "Success!",
                    "message": "The record has been updated successfully."
                });
                toastEvent.fire();*/
                var obj = response.getReturnValue();
                
            }
        });
        
        $A.enqueueAction(action);
    },
    getthedata : function(component) {
       var action = component.get("c.retriveConnectedappswithName");
        console.log('selectedCapp::::'+component.get("v.selectedCapp"));
        action.setParams({
            'ConnectedAppLabel' : component.get("v.selectedCapp")
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                console.log('RESPONSE'+response.getReturnValue());
                var obj = response.getReturnValue();
                console.log('objj::'+obj[0]);
                component.set("v.conDisplayName",obj[0].Name);
                component.set("v.contactEmail",obj[0].Email__c);
                component.set("v.appId",obj[0].AppID__c);
                component.set("v.appSecret",obj[0].ConusmerSecrect__c);
                component.set("v.callbackURL",obj[0].Callback__c);
            }
        });
        
        $A.enqueueAction(action);
    }
})