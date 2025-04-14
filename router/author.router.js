const express = require("express")
const authorController = require("../controller/author.controller")
const router = express.Router()

router
.get("/authors/:id/books",authorController)

module.exports = router