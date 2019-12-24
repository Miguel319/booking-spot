const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const config = require("./config/dev");
const DummyDb = require("./seeder/dummy-db.js");
const errorHandler = require("./middleware/error");
const BASE_URL = "/api/v1";

//Routes
const rentalRoutes = require("./routes/rentals-route");
const userRoutes = require("./routes/users-route");

// Mongoose connection
mongoose
  .connect(config.DB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true
  })
  .then(() => {
    const dummyDb = new DummyDb();
    dummyDb.seedToDb();
  });

const app = express();

app.use(bodyParser.json());
app.use(`${BASE_URL}/rentals`, rentalRoutes);
app.use(`${BASE_URL}/auth`, userRoutes);
 
app.use(errorHandler);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log("App is running!"));
