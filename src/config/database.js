const mongoose = require('mongoose');

const ConnectDb = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Mongodb connected');
  } catch (err) {
    console.log(`Connection to db failed with error ${err}`);
  }
};

module.exports = ConnectDb;
