import { connection } from "../database/db.js";

export function findToken(token){
    return connection.query("SELECT * FROM sessions WHERE token=$1", [token] );
  }

export function createShortenUrl(url, shortUrl, userId){
    return connection.query(
        `INSERT INTO links (url, "shortenUrl", "userId") 
        VALUES ($1, $2, $3);`,
        [url, shortUrl, userId]
      );
}