import { connection } from "../database/db.js";

export function getRanking(){
    return connection.query('SELECT u.id, u.name, COUNT(l."userId") AS "linksCount", SUM(l."visitCount") AS "visitCount" FROM users u LEFT JOIN links l ON u.id = l."userId" GROUP BY u.id, u.name ORDER BY "visitCount" LIMIT 10');
  }