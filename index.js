const cors = require('cors');
const express = require('express');
const dotenv = require('dotenv');
const app = express();
const userRoutes = require('./src/routes/user.routes');
const ConnectDb = require('./src/config/database');

dotenv.config();
ConnectDb();
app.use(express.json());
const PORT = process.env.PORT;
app.use(cors({ credentials: true, origin: process.env.APP_URL || '' }));
app.use('/api/user', userRoutes);
app.use('/api/', (req, res) => res.send('Api running :)'));
app.listen(PORT, () =>
  console.log(`Express server is running, listening on port ${PORT}`)
);
