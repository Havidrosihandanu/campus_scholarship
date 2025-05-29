// const mysql = require('mysql2');

// const db = mysql.createConnection({
//     host : 'localhost',
//     user : 'root',
//     password : '',
//     database : 'campus_scholarship'

// });

// db.connect((err) => {
//     if (err) throw err;
//     console.log("db success connected")
// })
// module.exports = db;

const pool = new Pool({
  connectionString: `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
  ssl: { rejectUnauthorized: false },
  max: 15, // Sesuai dengan Pool Size Supabase Nano
  idleTimeoutMillis: 10000,
  connectionTimeoutMillis: 5000
});