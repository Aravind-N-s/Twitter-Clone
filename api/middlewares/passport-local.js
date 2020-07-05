/** Local Strategy
 * @module strategy/local
 */

/**
 * @namespace localStrategy
 */

/**
 * Requiring passport
 * @const
 */
const passport = require("passport");
/**
 * Requiring LocalStrategy from passport
 * @const
 */
const LocalStrategy = require("passport-local").Strategy;
/**
 * Mongoose Model for User.
 * @const
 */
const { User } = require("../models");
/**
 * A library to hash tthe password.
 * @const
 */
const bcryptjs = require("bcryptjs");
/**
 * @typedef {Object} options
 * @property {string} username - field/json property name in request body
 * @property {string} password - field/json property name in request body
 */
const options = {
  usernameField: "email",
  passwordField: "password",
};
/**
 * Adding Local Strategy
 * @name use
 * @function
 * @memberof module:strategy/local~localStrategy
 * @inner
 * @param {Object} LocalStrategyOptions - Local Strategy Options
 */
passport.use(
  new LocalStrategy(options, (email, password, done) => {
    // Fetch User By Email
    User.findOne({ email }).then((user) => {
      if (!user) {
        return done(null, "User Not Found");
      }
      // Validate Password/
      bcryptjs
        .compare(password, user.password)
        .then((result) => {
          if (result) {
            return done(null, user);
          }
          done();
        })
        .catch((err) => {
          return done(err);
        });
    });
  })
);
