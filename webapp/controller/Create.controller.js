sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/m/MessageToast",
  "sap/m/MessageBox"
], function (Controller, MessageToast, MessageBox) {
  "use strict";

  return Controller.extend("demo.productapp.productapp.controller.Create", {

    _getRouter: function () {
      return this.getOwnerComponent().getRouter();
    },

    onCancel: function () {
      this._getRouter().navTo("List");
    },

    onSave: function () {
      var oView  = this.getView();
      // Default model = OData V4 model for z_ui_products
      var oModel = oView.getModel();

      var sName  = oView.byId("demo.productapp.productapp::Create--InName").getValue();
      var sPrice = oView.byId("demo.productapp.productapp::Create--InPrice").getValue();
      var sStock = oView.byId("demo.productapp.productapp::Create--InStock").getValue();

      if (!sName) {
        MessageToast.show("Name is required");
        return;
      }

      // Generate a ProductID (max length 10)
      // You can change this logic to whatever your backend expects.
      var sProductID = sName.toUpperCase().replace(/\s+/g, "_").slice(0, 10);
      if (!sProductID) {
        sProductID = String(Date.now()).slice(-10);
      }

      // Build payload exactly as in metadata
      var oNewProduct = {
        ProductID: sProductID,
        Name:      sName,
        Price:     sPrice ? Number(sPrice) : 0,
        Currency:  "INR",          // default; change if needed
        Category:  "General",      // default; change/add input if needed
        Stock:     sStock ? Number(sStock) : 0
      };

      // OData V4 create on entity set /Products
      var oListBinding = oModel.bindList("/Products");

      oListBinding.create(oNewProduct)
        .created()
        .then(function () {
          MessageToast.show("Product created");
          this._getRouter().navTo("List");
        }.bind(this))
        .catch(function (oError) {
          MessageBox.error(oError.message || "Error while creating product");
        });
    }

  });
});
