// EXAMPLE OF MOVING ROUTES TO A SEPARATE FILE
const express = require("express");
const router = express.Router()


router.get("/books", (req, res) => {
    Book.find()
      .then()
      .catch((err) => {
        next("Somethinig went wrong");
        // Express please call error handling middleware
      })

})

router.post("/books", (req, res) => {/* ... */})

router.put("/books", (req, res) => {/* ... */})

router.delete("/books", (req, res) => {/* ... */})


module.exports = router;