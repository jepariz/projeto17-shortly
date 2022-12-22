import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
import { linkSchema } from "../models/links.model.js";
import { findUrls } from "../repository/links.repositories.js";

dotenv.config();

export async function urlValidation(req, res, next) {
    const {url} = req.body;
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');
    const secret = process.env.SECRET

    if(!token) return res.sendStatus(401);

    const { error } = linkSchema.validate({url}, { abortEarly: false });
  
    if (error) {
      const errors = error.details.map((detail) => detail.message);
      return res.status(422).send(errors);
    }

    const decoded = jwt.verify(token, secret);
            
    if (!decoded) {
        return res.sendStatus(401);
    }

    const data = {
      url: url,
      userId: decoded.userId
    }

    res.locals = data;
  
    next();
  }

  export async function urlOwnerValidation(req, res, next) {
    const {id} = req.params;
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');
    const secret = process.env.SECRET

    if(!token) return res.status(401).send("token inválido");


    const url = await findUrls(id)

    if(url.rowCount < 1){
      return res.sendStatus(404)
    }

    const decoded = jwt.verify(token, secret);
            
    if (!decoded) {
        return res.sendStatus(401);
    }

    if(url.rows[0].userId !== decoded.userId){
      return res.sendStatus(401)
    }

    res.locals = id;

    next();
  }