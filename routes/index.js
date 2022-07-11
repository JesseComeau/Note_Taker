const notes = require(`./notes`);
const express = require('express');

const { route } = require("./tips");
const router = express.Router();

route.use("/tips", tips);

module.exports = router;