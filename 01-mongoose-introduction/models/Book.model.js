// Model - is used to setup a collection on MongoDB
// Model: schema and a model export

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// CREATE SCHEMA
const bookSchema = new Schema({
    title: String,
    year: Number,
    codeISBN: { type: String, maxlength: 13, minlength: 5, unique: true  },
    quantity: { type: Number, min: 0, default: 0 },
    lastPublished: { type: Date, default: Date.now },
    genre: { type: String, enum: ["romance", "fiction", "biography", "poetry"] },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Author"  // "Author" is the model/collection where referenced documents are stored
    } 
})

// CREATE MODEL
// The model creates a collection "Book" -> "books"
const Book = mongoose.model("Book", bookSchema);

// EXPORT THE MODEL
module.exports = Book;