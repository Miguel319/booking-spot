const express = require("express");
const mongoose = require("mongoose");
const config = require('./config/dev');
const DummyDb = require('./seeder/dummy-db.js');
const rentalRoutes = require('./routes/rentals-route');

mongoose.connect(config.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  const dummyDb = new DummyDb();
  dummyDb.seedToDb();
});

const app = express();

app.use('/api/v1/rentals', rentalRoutes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log("App is running!"));
