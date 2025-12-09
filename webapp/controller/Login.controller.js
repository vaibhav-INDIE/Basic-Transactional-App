sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/m/MessageBox",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/BusyIndicator",
    "sap/ui/thirdparty/jquery"
], function (Controller, MessageToast, MessageBox, JSONModel, BusyIndicator, jQuery) {
    "use strict";

    return Controller.extend("demo.productapp.productapp.controller.Login", {

        onInit: function () {
            var oData = {
                login: {
                    username: "",
                    password: ""
                }
            };
            this.getView().setModel(new JSONModel(oData));
        },

        onLoginPress: function () {
            var oData = this.getView().getModel().getProperty("/login");
            var sUser = oData.username;
            var sPass = oData.password;

            if (!sUser || !sPass) {
                MessageToast.show("Please enter both username and password");
                BusyIndicator.show(0);
                return;
            }
            
            

            if (sUser === "cuttu123" && sPass === "cuttu123") {
                MessageToast.show("Welcome " + sUser);

                var oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("List");
            } 
            else {
                MessageBox.error("Invalid username or password. Try again.");
            }
        }
    });
});
