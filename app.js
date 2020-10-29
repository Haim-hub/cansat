const express = require('express'); const path = require("path");
const PORT = process.env.PORT || 5000;
const main = require("../routes/main.js");
express()
    .use(express.static(path.join(__dirname, "public"))) 
    .use(express.static(path.join(__dirname, "public/HTML"))) 
    .listen(PORT, () => console.log(`Listening on ${PORT}`));