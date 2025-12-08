/*global QUnit*/

sap.ui.define([
	"demo/productapp/productapp/controller/productapp.controller"
], function (Controller) {
	"use strict";

	QUnit.module("productapp Controller");

	QUnit.test("I should test the productapp controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
