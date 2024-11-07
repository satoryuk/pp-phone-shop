import { config } from "dotenv";
import express from "express";
import pool from "./db/db_handle.js";

config()

const app=express();
const port =process.env.port;

pool.getConnection((error, connection) => {
    if (error) {
        console.error("Failed to connect to the database:", error);
        return;
    }
    connection.release();
    console.log("Successfully connected to the database.");
});
app.get('/',(req,res)=>{
    const Query='SELECT * FROM user';

    pool.query(Query,(error,result)=>{
        if(error)return res.status(400).json({
            message:"Something went wrong"
        })
        res.status(200).json({
            message:"Successfully",
            data:result
        })
    })
})

app.listen(port,()=>{
    console.log(`http://localhost:${port}`);
})