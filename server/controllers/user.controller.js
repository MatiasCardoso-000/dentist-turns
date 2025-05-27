import bcryptjs from "bcryptjs";
import { UserModel } from "../models/user.model.js";
import { createToken } from "../utils/createToken.js";

export const register = async (req, res) => {
  const { email, username, password } = req.body;

  if (!email || !username || !password) {
    return res.status(401).json({ error: "All fields are required" });
  }

  const emailExists = await UserModel.findByEmail(email);
  const usernameExist = await UserModel.findByUsername(username);

  if (emailExists) {
    return res.status(400).json({ error: "The email is already in use." });
  }

  if (usernameExist) {
    return res.status(400).json({ error: "The username is in use." });
  }

  try {
    const hashedPassword = await bcryptjs.hash(password, 10);

    const newUser = await UserModel.create({
      email,
      username,
      password: hashedPassword,
    });

    const token = createToken({
      role_id: newUser.role_id,
      email: newUser.email,
    });
    res.cookie("token", token);
    return res.status(201).json({
      role_id: newUser.role_id,
      username: newUser.username,
      email: newUser.email,
      uid: newUser.uid,
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const userFound = await UserModel.findByEmail(email);

  if (!userFound) {
    return res.status(404).json({ error: "The user not exists" });
  }

  const isMatch = await bcryptjs.compare(password, userFound.password);

  if (!isMatch) {
    return res.status(400).json({ error: "Invalid password" });
  }

  const token = createToken({
    role_id: userFound.role_id,
    email: userFound.email,
  });
  res.cookie("token", token);
  return res.json({
    role_id: userFound.role_id,
    username: userFound.username,
    email: userFound.email,
    uid: userFound.uid,
  });
};

export const users = async (req, res) => {
  try {
    const users = await UserModel.find();
    if (!users) {
      return res.status(400).json([]);
    }
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const profile = async (req, res) => {
  const email = req.email;

  try {
    const userFound = await UserModel.findByEmail(email);
    if (!userFound) {
      return res.status(404).json({ error: "User not exists" });
    }
    res.json({
      username: userFound.username,
      email: userFound.email,
      role_id: userFound.role_id,
      uid: userFound.uid,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const logout = (req, res) => {
  res.clearCookie("token");
  res.json("User logged out");
};
