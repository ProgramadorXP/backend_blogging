import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import { Op } from "sequelize";
import User from "../models/user";

//Get All Users
export const getAllUsers = async (req: Request, res: Response) => {
  //It's not necessary to implement middlewares for this route because it's doesn't have any req.body or req.params

  //Logic to get all users
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Error to get all users" });
  }
};

//Get User By ID
export const getUserById = async (req: Request, res: Response) => {
  const errors = validationResult(req);

  // If there are errors, return them in the response
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  //Logic to get user by id
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Error to get user by id" });
  }
};

// Create User
export const createUser = async (req: Request, res: Response) => {
  const errors = validationResult(req);

  //If there are errors, return them in the response
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  //Logic to create user(register)
  const { username, email, password, confirm_password, profile_image } =
    req.body;

  try {
    const user = await User.create({
      username,
      email,
      password,
      confirm_password,
      profile_image,
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: "Error to create user" });
  }
};

//Update User
export const updateUser = async (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  try {
    const { id } = req.params; //Id of the user to update
    const { username, email, password, profile_image } = req.body; //Data to update

    try {
      //Search for the user id
      const user = await User.findByPk(id);
      if (!user) {
        res.status(404).json({ error: "User not found" });
        return;
      }

      //Check if the email is already in use
      if (email && email !== user.email) {
        const emailExists = await User.findOne({ where: { email } });
        if (emailExists) {
          res.status(400).json({ error: "The email already exists" });
          return;
        }
      }

      //Check if the username is already in use
      if (username && username !== user.username) {
        const usernameExists = await User.findOne({ where: { username } });
        if (usernameExists) {
          res.status(400).json({ error: "The username already exists" });
          return;
        }
      }

      //Hash the password if it is provided
      if (password) {
        user.password = await bcrypt.hash(password, 10);
      }

      //Update the fields allowed
      if (email) user.email = email;
      if (username) user.username = username;
      if (profile_image) user.profile_image = profile_image;

      await user.save(); // Save the changes
      res.status(200).json({ message: "Data updated successfully", user });
    } catch (error) {
      res.status(500).json({ errors: "Error to update user" });
    }
  } catch (error) {
    res.status(500).json({ errors: "Error to update user" });
    return;
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  try {
    const { id } = req.params; //Id of the user to delete

    try {
      //Search for the user id
      const user = await User.findByPk(id);
      if (!user) {
        res.status(404).json({ error: "User not found" });
        return;
      }

      await user.destroy(); // Delete the user
      res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      res.status(500).json({ errors: "Error to delete user" });
    }
  } catch (error) {
    res.status(500).json({ errors: "Error to delete user" });
    return;
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    try {
      //Search for the user
      const user = await User.findOne({ where: { username } });
      if (!user) {
        return res.status(404).json({ error: "Invalid credentials" });
      }

      //Check if the password is correct
      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (!isPasswordCorrect) {
        return res.status(401).json({ error: "Incorrect password" });
      }

      //Generate a token
      const token = jwt.sign(
        { id: user.id },
        process.env.JWT_SECRET!,
        { expiresIn: "1m" } // Set the expiration time for the token according to your needs
      );

      res.status(200).json({
        message: "Login successful",
        token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
        },
      });
    } catch (error) {
      res.status(500).json({ errors: "Error to login" });
    }
  } catch (error) {
    res.status(500).json({ errors: "Error to login" });
  }
};

export const createAccount = async (req: Request, res: Response) => {
  const { username, email, password, confirm_password } = req.body;
  
  if (password !== confirm_password) {
    return res.status(400).json({ error: 'Passwords do not match' });
  }

  try {
    //Check if the username or email is already in use
    const existingUser = await User.findOne({
      where: {
        [Op.or]: [{ username }, { email }],
      },
    });

    if (existingUser) {
      const errorMsg =
        existingUser.username === username
          ? 'The username already exists'
          : 'The email already exists';
      return res.status(409).json({ error: errorMsg });
    }

    //Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    //Create the user
    await User.create({
      username,
      email,
      password: hashedPassword,
    });

    return res.status(201).send('User created successfully');
  } catch (error) {
    return res.status(500).json({ error: 'Error to register' });
  }
};
