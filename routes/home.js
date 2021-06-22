const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  // res.send("rest api");
  var viewdata = { test: "Hey now." };
  res.render("index", viewdata);
});

module.exports = router;
