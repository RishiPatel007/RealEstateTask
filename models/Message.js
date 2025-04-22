const mongoose = require("mongoose");
const { nMaxMessageLength } = require("../config");

const oMessageSchema = new mongoose.Schema(
	{
		sMessage: {
			type: String,
			maxLength: nMaxMessageLength,
			required: true,
		},
		iFrom: {
			type: mongoose.SchemaTypes.ObjectId,
			ref: "User",
			required: true,
		},
		iTo: {
			type: mongoose.SchemaTypes.ObjectId,
			ref: "User",
			required: true,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Message", oMessageSchema);
