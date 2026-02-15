const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'base',
  password: '1223',
  port: 5432,
});

module.exports = pool;
