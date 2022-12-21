import { connection } from "../database/db.js";

export function findToken(token){
    return connection.query("SELECT * FROM sessions WHERE token=$1", [token] );
  }

export function createShortenUrl(url, shortUrl, userId){
    return connection.query(
        `INSERT INTO links (url, "shortUrl", "userId") 
        VALUES ($1, $2, $3);`,
        [url, shortUrl, userId]
      );
}

export function findUrls(id){
  return connection.query("SELECT * FROM links WHERE id=$1", [id] );
}