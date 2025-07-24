const router = require("express").Router();
const passport = require("passport");

router.use("/", require("./swagger"));

router.get("/", (req, res) => {
  //#swagger.tags = ['Home']
  res.send("To-Do List API");
});

router.get("/login", passport.authenticate("github"), (req, res) => {});

router.get("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

router.use("/users", require("./users"));
router.use("/tasks", require("./tasks"));

module.exports = router;
