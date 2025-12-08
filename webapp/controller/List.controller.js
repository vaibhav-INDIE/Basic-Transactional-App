sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/m/MessageToast"
], function (Controller, MessageToast) {
  "use strict";

  return Controller.extend("demo.productapp.productapp.controller.List", {

    _getRouter: function () {
      return this.getOwnerComponent().getRouter();
    },

    onAdd: function () {
      this._getRouter().navTo("Create");
    },

    onDelete: function () {
      var oTable = this.byId("demo.productapp.productapp::List--Table");
      var oItem = oTable.getSelectedItem();
      if (!oItem) {
        MessageToast.show("Select a product first");
        return;
      }

      var oCtx = oItem.getBindingContext("data");
      var sPath = oCtx.getPath();
      var aParts = sPath.split("/");
      var iIndex = parseInt(aParts[2], 10);

      var oModel = oCtx.getModel();
      var aProducts = oModel.getProperty("/products");
      aProducts.splice(iIndex, 1);
      oModel.setProperty("/products", aProducts);

      MessageToast.show("Product deleted");
    },

    onRowDetails: function (oEvent) {
    var oBtn = oEvent.getSource();
    var oItem = oBtn.getParent();                   
    var oCtx = oItem.getBindingContext("data");
    var sPath = oCtx.getPath();
    var sIndex = sPath.split("/")[2];

    this._getRouter().navTo("Detail", { index: sIndex });
    } 


  });
});
