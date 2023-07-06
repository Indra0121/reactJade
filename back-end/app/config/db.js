const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const MONGO_DEV_URL = process.env.MONGO_DEV_URL;

exports.connect = async () => {
  try {
    const dbConn = await mongoose.connect(MONGO_DEV_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`Connected to database: ${dbConn.connection.name}`);
  } catch (error) {
    console.log(`Error connecting to database: ${error.message}`);
  }
};

// Call the connect function
exports.connect().catch((error) => console.log(`Error: ${error.message}`));
