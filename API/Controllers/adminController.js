import pool from "../db/db_handle.js";
import bcrypt from "bcrypt";
export const addNewBrand=(req,res)=>{
    const {brand}=req.body;

    const query=`INSERT INTO brands(name) VALUE(?)`;

    pool.query(query,brand,(err,result)=>{
        if(err)return res.status(400).json({message:"something went wrong"})
        return res.status(200).json({message:"Insert Successfully",data:result})
    })
}
export const addNewCategory=(req,res)=>{
    const{category}=req.body;

    const query=`INSERT INTO categories (name) VALUE(?)`;

    pool.query(query,category,(req,res)=>{
        if(err)return res.status.json({message:"something went wrong"});

        return res.status.json({message:"Insert Successfully"})
    })
}

export const addNewAdmin=async(req,res)=>{
    const password=await bcrypt.hash(password,10);
    console.log(password);
}
