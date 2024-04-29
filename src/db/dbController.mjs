import pool from "./mysql.config.mjs";

export const createTable = async (name, columns) => {
  const query = `CREATE TABLE IF NOT EXISTS ${name} (${columns});`;
  pool.query(query, (err, result) => {
    if (err) throw err;
    console.log(`Table ${name} created successfully`);
  });
};
