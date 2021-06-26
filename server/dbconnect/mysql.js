require("dotenv").config();

const mysql = require("mysql").createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWD,
  database: "HR",
});

module.exports = mysql;
