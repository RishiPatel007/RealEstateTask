const mongoose = require("mongoose");
const {
	aPropertyTypes,
	aPropertyCategory,

	nMinimumPropertyNameLength,
	nMaximumPropertyNameLength,

	nMinimumPropertyDescriptionLength,
	nMaximumPropertyDescriptionLength,

	nMaximumPropertyLocationLength,
	nMinimumPropertyLocationLength,

	nMinimumPropertyPrice,
	nMinimumPropertyBedroom,
	nMaximumPropertyBedroom,

	nMinimumPropertyBathroom,
	nMaximumPropertyBathroom,

	nMinimumPropertyParkingSlots,
	nMaximumPropertyParkingSlots,

	nMaximumPropertyImagesLength,
	nMaximumPropertyAmenetiesLength,
	nMaximumPropertyInquiriesLength,
} = require("../config");

const oPropertySchema = new mongoose.Schema(
	{
		aImages: {
			type: [String],
			default: [
				"https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg",
			],
			validate: {
				validator: function (array) {
					return array.length <= nMaximumPropertyImagesLength;
				},
				message: `Array cannot have more than ${nMaximumPropertyImagesLength} elements.`,
			},
		},

		sName: {
			type: String,
			minLength: nMinimumPropertyNameLength,
			maxLength: nMaximumPropertyNameLength,
			required: true,
			unique: true,
		},
		sDescription: {
			type: String,
			minLength: nMinimumPropertyDescriptionLength,
			maxLength: nMaximumPropertyDescriptionLength,
			required: true,
		},
		sType: {
			type: String,
			enum: aPropertyTypes,
			required: true,
		},
		sCategory: {
			type: String,
			enum: aPropertyCategory,
			required: true,
		},
		sLocation: {
			type: String,
			required: true,
			minLength: nMinimumPropertyLocationLength,
			maxLength: nMaximumPropertyLocationLength,
		},
		nRegularPrice: {
			type: Number,
			min: nMinimumPropertyPrice,
			required: true,
		},
		nDiscountedPrice: {
			type: Number,
			min: nMinimumPropertyPrice,
			required: true,
		},

		bIsFurnished: {
			type: Boolean,
		},
		nBedroom: {
			type: Number,
			min: nMinimumPropertyBedroom,
			max: nMaximumPropertyBedroom,
		},
		nBathroom: {
			type: Number,
			min: nMinimumPropertyBathroom,
			max: nMaximumPropertyBathroom,
		},
		nParkingSlots: {
			type: Number,
			min: nMinimumPropertyParkingSlots,
			max: nMaximumPropertyParkingSlots,
			required: true,
		},

		aAmenities: {
			type: [String],
			required: true,
			default: [],
			validate: {
				validator: function (array) {
					return array.length <= nMaximumPropertyAmenetiesLength;
				},
				message: `Array cannot have more than ${nMaximumPropertyAmenetiesLength} elements.`,
			},
		},

		aInquires: {
			type: [mongoose.SchemaTypes.ObjectId],
			default: [],
			validate: {
				validator: function (array) {
					return array.length <= nMaximumPropertyInquiriesLength;
				},
				message: `Array cannot have more than ${nMaximumPropertyInquiriesLength} elements.`,
			},
		},
		iAgent_id: {
			type: mongoose.SchemaTypes.ObjectId,
			ref: "Agent",
		},
		iOwner_id: {
			type: mongoose.SchemaTypes.ObjectId,
			ref: "Client",
			required: true,
		},
	},
	{ timestamps: true }
);

oPropertySchema.pre("validate", function (next) {
	const allowedTypes = ["flat", "bunglow"];

	if (!allowedTypes.includes(this.sType)) {
		this.nBedroom = undefined;
		this.nBathroom = undefined;
		this.bIsFurnished = undefined;
	} else if (
		this.nBedroom == null ||
		this.nBathroom == null ||
		this.bIsFurnished == null
	) {
		throw new Error(
			"Bedroom, Bathroom and Furnished fielsd are required for type flat/bunglow."
		);
	}

	next();
});

module.exports = mongoose.model("Property", oPropertySchema);
