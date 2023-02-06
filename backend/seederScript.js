const cardData = require("./data/cards.js");
const connectDB = require("./config/db");
const Card = require("./models/Card");

connectDB();

const importData = async () => {
	try {
		await Card.deleteMany({});
		await Card.insertMany(cardData);

		console.log("Data imported successfully");

		process.exit();
	} catch (err) {
		console.error(`Error with data import\n${err}`);
		process.exit(1);
	}
};

importData();
