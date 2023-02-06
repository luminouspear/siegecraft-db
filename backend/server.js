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
app.use(express.static(publicPath));
app.use(express.static(path.join(__dirname, "client/build")));
if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "client/build")));
	app.get("*", (req, res) => {
		res.sendFile(path.join((__dirname = "client/build/index.html")));
	});
}

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname + "/client/public/index.html"));
});

// app.get('/', (req, res) => { res.send('root route') });

app.listen(PORT, function () {
	console.log("Server is running on port: " + PORT);
});
