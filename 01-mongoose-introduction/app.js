const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");

// Import the Book model
const Book = require("./models/Book.model")

const app = express();

// CONNECT TO DATABASE
mongoose.connect("mongodb://127.0.0.1:27017/mongoose-intro-dev")
  .then((x) => console.log("Connect to the database", x.connections[0].name))
  .catch((err) => console.error("Error connecting to MongoDB", err));


// MIDDLEWARE
app.use(morgan("tiny"));
app.use( express.static('public'));
app.use( express.json());


// POST   /books - Create a new book in the database
app.post("/books", (req, res) => {
    Book.create(req.body)           // Create a new book in the database collection
      .then((createdBook) => {
        console.log("createdBook", createdBook);
        res.json(createdBook);    // Send a response with the created book 
      })
      .catch((err) => {
        // In case of an error, print it to the console and send a response with an error
        console.error("Failed to create a book", err);
        res.status(500).json({ err: err })
      })
})


// GET   /books - Get all the books from the database
app.get("/books", (req, res) => {
    Book.find()            // Get all the books from the database collection
      .then((allBooks) => {
        console.log("allBooks", allBooks);
        res.json(allBooks);    // Send a response with all the books
      })
      .catch((err) => {
        // In case of an error, print it to the console and send a response with an error
        console.error("Failed to get all books", err);
        res.status(500).json({ err: err })
      })
})


// GET   /books/:id - Get a specific book by its id from the database
app.get("/books/:id", (req, res) => {
    const bookId = req.params.id;    // Get the book id from the request parameters

    Book.findById(bookId)    // Get a specific book by its id from the database collection  
      .then((oneBook) => {
        console.log("oneBook", oneBook);
        res.json(oneBook);    // Send a response with the specific book
      })
      .catch((err) => {
        console.error("Failed to get one book", err);
        res.status(500).json({ err: err })
      })
    
})


// PUT   /books/:id - Update a specific book by its id
app.put("/books/:id", (req, res) => {
  const bookId = req.params.id;     // Get the book id from the request parameters
  console.log("req.body", req.body);

  Book.findByIdAndUpdate(bookId, req.body)   // Update a specific book by its id
    .then((result) => {
        console.log("result", result);
        res.json(result);    // Send a response with the updated book
    })
    .catch((err) => {
        console.error("Failed to update one book", err);
        res.status(500).json({ err: err })
    })
})


// DELETE  /books/:id - Delete a specific book by id
app.delete("/books/:id", (req, res) => {
    const bookId = req.params.id;   // Get the book id from the request parameters

    Book.findByIdAndDelete(bookId)  // Delete a specific book by its id
      .then((result) => {
        console.log("result", result);
        res.status(204).send(); //  Only send a status code 204 to indicate that the book was deleted
      })
      .catch((err) => {
        console.error("Failed to delete one book", err);
        res.status(500).json({ err: err })
    })
})



app.listen(3000, () => console.log("Server listening on port 3000"));







