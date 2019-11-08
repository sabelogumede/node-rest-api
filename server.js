// environment configaration
require("dotenv").config();

// dependencies
const express = require("express");
const app = express();
const mongoose = require("mongoose");

// mongodb connection, parsing environment connection string
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", error => console.error(error));
db.once("open", () => console.log("Connected to Database"));

// get the app to eccept json objects
app.use(express.json);

// import routes
const subscribersRoutes = require("./routes/subscribers");
app.use("/subscribers", subscribersRoutes);

// server port
app.listen(3000, () => console.log("Server started"));
