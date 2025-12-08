sap.ui.define([
  "sap/ui/core/mvc/Controller"
], function (Controller) {
  "use strict";

  return Controller.extend("demo.productapp.productapp.controller.Detail", {

    onInit: function () {
      var oRouter = this.getOwnerComponent().getRouter();
      oRouter.getRoute("Detail").attachPatternMatched(this._onRouteMatched, this);
    },

    _onRouteMatched: function (oEvent) {
      var sIndex = oEvent.getParameter("arguments").index;
      var sPath  = "/products/" + sIndex;

      this.getView().bindElement({
        path: sPath,
        model: "data"
      });
    },

    onNavBack: function () {
      // go back to list
      this.getOwnerComponent().getRouter().navTo("List");
    }

  });
});
