const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require("path");
const dotenv = require("dotenv");
const hbs = require("handlebars");

const app = express();
dotenv.config({ path: "./.env" });

const publicDirectory = path.join(__dirname, "/public");
app.use(express.static(publicDirectory));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(cookieParser());

require("./dbconnect/dbconnect");
require("./routes/routes")(app);
app.use("/auth", require("./routes/auth"));
// app.use("/login", require("./routes/login"));

app.set("view engine", "hbs");

const startServer = () => {
  app.listen(4000, () => {
    console.log(`SERVER started`);
  });
};

startServer();
