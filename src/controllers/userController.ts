import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Op } from "sequelize";
import User from "../models/user";

//Login User
export const loginUser = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    try {
      //Search for the user
      const user = await User.findOne({ where: { username } });
      if (!user) {
        return res.status(404).json({ error: "Incorrect username" });
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

//Create Account
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
