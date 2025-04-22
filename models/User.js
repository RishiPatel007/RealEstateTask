const mongoose = require("mongoose");
const {
	nMinimumUsernameLength,
	nMaximumUsernameLength,
	rEmailRegex,
	rUsernameRegex,
	rPhoneRegex,
	nMinimumRating,
	nMaximumRating,
	nMaximumFavouritesLength,
	nMaximumPropertyInquiriesLength,
} = require("../config");

const oBaseUserSchema = new mongoose.Schema(
	{
		sUsername: {
			type: String,
			required: true,
			unique: true,
			minLength: nMinimumUsernameLength,
			maxLength: nMaximumUsernameLength,
			match: rUsernameRegex,
		},
		sPassword: {
			type: String,
			required: true,
		},
		nPhone: {
			type: String,
			match: rPhoneRegex,
			required: true,
			unique: true,
		},
		nPhoneCode: {
			type: Number,
			required: true,
		},
		sEmail: {
			type: String,
			match: rEmailRegex,
			required: true,
			unique: true,
		},
	},
	{ discriminatorKey: "sUserType", timestamps: true }
);

const BaseUser = mongoose.model("User", oBaseUserSchema);

const oClientSchema = new mongoose.Schema({
	aFavouriteListings: {
		type: [mongoose.SchemaTypes.ObjectId],
		ref: "Property",
		default: [],
		validate: {
			validator: function (array) {
				return array.length <= nMaximumFavouritesLength;
			},
			message: `Array cannot have more than ${nMaximumPropertyInquiriesLength} elements.`,
		},
	},
});

const oAgentSchema = new mongoose.Schema({
	nRating: {
		type: Number,
		min: nMinimumRating,
		max: nMaximumRating,
		required: true,
	},
});

const Client = BaseUser.discriminator("Client", oClientSchema);
const Agent = BaseUser.discriminator("Agent", oAgentSchema);

module.exports = { Client, Agent };
