const { Pool } = require("pg");
require("dotenv");

const { PG_USER, PG_HOST, PG_DB, PG_PWD } = process.env;

// Create a pool instance using your database connection details
const pool = new Pool({
  user: PG_USER,
  host: PG_HOST,
  database: PG_DB,
  password: PG_PWD,
  port: 5432,
});

const executeQuery = async (query, values = []) => {
  let client;

  try {
    client = await pool.connect();
    const result = await client.query(query, values);
    return result.rows;
  } catch (err) {
    throw err;
  } finally {
    if (client) {
      client.release();
    }
    pool.end();
  }
};

module.exports = {
  executeQuery,
};
