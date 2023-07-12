const express = require('express');
const dotenv = require('dotenv');
const app = express();
const ConnectDb = require('./src/config/database');

dotenv.config();
ConnectDb();
const PORT = process.env.PORT;
app.listen(PORT, () =>
  console.log(`Express server is running, listening on port ${PORT}`)
);
