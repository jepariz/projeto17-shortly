import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import { findUser, insertUser } from "../repository/users.repositories.js";
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
  const {email, password} = req.body;
  const token = uuid();

  try {
    await findUser(email, password)
    return res.status(201).send(token);
  } catch (err) {
    return res.status(500).send(err.message);
  }
}



