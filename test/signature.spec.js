var expect = require('expect');
var Signature = require('../index');

var apiKey = "apikey";
var apiSecret = "apiscrect";

describe("Signature Tests", function () {

	it("should reject empty apiKey request", function () {
		var req = new Signature({
			//apiKey : apiKey,	
			returnUrl : "https://chat.bitsie.com/pro/receipt",
			notificationUrl : "https://chat.bitsie.com/pro/ipn",	
			templateUrl : "https://chat.bitsie.com/pro/template",	
			total : 2.99,											
			sessionId : "932",										
			description : "Bitsie Chat Pro - Room #bitsie"			
		});
		expect(function() { req.sign(apiSecret); }).toThrow(/apiKey/);
	});

	it("should reject empty return URL request", function () {
		var req = new Signature({
			apiKey : apiKey,	
			//returnUrl : "https://chat.bitsie.com/pro/receipt",
			notificationUrl : "https://chat.bitsie.com/pro/ipn",	
			templateUrl : "https://chat.bitsie.com/pro/template",	
			total : 2.99,											
			sessionId : "932",										
			description : "Bitsie Chat Pro - Room #bitsie"			
		});
		expect(function() { req.sign(apiSecret); }).toThrow(/returnUrl/);
	});

	it("should reject empty notification URL request", function () {
		var req = new Signature({
			apiKey : apiKey,
			returnUrl : "https://chat.bitsie.com/pro/receipt",		
			//notificationUrl : "https://chat.bitsie.com/pro/ipn",	
			templateUrl : "https://chat.bitsie.com/pro/template",	
			total : 2.99,											
			sessionId : "932",										
			description : "Bitsie Chat Pro - Room #bitsie"			
		});
		expect(function() { req.sign(apiSecret); }).toThrow(/notificationUrl/);
	});

	it("should reject missing total field", function () {
		var req = new Signature({
			apiKey : apiKey,
			returnUrl : "https://chat.bitsie.com/pro/receipt",		
			notificationUrl : "https://chat.bitsie.com/pro/ipn",	
			templateUrl : "https://chat.bitsie.com/pro/template",	
			//total : 2.99,											
			sessionId : "932",										
			description : "Bitsie Chat Pro - Room #bitsie"			
		});
		expect(function() { req.sign(apiSecret); }).toThrow(/total/);
	});

	it("should reject missing sessionId", function () {
		var req = new Signature({
			apiKey : apiKey,
			returnUrl : "https://chat.bitsie.com/pro/receipt",		
			notificationUrl : "https://chat.bitsie.com/pro/ipn",	
			templateUrl : "https://chat.bitsie.com/pro/template",	
			total : 2.99,											
			//sessionId : "932",										
			description : "Bitsie Chat Pro - Room #bitsie"			
		});
		expect(function() { req.sign(apiSecret); }).toThrow(/sessionId/);
	});

	it("should sign valid request", function () {
		var req = new Signature({
			apiKey : apiKey,
			returnUrl : "https://chat.bitsie.com/pro/receipt",		
			notificationUrl : "https://chat.bitsie.com/pro/ipn",	
			templateUrl : "https://chat.bitsie.com/pro/template",	
			total : 2.99,											
			sessionId : "932",										
			description : "Bitsie Chat Pro - Room #bitsie"			
		});
		expect(function() { req.sign(apiSecret); }).toNotThrow();
	});

	it("should reject invalid API secret during verification", function () {
		var req = new Signature({
			apiKey : apiKey,
			returnUrl : "https://chat.bitsie.com/pro/receipt",		
			notificationUrl : "https://chat.bitsie.com/pro/ipn",	
			templateUrl : "https://chat.bitsie.com/pro/template",	
			total : 2.99,											
			sessionId : "932",										
			description : "Bitsie Chat Pro - Room #bitsie"			
		});
		var hash = req.sign(apiSecret);
		expect(function() { req.verify(hash, ""); }).toThrow(/API secret/);
		
	});

	it("should reject verification with different secret", function () {
		var req = new Signature({
			apiKey : apiKey,
			returnUrl : "https://chat.bitsie.com/pro/receipt",		
			notificationUrl : "https://chat.bitsie.com/pro/ipn",	
			templateUrl : "https://chat.bitsie.com/pro/template",	
			total : 2.99,											
			sessionId : "932",										
			description : "Bitsie Chat Pro - Room #bitsie"			
		});
		var hash = req.sign(apiSecret + "bad");
		expect(req.verify(hash, apiSecret)).toBe(false);
	});

	it("should be able to verify hash", function () {
		var req = new Signature({
			apiKey : apiKey,
			returnUrl : "https://chat.bitsie.com/pro/receipt",		
			notificationUrl : "https://chat.bitsie.com/pro/ipn",	
			templateUrl : "https://chat.bitsie.com/pro/template",	
			total : 2.99,											
			sessionId : "932",										
			description : "Bitsie Chat Pro - Room #bitsie"			
		});
		var hash = req.sign(apiSecret);
		expect(req.verify(hash, apiSecret)).toBe(true);
	});

});