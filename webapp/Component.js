sap.ui.define([
  "sap/ui/core/UIComponent",
  "sap/ui/model/json/JSONModel"
], function (UIComponent, JSONModel) {
  "use strict";

  return UIComponent.extend("demo.productapp.productapp.Component", {
    metadata: {
      manifest: "json"
    },

    init: function () {

      var oAuthModel = new sap.ui.model.json.JSONModel({
        isAuthenticated: false,
        token: null,
        user: null


      });
      this.setModel(oAuthModel, "auth");



      UIComponent.prototype.init.apply(this, arguments);
      var oData = {
        products: [
          { id: 1, name: "Chai",  price: 18, stock: 39 },
          { id: 2, name: "Coffee", price: 19, stock: 17 }
        ],
        nextId: 3
      };
      var oModel = new JSONModel(oData);
      this.setModel(oModel, "data");
      this.getRouter().initialize();
    }
  });
});
