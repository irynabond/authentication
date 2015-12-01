var mongoose = require('mongoose');

var countrySchema = new mongoose.Schema({
	name: {type: String, required: true},
	places: String,
	durationDays: {type: Number, validate: {
		validator: function(value) {
			Number.max = 365;
			return value == 1;
		},
		message: "Please, enter correct duration"
		}
	},
	description: String
});

module.exports = mongoose.model('Country', countrySchema);

var mongoose = require('mongoose');

