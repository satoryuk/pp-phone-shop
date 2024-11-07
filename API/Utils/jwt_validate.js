import jwt from 'jsonwebtoken';
import { config } from 'dotenv';

config();

export const validateToken=(req,res,next)=>{
    const authHeader=req.headers['authorization'] ||req.headers['Authorization'];

    if(!authHeader){
        return res.status(401).json({
            message:"Unauthorization"
        })
    }
    const token=authHeader.split(" ")[1];

    if(!token){
        return res.status(401).json({message:"Token is null"});
    }
    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
}