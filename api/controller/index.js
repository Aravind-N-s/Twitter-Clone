/** User Controller
 * @module api/controllers
 */

/**
 * @namespace userController
 */
/**
 * Loading env variables to application
 */
require("dotenv").config;
const _ = require("lodash");
const Twitter = require("twitter");
const client = new Twitter({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token_key: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET
});
/**
 * An implementation of JSON Web Tokens in Node.JS.
 * @const
 */
const jwt = require("jsonwebtoken");
/**
 * Mongoose Model for User.
 * @const
 */
const { User } = require("../models");
/**
 * Constants enumerating the HTTP status codes.
 * @const
 */
const HttpStatus = require("http-status-codes");
/**
 * Constants having logger function.
 * @const
 */
const { logger, consoleLogger } = require("../../config/logger");
/**
 * Socket values imported from index
 * @const
 */
const { io } = require("../../index");
/**
 * Controller to handle user registration
 * @name register
 * @function
 * @memberof module:api/controllers~userController
 * @inner
 * @param {Object} request - Request Object
 * @param {Object} response - Response Object
 */
module.exports.register = async (req, res) => {
  logger.addContext("route", req.route.path);
  const { body } = req;
  const newUser = await User.create({ ...body }, async (err, user) => {
    if (err) {
      const { errors } = err;
      logger.error(`${Object.keys(errors)} errors are existed`);
      return res
        .status(HttpStatus.NOT_ACCEPTABLE)
        .json({ errors, message: "-User Cannot be Registed-" });
    }
    const responseData = _.pick(user, [
      "_id",
      "username",
      "email",
      "phone",
      "firstName",
      "lastName",
      "name"
    ]);
    logger.info(`user was registered with the email ${user.email}`);
    return res
      .status(HttpStatus.OK)
      .json({ responseData, message: "-User Is Sucessfully Registered-" });
  });
};

/**
 * Controller to handle user Login
 * @name login
 * @function
 * @memberof module:api/controllers~userController
 * @inner
 * @param {Object} request - Request Object
 * @param {Object} response - Response Object
 */
module.exports.login = (req, res) => {
  logger.addContext("route", req.route.path);
  const { user } = req;
  if (user !== "error") {
    const tokenData = {
      _id: user._id,
      username: user.username,
      createdAt: Number(new Date())
    };
    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET);
    logger.error(`-${user.email} was logged in.-`);
    return res
      .status(HttpStatus.OK)
      .json({ token, message: "User Details Listed." });
  } else {
    logger.error(`-${err} errors are existed-`);
    return res
      .status(HttpStatus.NOT_ACCEPTABLE)
      .json({ err, message: "Please Try Again." });
  }
};

/**
 * Controller to handle user account data
 * @name account
 * @function
 * @memberof module:api/controllers~userController
 * @inner
 * @param {Object} request - Request Object
 * @param {Object} response - Response Object
 */
module.exports.account = async (req, res) => {
  logger.addContext("route", req.route.path);
  const { user } = req;
  const responseData = _.pick(user, [
    "_id",
    "username",
    "email",
    "phone",
    "firstName",
    "lastName",
    "name"
  ]);
  logger.info(`-${responseData.email} was given his profile information in.-`);
  return res
    .status(HttpStatus.OK)
    .json({ responseData, message: "-User data sucessfully dispatched-" });
};

/**
 * Controller to handle user queries
 * @name account
 * @function
 * @memberof module:api/controllers~userController
 * @inner
 * @param {Object} request - Request Object
 * @param {Object} response - Response Object
 */
module.exports.search = async (req, res) => {
  logger.addContext("route", req.route.path);
  const { searchTerm } = req.body;
  let params = { q: searchTerm, count: 100 };
  client.get("search/tweets", params, (error, tweets) => {
    if (!error) {
      res.json(tweets);
    } else {
      consoleLogger.fatal({ error });
      res.send(error);
    }
  });
  let stream = client.stream("statuses/filter", { track: searchTerm });
  stream.on("data", event => {
    io.emit("event", event);
  });
  stream.on("error", function(error) {
    console.log(error, "err");
  });
};
/**
 * Controller to handle user logout
 * Not Used
 * @name logout
 * @function
 * @memberof module:api/controllers~userController
 * @inner
 * @param {Object} request - Request Object
 * @param {Object} response - Response Object
 */
module.exports.logout = (req, res) => {
  res.json("User is logged Out");
};
