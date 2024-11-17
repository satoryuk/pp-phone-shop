import bcrypt from "bcrypt";
import pool from "../db/db_handle.js";
import { generateAccessToken, generateRefreshToken } from "../Utils/generateToken.js";

export const adminLogin=async(req,res)=>{
    const {email,password}=req.body;

    if(!email||!password){
        return res.status(401).json({
            message:"All field must not be empty"
        });
    }
    try {
        const sql="SELECT * FROM admin WHERE email=?"
        
        pool.query(sql,[email],async(error,rows)=>{
            if(error){
                return res.status(400).json({message:`${password} and ${email}`})
            }
            if(rows.length===0){
                return res.status(400).json({message:"email not found"})
            }
            const admin=rows[0];

            const isPasswordValid=await bcrypt.compare(password,admin.password);

            if(!isPasswordValid){
                return res.status(400).json({
                    message:"Password invalid"
                })
            }
            const adminPayload={name:admin.adminname,role:1}

            const accessToken=generateAccessToken(adminPayload);
            const refreshToken=generateRefreshToken(adminPayload);

            req.session.refreshToken=refreshToken;
            req.session.accessToken=accessToken;

            console.log(req.session.refreshToken);
            

            res.json({
                accessToken,
                refreshToken,
                message:"Logged in successfully"
            });
        });
    } catch (error) {
        console.log("Error",error.message);
        return res.status(500).json({message:"something went wrong"})
        
    }
}