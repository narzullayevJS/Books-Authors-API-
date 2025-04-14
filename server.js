const express = require ("express")
const dotenv = require("dotenv").config()
const BooksRouter = require("./router/books.router")
const AuthorRouter = require("./router/author.router")
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");

const app = express()

const swaggerDocument = YAML.load("./swagger.yaml");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.use(express.json())
app.use('/',BooksRouter)
app.use('/',AuthorRouter)

app.listen(process.env.PORT,()=>{
    console.log('Server is running', process.env.PORT);      
})
