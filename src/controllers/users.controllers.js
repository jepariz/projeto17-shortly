import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
import { findUser, getLinks, getTotalVisitedSum, insertUser, userExistsValidation } from "../repository/users.repositories.js";

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

export async function getUserLinks(req, res) {

  const userId = res.locals

  try {
    const totalVisited = await getTotalVisitedSum()
    const visitedSum = totalVisited.rows[0].totalVisited

    const links = await getLinks(userId)

    const linksData = links.rows

    const response = {
      id: linksData[0].id,
      name: linksData[0].name,
      visitCount: visitedSum,
      shortenedUrls: linksData.map((row) => ({
        id: row.linkId,
        shortUrl: row.shortUrl,
        url: row.url,
        visitCount: row.visitCount,
      })),
    };

    return res.status(200).send(response);
  } catch (err) {
    return res.status(500).send(err.message);
  }
}


