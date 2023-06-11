const express = require("express");

var router = express.Router();

router.use("/test",require("./routers/test"));


module.exports = router;