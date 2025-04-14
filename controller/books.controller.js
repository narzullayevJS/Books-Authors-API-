const client = require("../config/db");

const getAllBooks = async (req, res) => {
  try {
    const data = await client.query(`
      SELECT books.id, books.title, books.published_year,
      authors.name AS author_name, authors.bio
      FROM books
      JOIN authors ON books.author_id = authors.id
    `);
    res.json(data.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

const postBooks = async (req,res) => {
    try {
        let {title,author_id, published_year } = req.body;
        const data = await client.query('INSERT INTO books(title, author_id, published_year) VALUES ($1,$2,$3) RETURNING *',[title,author_id,published_year])
        res.status(201).json({ message: "created!", data: data.rows[0] });
    } catch (error) {
        res.status(404).json({ message: "Failed!"},error.message)
        console.log(error);
        
    }
}

const getBooksById = async (req,res)=>{
    try {
        let data = await client.query("SELECT * from books WHERE id = $1",[req.params.id])
        if( data.rows.length === 0 ){
            res.status(404).json({ message: "Not found!"});
        }
        res.status(200).json(data.rows[0]);
    } catch (error) {
        res.status(404).json("Failed", error.message)
    }
}

const updateBooksId = async (req,res)=>{
    try {
    let {title, published_year } = req.body;
    let {id} = req.params;
    const data = await client.query('UPDATE books SET title = $1, published_year = $2 WHERE id = $3 RETURNING *', 
    [title,published_year,id])
        res.status(201).json("Created books",);
    } catch (error) {
        res.status(404).json("Failed", error.message)
    }
}

const DeleteBooksId = async (req,res)=>{
    try {
         let {id} = req.params;
         const data = await client.query('DELETE FROM books WHERE id = $1', [id])
         res.status(200).json("Deleted books");
    } catch (error) {
         res.status(404).json("Failed", error.message)
    }
}

module.exports = { getAllBooks,postBooks,getBooksById, updateBooksId,DeleteBooksId };
