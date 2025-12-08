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

      // init router
      this.getRouter().initialize();
    }
  });
});
