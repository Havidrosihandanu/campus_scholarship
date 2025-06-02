const mysql = require('mysql2');

const db = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'campus_scholarship'

});

db.connect((err) => {
    if (err) throw err;
    console.log("db success connected")
})
module.exports = db;

// const { Pool } = require('pg');

// const db = new Pool({
//     host: 'db.xclrmndtpwpnehczcnlm.supabase.co',
//     user: 'postgres',            
//     password: 'campus_scholarship123', 
//     database: 'postgres',        
//     port: 5432                    // Port untuk PostgreSQL
// });

// db.connect((err) => {
//     if (err) throw err;
//     console.log("db success connected");
// });

// module.exports = db;