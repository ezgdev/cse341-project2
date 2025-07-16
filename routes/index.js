const router = require("express").Router();

// router.use('/', require('./swagger'));

router.get("/", (req, res) => {
  //#swagger.tags = ['Home']
  res.send("Project2");
});

// router.use('/contacts', require('./contacts'));

module.exports = router;
