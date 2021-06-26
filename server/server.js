const express = require("express");
const mysql = require("./dbconnect/mysql");
const path = require("path");
const app = express();
const hbs = require("hbs");
const cookieParser = require("cookie-parser");
require("dotenv").config({ path: "./.env" });
const PORT = process.env.SERVER_PORT;

app.use(express.static(path.join(__dirname, "./public")));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.set("view engine", "hbs");

app.use("/", require("./pages/pages"));
app.use("/auth", require("./routes/auth"));

const startServer = () => {
  try {
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT} \nWaiting for DB...`);
    });
    mysql.connect((err) => {
      if (err) {
        console.error("Pls check auth credentials ====> ", err);
        return;
      } else {
        console.log("DB connected");
      }
    });
  } catch (error) {
    console.error(error);
    return;
  }
};

startServer();
