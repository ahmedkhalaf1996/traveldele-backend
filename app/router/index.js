// routes/index.js
const express = require("express");
const router = express.Router();

const amadeusRoutes = require("./routes/amadeus_routes");

router.get("/", function(req, res, next) {
  res.send({ message: "app works , you are in api endpoint now" });
});

router.use("/v1", [amadeusRoutes]);

module.exports = router;