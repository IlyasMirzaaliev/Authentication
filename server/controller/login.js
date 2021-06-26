const mysql = require("../dbconnect/mysql");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  try {
    const { login, password } = req.body;

    if (!login || !password) {
      return res.status(400).render("login", {
        message: "Please provide en email and password ",
      });
    }
    mysql.query(
      "SELECT * FROM auth_users WHERE login = ?",
      [login],
      async (error, results) => {
        console.log(results);
        const compare = await bcrypt.compare(password, results[0].password);
        if (!results || !compare) {
          res.status(401).render("login", {
            message: "Login or Password incorrect",
          });
        } else id = results[0].id; //id form DB

        const token = jwt.sign({ id: id }, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPIRES_IN,
        });
        console.log(token);

        const cookieOpt = {
          expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
          ),
          httpOnly: true,
        };

        res.cookie("jwt", token, cookieOpt);
        res.status(200).redirect("/");
      }
    );
  } catch (error) {
    console.log("eeeeeeeeeeeeeee");
  }
};
