({
    doInit : function(component, event, helper) {
        var options = [
            { value: "1", label: "Access and manage your Chatter data (chatter_api)" },
            { value: "2", label: "Access and manage your Eclair data (eclair_api)" },
            { value: "3", label: "Access and manage your Wave data (wave_api)" },
            { value: "4", label: "Option 4" },
            { value: "5", label: "Option 5" },
            { value: "6", label: "Option 6" },
            { value: "7", label: "Option 7" },
            { value: "8", label: "Option 8" },
        ];
            component.set("v.listOptions", options);
            
            helper.getCapps(component);
    },
            handleChange: function (cmp, event) {
            // Get the list of the "value" attribute on all the selected options
            var selectedOptionsList = event.getParam("value");
            alert("Options selected: '" + selectedOptionsList + "'");
            }
            
})