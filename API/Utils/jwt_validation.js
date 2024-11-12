import jwt from 'jsonwebtoken';
import { generateAccessToken } from './generateToken.js';

export const validateToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) return res.sendStatus(401);

    try {
        // Try verifying the access token first
        const user = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = user;
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            const refreshToken = req.session.refreshToken;
            if (!refreshToken) {
                return res.status(403).json({ message: 'No refresh token available' });
            }
    
            try {
                // Verify the refresh token
                const refreshUser = await jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    
                // Generate a new access token using the refresh token's user info
                const newAccessToken = generateAccessToken({ username: refreshUser.username, role: refreshUser.role });
    
                // Store the new access token in the session
                req.session.accessToken = newAccessToken;
    
                // Send the new access token to the client (if needed)
                res.json({ accessToken: newAccessToken });
    
                // Proceed to the next middleware or route handler
                req.user = { username: refreshUser.username, role: refreshUser.role };
                next();
            } catch (err) {
                console.error('Refresh token is invalid or expired', err);
                return res.status(403).json({ message: 'Refresh token is expired or invalid' });
            }
        } else {
            return res.status(403).json({ message: 'Token verification failed' });
        }
    }
    
};
