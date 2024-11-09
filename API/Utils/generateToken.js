    import jwt from 'jsonwebtoken';
    import { config } from 'dotenv';

    config();

export const generateAccessToken=(username,role)=>{
        return jwt.sign(
            {
                user:{
                    username,
                    role
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn:process.env.jwt_access_expired
            }
        );
    };
export const generateRefreshToken=(username,role)=>{
    return jwt.sign(
        {
            user:{
                username,
                role
            }
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.jwt_refresh_expired
        }
    );
};