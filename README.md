# Bitsie Pay (Node Module)

This module allows you to create signed payment requests for [Bitsie Pay](https://pay.bitsie.com).

## Example

```
var Signature = require('bitsie-pay);

var apiKey = "UWonbQFq5mp9uVycmIsQD8GL263WyBkh1dGEL2zAjj8G/gTJZTWX9obwNebV/NKfxIuys3P67YqeOJJPGv/q1A==";
var apiSecret = "U0JK6QjNAIqBcvuE1Aoh5dtWChc4qR4wWstohg/3iWLbrbNk0Ma69oQaNlZ6EI+fmNLU0XxAnJm/luFkyodsuw==";

var form = {
	apiKey: apiKey,
	returnUrl : "https://chat.bitsie.com/pro/receipt",		// required
	notificationUrl : "https://chat.bitsie.com/pro/ipn",	// required
	total : 1.00,											// required
	sessionId : "932",										// required
	description : "Bitsie Chat Pro - Room #bitsie",			// optional (recommended)
	templateUrl : "https://chat.bitsie.com/pro/template"	// optional (recommended)
};

var signature = new Signature(form);
var token = signature.sign(apiSecret);

console.log("Form Data: ", form);
console.log("Form Signature: " + token);
```