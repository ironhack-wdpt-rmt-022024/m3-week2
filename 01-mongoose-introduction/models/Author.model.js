const mongoose = require("mongoose");
const Schema = mongoose.Schema;


// CREATE SCHEMA
const authorSchema = new Schema({
    firstName: String,
    lastName: String,
    bio: String
})

// CREATE A MODEL
//                            "Author" --> authors
const Author = mongoose.model("Author", authorSchema)


// EXPORT THE MODEL
module.exports = Author;