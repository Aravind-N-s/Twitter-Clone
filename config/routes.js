/** Express router providing user related routes
 * @module user/routes
 */

/**
 * @namespace usersRouter
 */

/**
 * Express router to mount user related functions on.
 * @const
 */
const express = require ('express')
const router = express.Router()

/**
 * Passport.js as an authentication middleware.
 * @const
 */
const passport = require('passport')

/**
 * Controller Methods responsible for user Registration and Login
 * @const
 */
const usercontroller = require('../api/controller')

/**
 * Route registeing user with email, password, user name
 * @name /user/register
 * @function
 * @memberof module:user/routes~usersRouter
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.post('/register', usercontroller.register)
/**
 * Route logining user with email, password
 * @name /user/login
 * @function
 * @memberof module:user/routes~usersRouter
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.post('/login',passport.authenticate('local',{session:false}),usercontroller.login)
// router.put('/account/edit',passport.authenticate('local',{session: false}), usercontroller)
/**
 * Route to get user account with token
 * @name /user/register
 * @function
 * @memberof module:user/routes~usersRouter
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.get('/account',passport.authenticate('jwt',{session:false}), usercontroller.account)
router.post('/stream',passport.authenticate('jwt',{session:false}), usercontroller.search)
module.exports = router