const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const config = require("./config/dev");
const DummyDb = require("./seeder/dummy-db.js");
const errorHandler = require("./middleware/error");
const BASE_URL = "/api/v1";
const cookieParser = require('cookie-parser');

//Routes
const rentalRoutes = require("./routes/rental");
const authRoutes = require("./routes/auth");

// Mongoose connection
mongoose
  .connect(config.DB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true
  })
  .then(() => {
    const dummyDb = new DummyDb();
    // dummyDb.seedToDb();
  });

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());

app.use(`${BASE_URL}/rentals`, rentalRoutes);
app.use(`${BASE_URL}/auth`, authRoutes);
 
app.use(errorHandler);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log("App is running!"));
