"use strict";

$(function DOMReady() {

	// window.ParsleyValidator.addValidator("alpha", {
	// 	pattern: new RegExp("[A-Za-z ]+"),
	// 	validateNumber: function(value) {
	// 		value = value.trim();
	// 		return this.pattern.test(value);
	// 	},
	// 	messages: {
	// 		en: "This field must contain only letters and spaces"
	// 	}
	// });

	$("#signin-form").parsley();
});
