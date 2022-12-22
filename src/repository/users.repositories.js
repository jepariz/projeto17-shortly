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

