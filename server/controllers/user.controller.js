import bcryptjs from "bcryptjs";
import cookie from "js-cookie";
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
    return res.status(201).json("User created succcesfully.");
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
  res.json("user logged.");
};

export const profile = async(req,res)=> {
  const {token} = req.headers
  console.log(token);
  
}