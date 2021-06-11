const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const hbs = require("handlebars");
const app = express();
dotenv.config({ path: "./.env" });

require("./dbconnect/dbconnect");
require("./routes/routes")(app);

const publicDirectory = path.join(__dirname, "/public");
app.use(express.static(publicDirectory));

app.set("view engine", "hbs");

const startServer = () => {
  app.listen(4000, () => {
    console.log(`SERVER started`);
  });
};

startServer();
