const express = require("express")
const BooksController = require("../controller/books.controller")
const router = express.Router()

router
.get("/books", BooksController.getAllBooks)
.post("/books", BooksController.postBooks)
.get("/books/:id",BooksController.getBooksById)
.put("/books/:id",BooksController.updateBooksId)
.delete("/books/:id",BooksController.DeleteBooksId)

module.exports = router