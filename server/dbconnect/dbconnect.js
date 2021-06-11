const mysql = require("mysql");
const dotenv = require("dotenv");

const sql = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
});

sql.connect((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log(`SQL CONNECTED`);
  }
});
module.exports = sql;