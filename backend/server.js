const express = require("express");
const pool = require("./db");

const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

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

app.get("/api/students/:groupId/:section", async(req,res)=>{
    try{
        const { groupId, section } = req.params;
        const [grade, subject] = groupId.split("-");

        const result = await pool.query(
            `
            SELECT *
            FROM students
            WHERE grade = $1
            AND LOWER(subject) = $2
            AND section = $3
            `,
            [
              grade,
              subject.toLowerCase(),
              section
            ]
        );

        res.json(result.rows);

    }catch(error){

        console.log(error);
        res.status(500).json({
            error: error.message
        });

    }
});

app.listen(3000,()=>{
    console.log("Server running on port 3000");
});