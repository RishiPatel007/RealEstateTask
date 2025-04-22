const mongoose = require("mongoose");
const { Client, Agent, Message, Property } = require("./models");
(async function main() {
	await mongoose.connect("mongodb://127.0.0.1:27017/RealEstateDemo");

	const client = new Client({
		username : "A1233",
		password : "123",
		contact : {
			phone : 9876412345,
			email : "temps@something.com"
		}
	});
	client.save()
})();
