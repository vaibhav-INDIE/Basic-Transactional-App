sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/m/MessageToast"
], function (Controller, MessageToast) {
  "use strict";

  return Controller.extend("demo.productapp.productapp.controller.Create", {

    _getRouter: function () {
      return this.getOwnerComponent().getRouter();
    },

    onCancel: function () {
      this._getRouter().navTo("List");
    },

    onSave: function () {
      var oView = this.getView();
      var oModel = this.getOwnerComponent().getModel("data");

      var sName  = oView.byId("demo.productapp.productapp::Create--InName").getValue();
      var sPrice = oView.byId("demo.productapp.productapp::Create--InPrice").getValue();
      var sStock = oView.byId("demo.productapp.productapp::Create--InStock").getValue();

      if (!sName) {
        MessageToast.show("Name is required");
        return;
      }

      var aProducts = oModel.getProperty("/products");
      var iNextId = oModel.getProperty("/nextId");

      aProducts.push({
        id: iNextId,
        name: sName,
        price: sPrice ? Number(sPrice) : 0,
        stock: sStock ? Number(sStock) : 0
      });

      oModel.setProperty("/products", aProducts);
      oModel.setProperty("/nextId", iNextId + 1);

      MessageToast.show("Product created");
      this._getRouter().navTo("List");
    }

  });
});
