import { linkSchema } from "../models/links.model.js";
import { findOwner, findToken, findUrls } from "../repository/links.repositories.js";


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

  export async function urlOwnerValidation(req, res, next) {
    const {id} = req.params;
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');

    if(!token) return res.status(401).send("token inválido");


    const url = await findUrls(id)

    if(url.rowCount < 1){
      return res.sendStatus(404)
    }

    const urlOwner = await findOwner(token, id);

    console.log(urlOwner.rows)
            
    if (urlOwner.rowCount < 1) {
        return res.sendStatus(401)
    }

    res.locals = id;

    next();
  }