const express = require('express'); const path = require("path");
const PORT = process.env.PORT || 5000;
const main = require("../routes/main.js");
express()
    .use(express.static(path.join(__dirname, "public/HTML"))) 
    .use("/main", main)
    .listen(PORT, () => console.log(`Listening on ${PORT}`));