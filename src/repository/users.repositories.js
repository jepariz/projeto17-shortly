import { connection } from "../database/db.js";

export function uniqueEmailValidation(email){
  return connection.query("SELECT * FROM users WHERE email=$1", [email] );
}

export function insertUser(name, email, hashPassword){
    return connection.query(
        `INSERT INTO users (name, email, password) 
        VALUES ($1, $2, $3);`,
        [name, email, hashPassword]
      );
}

export function findUser(email, password){
  return connection.query(
    "SELECT * FROM users WHERE email=$1 AND password=$2", [email, password] 
    );
}

export function userExistsValidation(userId){
  return connection.query(
    'SELECT * FROM users WHERE id=$1', [userId] 
    );
}



export function getLinks(userId){
  return connection.query(
    'SELECT u.id AS id, u.name AS name, l.id AS "linkId", l."shortUrl", l.url, l."visitCount" FROM links l JOIN users u ON l."userId" = u.id WHERE l."userId"=$1 GROUP BY u.id, u.name, l.id', [userId] 
    );
}

export function getTotalVisitedSum(userId){
  return connection.query('SELECT SUM(l."visitCount") AS "visitCount" FROM links l JOIN users u ON l."userId" = u.id WHERE l."userId"=$1', [userId]
  )
}