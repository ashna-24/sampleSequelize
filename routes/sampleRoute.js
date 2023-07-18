const express = require("express");
const router = express.Router();
// const cookieParser = require("cookie-parser");
// const bodyparser = require('body-parser');
const sequelize_data = require("../controllers/sampleController");

router.get("/user-data", sequelize_data.userData);

module.exports = router;