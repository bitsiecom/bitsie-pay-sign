var crypto = require('crypto');

Signature = function(form) {
	this.form = form;
};

Signature.prototype.serialize = function(form) {
	return JSON.stringify({
		apiKey : this.form.apiKey,
		returnUrl : this.form.returnUrl,
		notificationUrl : this.form.notificationUrl,
		templateUrl : this.form.templateUrl,
		total : this.form.total,
		sessionId : this.form.sessionId,
		description : this.form.description
	});
}

Signature.prototype.sign = function(apiSecret) {
	if (!this.form.apiKey) throw new Error("The apiKey field is required.");
	if (!this.form.returnUrl) throw new Error("The returnUrl field is required.");
	if (!this.form.notificationUrl) throw new Error("The notificationUrl field is required.");
	if (!this.form.total) throw new Error("The total field must be greater than zero.");
	if (!this.form.sessionId) throw new Error("The sessionId field is required.");

	var serialized = this.serialize(this.form);
	var sha256 = crypto.createHash("sha256");
	sha256.update(serialized + apiSecret, "utf8");
	return sha256.digest("base64");
};

Signature.prototype.verify = function(hash, apiSecret) {
	if (!apiSecret) throw new Error("Empty or invalid API secret.");
	return this.sign(apiSecret) == hash;
};

module.exports = Signature;
