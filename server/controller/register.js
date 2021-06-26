const mysql = require("../dbconnect/mysql");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");



exports.register = async (req, res) => {
  const { name, login, password, passwordConfirm } = req.body;

  mysql.query(
    "SELECT login FROM auth_users WHERE login = ?",
    [login],
    (error, results) => {
      if (error) {
        console.error(error);
      }

      if (results.length > 0) {
        return res.render("register", {
          message: "Login in use",
        });
      } else if (password !== passwordConfirm) {
        return res.render("register", {
          message: "Password dont match",
        });
      }
    }
  );
  let hashedPasswd = await bcrypt.hash(password, 5);
  console.log(req.body, hashedPasswd);

  mysql.query(
    "INSERT INTO auth_users SET ?",
    { login: login, fullName: name, password: hashedPasswd },
    (error, results) => {
      if (error) {
        console.log(error);
      } else {
        console.log(results);
        return res.render("register", {
          message: "User successful registered",
        });
      }
    }
  );
};
