/** Mongoose Configuration
 * @module connection/mongoose
 */

/**
 * @namespace mongooseConfiguration
 */

/**
 * Requiring Mongoose
 * @const
 */
const mongoose = require("mongoose");

/**
 * Loading env variables to application
 */
require("dotenv").config();

/**
 * Requiring Loggers
 * @const
 */
const { consoleLogger, crashLogger } = require("../config/logger");

mongoose.Promise = global.Promise;
/**
 * @typedef {Object} mongoose options
 * @property {Boolean} useCreateIndex Ask MongoDB to be able to identify unique fields
 * @property {Boolean} useFindAndModify New Mongoose option to be able to use findById() etc.
 */
const CONNECTION_URI = process.env.MONGODB_URI;

/**
 * Opening Mongoose Connection
 * @name connect
 * @function
 * @memberof module:connection/mongoose~mongooseConfiguration
 * @inner
 * @param {string} CONNECTION_URI - MongoDB Connection URL
 * @param {Boolean} useNewUrlParser To parser MongoDB connection strings
 */
mongoose
  .connect(CONNECTION_URI)
  .then(() => {
    consoleLogger.info("Connected to the DB");
  })
  .catch((err) => {
    consoleLogger.fatal("ERROR connected to DB", err);
    crashLogger.fatal("ERROR connected to DB", err);
  });

module.exports = {
  mongoose,
};
