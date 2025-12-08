sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/core/Fragment"
], function (Controller, MessageToast, Fragment) {
    "use strict";

    return Controller.extend("demo.productapp.productapp.controller.List", {

        onSelectAll: function () {
            var oTable = this.byId("demo.productapp.productapp::List--Table");
            oTable.selectAll();

            if (this._pMenu) {
                this._pMenu.then(function (oMenu) {
                    oMenu.close();
                });
            }
        },

        onPress: function () {
            var oView = this.getView(),
                oButton = oView.byId("button");

            if (!this._oMenuFragment) {
                this._oMenuFragment = Fragment.load({
                    id: oView.getId("button"),
                    name: "demo.productapp.productapp.view.Menu_one",
                    controller: this
                }).then(function (oMenu) {
                    oMenu.openBy(oButton);
                    this._oMenuFragment = oMenu;
                    return this._oMenuFragment;
                }.bind(this));

            } else if (this._oMenuFragment.isOpen()) {
                this._oMenuFragment.close();

            } else {
                this._oMenuFragment.openBy(oButton);
            }
        },

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
            var sPath = oCtx.getPath(); // "/products/2"
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
