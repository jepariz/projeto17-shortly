import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
import { findUser, insertUser } from "../repository/users.repositories.js";

dotenv.config();

export async function signUp(req, res) {
  const { name, email, password} = res.locals;
  const hashPassword = bcrypt.hashSync(password, 10);

  try {
    await insertUser(name, email, hashPassword)
    return res.sendStatus(201);
  } catch (err) {
    return res.status(500).send(err.message);
  } 
}

export async function signIn(req, res) {
  const {email, password, name, id} = res.locals;
  const secret = process.env.SECRET

  const payload = {
    username: name,
    userId: id
  }

  const jwtToken = jwt.sign(payload, secret)

  try {
    await findUser(email, password)
    return res.status(201).send(jwtToken);
  } catch (err) {
    return res.status(500).send(err.message);
  }
}



