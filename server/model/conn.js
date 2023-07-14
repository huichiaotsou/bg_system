const { Pool } = require("pg");
require("dotenv");

const { config } = require("../../config/config");

// Create a pool instance using your database connection details
const pool = new Pool({
  user: config.database.username,
  host: config.database.host,
  database: config.database.name,
  password: config.database.password,
  port: config.database.port,
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
  }
};

module.exports = {
  executeQuery,
};
