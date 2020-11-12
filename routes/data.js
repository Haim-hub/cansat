const express = require("express"); const router = express.Router(); const { Pool } = require("pg");
const pool = new Pool({
connectionString: process.env.DATABASE_URL, ssl: {
        rejectUnauthorized: false,
    },
});

// Route /getdata
router.get("/getdata", async (req, res) => { try {
    // Wait for DB connection
const client = await pool.connect(); // Run query

const result = await client.query("SELECT * FROM cansat");

    // Respond with DB results as json
if (result) res.json({dbdata: result.rows}); 
else res.json({dbdata: null});
    // Release connection
client.release();
} catch (err) {

// Report errors console.error(err); res.send("Error " + err);
} });


router.get("/add", async (req, res) => { try {

    // Wait for DB connection
    const client = await pool.connect(); // Run query

    let temp = req.query.temp;
    let pressure = req.query.pressure;
    let log = Math.log(pressure/101325.0);
    let tep = (parseInt(temp)+273.15);
    let top = (log*8.31*tep);
    let bot = 284.430408;
    let alt = top/bot * 1000;
    const SQL_query = {
        text: "INSERT INTO cansat (num,temp,pressure,alt) VALUES ($1, $2, $3, $4)", 
        values: [1, temp, pressure, -alt]
    };

    await client.query(SQL_query);

    client.release();
    res.send('ok');
    // Release connection
    
    

    }catch (err) {  

// Report errors console.error(err); res.send("Error " + err);
} });


//Go to this route when starting a new måling from the arduino
router.get("/new", async (req, res) => { try {

    // Wait for DB connection
const client = await pool.connect(); // Run query

const secclient = await pool.connect(); // second query

const result = await secclient.query("SELECT * FROM cansat");

const SQL_query = {
    text: "INSERT INTO cansat (temp,pressure,alt) VALUES ($1, $2, $3)", 
    values: [temp, pressure, -alt]
};

await client.query(SQL_query);

client.release();
secclient.release();
res.send('ok');
// Release connection



}catch (err) {  

// Report errors console.error(err); res.send("Error " + err);
} });


module.exports = router;