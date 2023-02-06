const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
	cardID: {
		type: String,
		required: true,
	},
	cardName: {
		type: String,
		required: true,
	},
	superType: {
		type: String,
		required: false,
	},
	type: {
		type: String,
		required: true,
	},
	subType: {
		type: String,
		required: false,
	},
	cardElement: {
		type: String,
		required: true,
	},
	manaCost: {
		type: String,
		required: false,
	},
	cardText: {
		type: String,
		required: false,
	},
	cardElementalAffiliation: {
		type: String,
		required: false,
	},
	strength: {
		type: Number,
		required: false,
	},
	defense: {
		type: Number,
		required: false,
	},
	manaProduced: {
		type: String,
		required: false,
	},
	territoryDefense: {
		type: Number,
		required: false,
	},
	flavorText: {
		type: String,
		required: false,
	},
	imageUrl: {
		type: String,
		required: true,
	},
	imageAltText: {
		type: String,
		required: true,
	},
	elementID: {
		type: String,
		required: true,
	},
	cardNumber: {
		type: Number,
		required: true,
	},
	rarity: {
		type: String,
		required: true,
	},
	deckbuildingPoints: {
		type: Number,
		required: true,
	},
	cardImage: {
		type: String,
		required: true,
	},
	set: {
		type: String,
		required: true,
	},
	subSet: {
		type: String,
		required: true,
	},
	copyrightText: {
		type: String,
		required: true,
	},
});

const Card = mongoose.model("Card", cardSchema);

module.exports = Card;
