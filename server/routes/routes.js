module.exports = (app) => {
  app.get("/", (req, res) => {
    // res.send("<h1>Home Page</h1>");
    res.render("index");
  });

  app.get("/register", (req, res) => {
    res.render("register");
  });


};
