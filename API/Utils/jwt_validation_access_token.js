import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
config();

export const validation_accesstoken = (req, res, next) => {
    const authHeader = req.header['authorization'] || req.header['Authorization'];

    if (!authHeader) {
        return res.status(400).json({ message: "Unauthorized" })
    }

    const token = authHeader.split('')[1];

    if (!token) {
        return res.status(400).json({ message: "Token is null" })
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.status(400).json({ message: "Token invalid" })
        }
        req.user = user.username.username
        next()
    })
}