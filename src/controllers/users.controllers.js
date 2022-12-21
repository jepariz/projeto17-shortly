import bcrypt from "bcrypt";
import { insertUser } from "../repository/users.repositories.js";

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