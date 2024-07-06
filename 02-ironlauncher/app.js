require("dotenv").config();

require("./db");  // Same as: require("./db/index.js")

const express = require("express");
const app = express();

require("./config")(app);  // Same as: require("./config/index.js")

const booksRoutes = require("./routes/books.routes")
app.use(booksRoutes);


// 👇 Start handling routes here
const indexRoutes = require("./routes/index.routes");
app.use("/api", indexRoutes);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);  // Same as: require("./error-handling/index.js")

module.exports = app;
