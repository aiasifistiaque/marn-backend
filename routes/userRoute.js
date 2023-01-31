import express from 'express';
import { admin, protect } from '../middleware/auth.js';
import getUser from '../controller/user/getUser.js';
import getAllUsers from '../controller/user/getAllUsers.js';
import getAnUser from '../controller/user/getAnUser.js';
import editRole from '../controller/user/editRole.js';
import getUserByMail from '../controller/user/getUserByMail.js';
import editUser from '../controller/user/editUser.js';
import sendOtp from '../controller/user/sendOtp.js';
import verifyOtp from '../controller/user/verifyOtp.js';
import resetPassword from '../controller/user/resetPassword.js';
import changePassword from '../controller/user/changePassword.js';

/**Swagger doc
 * completed
 * version 0.2
 * 18/07/21 02:35
 * total routes: 10
 * root: /api/profile/
 */

const router = express.Router();

router.route('/').post(protect, getUser);

router.route('/getallusers').post(protect, admin, getAllUsers);

router.route('/getanuser').post(protect, admin, getAnUser);

router.route('/getuserbymail').post(protect, admin, getUserByMail);

router.route('/editrole').post(protect, admin, editRole);

router.route('/edituser').put(protect, editUser);

router.route('/sendotp').post(sendOtp);

router.route('/verifyotp').post(verifyOtp);

router.route('/resetpassword').post(resetPassword);

router.route('/changepassword').post(protect, changePassword);

export default router;

/**
 * Route #1
 * @swagger
 * /profile:
 *   post:
 *     description: Get an user/self profile [PROTECT]
 *     parameters:
 *       - name: auth token
 *         description: auth token
 *         in: header
 *         required: true
 *         type: token
 *     responses:
 *       404:
 *         description: returns {msg:String} - error message
 *       200:
 *         description: returns user:Object
 */

/**
 * Route #2
 * @swagger
 * /profile/getallusers:
 *   post:
 *     description: Get all the users in system [ADMIN]
 *     parameters:
 *       - name: auth token
 *         description: admin auth token
 *         in: header
 *         required: true
 *         type: token
 *       - name: page
 *         description: page number default 0
 *         in: req body
 *         type: Number
 *       - name: perPage
 *         description: Number of products per page default 10
 *         in: req body
 *         type: Number
 *       - name: sort
 *         description: sort options [User, Admin]
 *         in: req body
 *         type: string
 *     responses:
 *       500:
 *         description: returns {msg:String} - error message
 *       200:
 *         description: returns {user:Array, count:String}
 */

/**
 * Route #3
 * @swagger
 * /profile/getanuser:
 *   post:
 *     description: Get a single user by id [ADMIN]
 *     parameters:
 *       - name: auth token
 *         description: admin auth token
 *         in: header
 *         required: true
 *         type: token
 *       - name: id
 *         description: id of the user to be searched
 *         in: req body
 *         required: true
 *         type: String
 *     responses:
 *       500:
 *         description: returns {msg:String} - error message
 *       200:
 *         description: returns {user:Object, orders:Array} - users and orders of that user
 */

/**
 * Route #4
 * @swagger
 * /profile/getuserbymail:
 *   post:
 *     description: Get a single user by mail [ADMIN]
 *     parameters:
 *       - name: auth token
 *         description: admin auth token
 *         in: header
 *         required: true
 *         type: token
 *       - name: email
 *         description: email of the user to be searched
 *         in: req body
 *         required: true
 *         type: String
 *     responses:
 *       500:
 *         description: returns {msg:String} - error message
 *       200:
 *         description: returns {user:Object, orders:Array} - users and orders of that user
 */

/**
 * Route #5
 * @swagger
 * /profile/editrole:
 *   post:
 *     description: Edit role of user [ADMIN]
 *     parameters:
 *       - name: auth token
 *         description: admin auth token
 *         in: header
 *         required: true
 *         type: token
 *       - name: id
 *         description: id of the user to be updated
 *         in: req body
 *         required: true
 *         type: String
 *       - name: role
 *         description: new role to be updated
 *         in: req body
 *         required: true
 *         type: String
 *     responses:
 *       500:
 *         description: returns {msg:String} - error message
 *       200:
 *         description: returns {user:Object, orders:Array} - users and orders of that user
 */

/**
 * Route #6
 * @swagger
 * /profile/edituser:
 *   put:
 *     description: Edit self details of user [PROTECT]
 *     parameters:
 *       - name: auth token
 *         description: user auth token
 *         in: header
 *         required: true
 *         type: token
 *       - name: name
 *         description: Name
 *         in: req body
 *         required: true
 *         type: String
 *       - name: phone
 *         description: Phone number
 *         in: req body
 *         type: String
 *     responses:
 *       500:
 *         description: returns {msg:String} - error message
 *       200:
 *         description: returns user:Object - user object
 */

/**
 * Route #7
 * @swagger
 * /profile/sendotp:
 *   post:
 *     description: Reset Password OTP sent to mail
 *     parameters:
 *       - name: email
 *         description: Email of the user
 *         in: req body
 *         required: true
 *         type: String
 *     responses:
 *       400:
 *         description: returns String - user not found error message
 *       500:
 *         description: returns {msg:String} - error message
 *       200:
 *         description: returns {status:'sent', email:String} - email where otp was sent
 */

/**
 * Route #8
 * @swagger
 * /profile/verifyotp:
 *   post:
 *     description: Reset Password OTP verification
 *     parameters:
 *       - name: email
 *         description: Email of the user
 *         in: req body
 *         required: true
 *         type: String
 *       - name: otp
 *         description: otp sent by user to verify
 *         in: req body
 *         required: true
 *         type: Number
 *     responses:
 *       400:
 *         description: returns String - otp missmatch or user not found
 *       500:
 *         description: returns {msg:String} - error message
 *       200:
 *         description: returns {status:'success', user:Object} - owner of the account
 */

/**
 * Route #9
 * @swagger
 * /profile/resetpassword:
 *   post:
 *     description: Reset Password with verified OTP
 *     parameters:
 *       - name: email
 *         description: Email of the user
 *         in: req body
 *         required: true
 *         type: String
 *       - name: otp
 *         description: otp sent by user to verify
 *         in: req body
 *         required: true
 *         type: Number
 *       - name: passoword
 *         description: New password
 *         in: req body
 *         required: true
 *         type: String
 *     responses:
 *       400:
 *         description: returns String - Error
 *       500:
 *         description: returns {msg:String} - error message
 *       200:
 *         description: returns {status:'success', email:String} - owner of the account
 */

/**
 * Route #10
 * @swagger
 * /profile/changepassword:
 *   post:
 *     description: Edit/Change password [PROTECT]
 *     parameters:
 *       - name: auth token
 *         description: User auth token
 *         in: header
 *         required: true
 *         type: String
 *       - name: password
 *         description: Old Password
 *         in: req body
 *         required: true
 *         type: String
 *       - name: newpass
 *         description: New password
 *         in: req body
 *         required: true
 *         type: String
 *     responses:
 *       400:
 *         description: returns {msg:String} - error message
 *       500:
 *         description: returns {msg:String} - error message
 *       200:
 *         description: returns {msg:String} - change successful
 */
