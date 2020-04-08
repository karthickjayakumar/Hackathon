({
    doInit : function(component, event, helper) {
        
    },
    submitForm : function(component, event, helper) {
        var dispName = component.get("v.displayName");
        var conEmail = component.get("v.conEmail");
        component.set("v.showStepOne", false);
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