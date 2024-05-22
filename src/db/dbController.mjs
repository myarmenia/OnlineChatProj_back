import connection from "./mysql.config.mjs";

const pool = await connection()

export const createDatabase = async () => {
  try {
    const result = await pool.query(`CREATE DATABASE chat;`);
  } catch (error) {
    console.error(error);
  }
};

export const useDatabaseChat = async () => {
  try {
    const result = await pool.query(`USE chat;`);
  } catch (error) {
    console.error(error);
  }
};

export const createTableUsers = async (name, columns) => {
  try {
    const result = await pool.query(`CREATE TABLE users(
      id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
      email VARCHAR(1000) NULL,
      user_name VARCHAR(1000) NULL
    );`);
  } catch (error) {
    console.error(error);
  }
};

export const addTableUsers = async (email, user_name) => {
  try {
    console.log("add user",user_name);
    console.log("add email",email);
    const result = await pool.query(
      `INSERT INTO users(email,user_name) VALUES("${email}","${user_name}");`
    );
  } catch (error) {
    console.error(error);
  }
};

export const getTableUsers = async () => {
  try {
    const result = await pool.query(`SELECT * FROM users;`);
    return result;
  } catch (error) {
    console.error(error);
  }
};
