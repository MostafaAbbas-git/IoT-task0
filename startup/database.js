const mongoose = require('mongoose');
const winston = require('winston');
const config = require('config');

// const uri = "mongodb+srv://iotuser:i6BR3FhLxiagRhxO@iot-task0.slr9i.mongodb.net/iot-task0?retryWrites=true&w=majority";
const uri = process.env.MONGODB_URI;
module.exports = function () {
  // const db = config.get('db');
  mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      winston.info(`Connected to uri: ${uri}...`);
    });
}