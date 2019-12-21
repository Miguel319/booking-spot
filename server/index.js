const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const config = require('./config/dev');
const DummyDb = require('./seeder/dummy-db.js');

const rentalRoutes = require('./routes/rentals-route');
const userRoutes = require('./routes/users-route');

mongoose.connect(config.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  const dummyDb = new DummyDb();
  //dummyDb.seedToDb();
});

const app = express();

app.use(bodyParser.json());

app.use('/api/v1/rentals', rentalRoutes);
app.use('/api/v1/user', userRoutes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log("App is running!"));
