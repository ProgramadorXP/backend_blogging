import { body, param } from "express-validator";
import { Op } from "sequelize";
import { User } from "../models";
import { handleInputErrors } from ".";

export const validateGetUser = [
  param("id")
    .isInt() //Check if the id is a valid integer number
    .withMessage('The id must be a valid integer number')
    .toInt(), //Convert the param to integer if it is valid
];

export const validateCreateUser = [
  body("username")
    .notEmpty() //Check if the username is not empty
    .withMessage("The username is required")
    .isLength({ min: 4 }) //Check if the username is at least 4 characters long
    .withMessage("The username must be at least 4 characteres long")
    .custom(async (value, { req }) => {
      const existingUser = await User.findOne({
        where: { [Op.or]: [{ username: value }, { email: req.body.email }] },
      });
      if (existingUser) {
        throw new Error(
          "The username or email already exists"
        );
      }
      return true;
    }),
  body("email")
    .notEmpty() //Check if the email is not empty
    .withMessage("The email is required")
    .isEmail() //Check if the email is a valid email
    .withMessage("The email must be a valid email"),
  body("password")
    .notEmpty() //Check if the password is not empty
    .withMessage("The password is required")
    .isLength({ min: 8 }) //Check if the password is at least 8 characters long
    .withMessage("The password must be at least 8 characteres long"),
  body('confirm_password')
  .custom((value, { req }) => value === req.body.password)
  .withMessage('The passwords do not match'),
  body("profile_image")
    .optional() 
    .isURL() //Check if the profile image is a valid URL
    .withMessage("The profile image must be a valid URL"),
];

export const validateUpdateUser = [
  body('id')
    .isInt().withMessage('The ID must be a valid integer number'),
  body('username')
    .optional()
    .isLength({ min: 3 }).withMessage('The ussername must be at least 3 characters long'),
  body('email')
    .optional()
    .isEmail().withMessage('must be a valid email'),
  body('password')
    .optional()
    .isLength({ min:  8 })
    .withMessage('The password must be at least 8 characters long'),
  body('confirm_password')
    .optional()
    .custom((value, { req }) => value === req.body.password)
    .withMessage('The passwords do not match'),
  body('profile_image')
    .optional()
    .isURL().withMessage('The image must be a valid URL'),
];

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
