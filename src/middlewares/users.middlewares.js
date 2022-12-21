import bcrypt from "bcrypt";
import { request } from "express";
import { signInSchema, userSchema } from "../models/users.model.js";
import { uniqueEmailValidation } from "../repository/users.repositories.js";

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
      return res.status(409).send("Email já cadastrado!")
    }
  
    res.locals = user;
  
    next();
  }

  export async function signInValidation(req, res, next) {
    const { email, password } = req.body;
  
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
  
    res.locals = req.body;
  
    next();
  }