const Card = require("../models/Card");

const getCards = async (req, res) => {
	console.log("getCards running in backend/controllers/cardController.js");

	try {
		const cards = await Card.find({});
		res.json(cards);
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "server error" });
	}
};

const getCardById = async (req, res) => {
	try {
		const card = await Card.findOne({ cardID: req.params.id });
		res.json(card);
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "server error" });
	}
};

module.exports = {
	getCards,
	getCardById,
};
