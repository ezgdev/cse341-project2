const router = require("express").Router();

router.use("/", require("./swagger"));

router.get("/", (req, res) => {
  //#swagger.tags = ['Home']
  res.send("To-Do List API");
});

router.use("/users", require("./users"));
router.use("/tasks", require("./tasks"));

module.exports = router;
