const express = require("express");
const pool = require("./db");

const app = express();

app.get("/", async(req,res)=>{
    try{
        const result = await pool.query(
            "SELECT NOW()"
        );

        res.json(result.rows);

    }catch(error){
        console.log(error);
        res.status(500).send(error.message);
    }
});


app.listen(3000,()=>{
    console.log("Server running on port 3000");
});