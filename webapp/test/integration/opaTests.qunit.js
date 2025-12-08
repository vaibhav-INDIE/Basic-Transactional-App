/* global QUnit */
QUnit.config.autostart = false;

sap.ui.require(["demo/productapp/productapp/test/integration/AllJourneys"
], function () {
	QUnit.start();
});
