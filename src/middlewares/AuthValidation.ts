import { body } from "express-validator";
import { handleInputErrors } from ".";

export const login = [
  body('username')
    .notEmpty()
    .withMessage('The username is required'),
  body('password')
    .notEmpty()
    .withMessage('The password is required'),
  handleInputErrors,
];

export const register = [
  body("username")
    .notEmpty() //Check if the username is not empty
    .withMessage("The username is required")
    .bail() //Stop the validation chain if the username is not valid
    .matches(/^[a-zA-Z0-9._]{4,20}$/).withMessage("Username can contain between 4 and 20 characters long"), //Check if the username is a valid username
  body("email")
    .notEmpty() //Check if the email is not empty
    .withMessage("The email is required")
    .bail() //Stop the validation chain if the email is not valid
    .isEmail() //Check if the email is a valid email
    .withMessage("The email must be a valid email"),
  body("password")
    .notEmpty() //Check if the password is not empty
    .withMessage("The password is required")
    .bail() //Stop the validation chain if the password is not valid
    .isLength({ min: 8 }) //Check if the password is at least 8 characters long
    .withMessage("The password must be at least 8 characteres long"),
  body('confirm_password')
    .notEmpty()
    .withMessage('The password confirmation is required'),
    // .bail() //Stop the validation chain if the password confirmation is not valid
    // .custom((value, { req }) => value === req.body.password)
    // .withMessage('The passwords do not match'),
  body("profile_image")
    .optional() 
    .isURL() //Check if the profile image is a valid URL
    .withMessage("The profile image must be a valid URL"),
  handleInputErrors,
];
