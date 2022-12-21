import { linkSchema } from "../models/links.model.js";
import { findToken } from "../repository/links.repositories.js";


export async function urlValidation(req, res, next) {
    const {url} = req.body;
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');

    if(!token) return res.sendStatus(401);

    const { error } = linkSchema.validate({url}, { abortEarly: false });
  
    if (error) {
      const errors = error.details.map((detail) => detail.message);
      return res.status(422).send(errors);
    }

    const session = await findToken(token);
            
    if (session.rowCount < 1) {
        return res.sendStatus(401);
    }

    const data = {
      url: url,
      userId: session.rows[0].userId
    }

    res.locals = data;
  
    next();
  }