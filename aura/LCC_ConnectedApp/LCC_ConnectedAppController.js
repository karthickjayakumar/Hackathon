({
    doInit: function(component, event, helper) {
        helper.getoptions(component);
    },
	onAppClick : function(component, event, helper) {
		component.set("v.selected",true);
        console.log('buttonclick::'+event.getSource().get("v.value"));
        component.set("v.selectedCapp",event.getSource().get("v.value"));
        helper.getthedata(component);
	},
    closepopup : function(component, event, helper) {
        component.set("v.selected",false);
    },
    submitDetails : function(component,event,helper){
        helper.updateCApp(component);
    },
    onChangecApp : function(component, event, helper) { 
    	helper.getthedata(component);
    }
})