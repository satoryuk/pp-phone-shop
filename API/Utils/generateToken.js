    import jwt from 'jsonwebtoken';
    import { config } from 'dotenv';

    config();

    const generateToken=(username,role)=>{
        return jwt.sign(
            {
                username,
                role
            },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn:process.env.jwt_expired
            }
        );
    };
    export default generateToken;