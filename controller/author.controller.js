const client = require("../config/db")

const getBooksByAuthorsId = async (req,res)=>{
    const {id} = req.params
    try {
        const booksByAuthors = await client.query(`
       SELECT books.id, books.title, books.published_year
       FROM books
       JOIN authors ON books.author_id = authors.id
       WHERE authors.id = $1`,[id])

       if (booksByAuthors.rows.length === 0) {
        return res.status(404).json({ message: "This author has no books or author not found" });
      }

 res.status(201).json({books: booksByAuthors.rows })
    } catch (error) {
      res.status(404).json({message: error.message})  
    }
}

module.exports = getBooksByAuthorsId