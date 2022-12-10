const userRouter = require("express").Router();
const { body } = require("express-validator");
const { signup, login } = require("../controllers/user.controller");
//Schema
/**
 * @swagger
 * components:
 *  schemas:
 *    User:
 *      type: object
 *      required:
 *        - name
 *        - email
 *        - password
 *      properties:
 *        id:
 *          type: string
 *          description: The auto-generated Id of the User
 *        name:
 *          type: string
 *          description: The name of the User
 *        email:
 *          type: email
 *          description: The email of the User
 *        password:
 *          type: password
 *          description: The Password of the User
 *      example:
 *        name: Akshat Singh Rajput 
 *        email: Akshatsinghrajput201@gmail.com
 *        password: 123456a
 *
 */

//Tags
/**
 * @swagger
 * tags:
 *   name: User
 *   description: This Authenticate and Authorize the user
 */

//Routes
/** *
 * @swagger
 * /login:
 *   post:
 *      summary: Login the Existing User
 *      description: Use to authenticate the User with credentials
 *      tags: [User]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required: 
 *                   - email
 *                   - password
 *              properties:
 *                   email: 
 *                     type: email
 *                     description: Email of the User
 *                   password:
 *                     type: password
 *                     description: Password of the User
 *              example:
 *                   email: Akshatsingddh@gmail.com
 *                   password: 124r55
 *      responses:
 *        '200':
 *            description: A Succesful Response
 *        '400':
 *            description: Invalid Credentials
 *        '429':
 *            description: Api limit Exceeded!
 *        '500':
 *            description: Server Error
 */

userRouter.post(
  "/login",
  [
    body("email", "Enter a valid Email").isEmail(),
    body("password", "Password Cannot Be empty").isLength({
      min: 6,
    }),
  ],
  login
);

//Routes
/** *
 * @swagger
 * /signup:
 *   post:
 *      summary: Signup for New Users
 *      description: Use to create new Users
 *      tags: [User]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required: 
 *                   - name
 *                   - email
 *                   - password
 *              properties:
 *                   name:
 *                     type: String
 *                     description: Name of the User
 *                   email: 
 *                     type: email
 *                     description: Email of the User
 *                   password:
 *                     type: password
 *                     description: Password of the User
 *              example:
 *                   name: Akshat2
 *                   email: Akshatsinghrajput201@gmail.com
 *                   password: 124r55
 *      responses:
 *        '200':
 *            description: A Succesful Response
 *        '400':
 *            description: User Already Exists
 *        '429':
 *            description: Api limit Exceeded!
 *        '500':
 *            description: Server Error
 */
userRouter.post(
  "/signup",
  [
    body("email", "Enter a valid Email").isEmail(),
    body("password", "Password Should be greater than 6 Characters").isLength({
      min: 6,
    }),
    body("name", "Name cannot be empty").exists(),
  ],
  signup
);

module.exports = userRouter;
