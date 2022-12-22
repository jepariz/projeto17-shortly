import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
import { signInSchema, userSchema } from "../models/users.model.js";
import { uniqueEmailValidation, userExistsValidation } from "../repository/users.repositories.js";

dotenv.config();

export async function userValidation(req, res, next) {
    const {name, email, password, confirmPassword} = req.body;

    const user = req.body
  
    const { error } = userSchema.validate(user, { abortEarly: false });
  
    if (error) {
      const errors = error.details.map((detail) => detail.message);
      return res.status(422).send(errors);
    }

    const emailExists = await uniqueEmailValidation(email)

    if(emailExists.rowCount > 0){
      return res.sendStatus(409)
    }
  
    res.locals = user;
  
    next();
  }

  export async function signInValidation(req, res, next) {
    const { email, password } = req.body;
    let login;
  
    const { error } = signInSchema.validate(req.body, { abortEarly: false });
  
    if (error) {
      const errors = error.details.map((detail) => detail.message);
      return res.status(422).send(errors);
    }

    const emailExists = await uniqueEmailValidation(email)

    if(emailExists.rowCount === 0){
      return res.sendStatus(401)
    }
  
    const passwordOk = bcrypt.compareSync(password, emailExists.rows[0].password);
    
    if (!passwordOk) {
      return res.sendStatus(401);
    }

    if(emailExists.rowCount > 0 && passwordOk){
      login = {
        email: email,
        password: passwordOk,
        name: emailExists.rows[0].name,
        id: emailExists.rows[0].id
      }
    }
  
    res.locals = login;
  
    next();
  }

  export async function headerValidation(req, res, next) {
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');
    const secret = process.env.SECRET

    if(!token) return res.status(401).send("token inválido");

    const decoded = jwt.verify(token, secret);
            
    if (!decoded) {
        return res.sendStatus(401);
    }

    const userId = decoded.userId

    const userExists = userExistsValidation(userId)

    if(userExists.rowCount < 1){
      return res.sendStatus(404)
    }

    res.locals = userId;

    next();
  }