import { connection } from "../database/db.js";

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

export function findShortUrls(shortUrl){
  return connection.query('SELECT * FROM links WHERE "shortUrl"=$1', [shortUrl] );
}

export function addVisitCount(id){
  return connection.query('UPDATE links SET "visitCount"= ("visitCount" + 1) WHERE id=$1', [id]);
}

export function deleteUrlFromDb(id){
  return connection.query('DELETE FROM links WHERE id=$1', [id]);
}