//Following mongodb connection protocol from
// https://kb.objectrocket.com/mongo-db/create-react-app-with-mongodb-part-2-building-the-backend-900

require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const cardRoutes = require("./routes/cardRoutes.js");
const connectDB = require("./config/db");
const path = require("path");

connectDB();

const PORT = process.env.PORT || 4040;
app.use(cors());
app.use(express.json());

//define paths
app.use("/api/cards", cardRoutes);

//serve static files from the react app
app.use(express.static("/public"));

app.get("*", (req, res) => {
	res.sendFile("/public/index.html");
});


app.listen(PORT, function () {
	console.log("Server is running on port: " + PORT);
});
