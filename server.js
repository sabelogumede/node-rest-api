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

// tell the app to except json objects
app.use(express.json());

// import routes
const subscribersRouter = require("./routes/subscribers");
app.use("/subscribers", subscribersRouter);

// server port
app.listen(3000, () => console.log("Server started"));
