import { nanoid } from 'nanoid'
import { createShortenUrl } from '../repository/links.repositories.js';

export async function shortenUrl(req, res) {
    const {url, userId} = res.locals;

    const shortUrl = nanoid(8)
  
    try {
      await createShortenUrl(url, shortUrl, userId)
      return res.status(201).send(shortUrl);
    } catch (err) {
      return res.status(500).send(err.message);
    } 
  }