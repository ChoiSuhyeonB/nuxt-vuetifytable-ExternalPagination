const express = require("express");
const router = express.Router();

router.use(express.json());

router.post("/", function(req, res) {
  email = req.body.data_email;
  console.log("req.body.data_email: " + email);
});

module.exports = router;
