({
    closePopUp : function(cmp) {
        cmp.set("v.isOpen",false);
        cmp.set("v.AppList",false);
        
    },
    doInIt : function(cmp) {
        var action = cmp.get("c.retriveConnectedapps");
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                cmp.set("v.thislist",response.getReturnValue());

            }
            else if (state === "ERROR") {
                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " + 
                                 errors[0].message);
                    }
                } else {
                    console.log("Unknown error");
                }
            }
        });
        $A.enqueueAction(action);
    },
    openProductApp : function(component) {
        component.set("v.isOpen",true);
        component.set("v.showStepOne",true);
    },
    closeModel :function(component) {
        component.set("v.isOpen",false);
    },
    submitForm : function(component, event, helper) {
        var dispName = component.get("v.displayName");
        var conEmail = component.get("v.conEmail");
        component.set("v.showStepOne", false);
        component.set("v.isOpen", false);
        component.set("v.showCaptcha", true);
        console.log('==>'+dispName);
        console.log('==?'+conEmail);
    },
    submit :function(component, event, helper) {
        helper.addConnectedApp(component, event, helper);
        helper.getCapps(component);
        
       
        component.set("showStepOne",false);
        component.set("showCaptcha",false);
         var cmpEvent = $A.get("e.c:closeForm");
        cmpEvent.fire();
    },
    submitDetails : function(component,event,helper){
        helper.updateCApp(component)
    }
})