const path = require("path");
require("dotenv").config({
	override: true,
	path: path.resolve(__dirname, "../.env"),
});

const express = require("express"),
	app = express(),
	bodyParser = require("body-parser");

// Middleware
app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
		extended: true,
	}),
);

const cors = require("cors");
console.log(
	"Allowing CORS from " +
		process.env.VITE_API_REQUESTS_URL +
		" " +
		process.env.VITE_API_CHAR_URL,
);
app.use(
	cors({
		origin: [process.env.VITE_API_REQUESTS_URL, process.env.VITE_API_CHAR_URL],
		methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
		allowedHeaders: [
			"Content-Type",
			"Authorization",
			"Cache-Control",
			"Pragma",
			"Expires",
		],
	}),
);

// Connecting to db
const mongoose = require("mongoose");
mongoose.set("debug", true);
mongoose
	.connect(process.env.MONGOOSE_DB_URL)
	.then(() => {
		mongoose.Promise = Promise;
		console.log(
			"SUCCESS: Connected to MongoDB on " + process.env.MONGOOSE_DB_URL,
		);

		// Once db is connected, start the server
		app.listen(process.env.PORT, () => {
			console.log("APP IS RUNNING ON PORT " + process.env.PORT);
		});
	})
	.catch((err) => console.error("Database connection failed:", err));

// Main routes
app.get("/", (req, res) => {
	res.send("Home");
});

// Routes
const charRoutes = require("./routes/character");
app.use("/api/character", charRoutes);

// Catching any other route
app.use("/api/*splat", (req, res) => {
	res
		.status(404)
		.json({ error: "The page you are trying to reach doesn't exist" });
});

app.get("/*splat", (req, res) => {
	res.redirect("/");
});
