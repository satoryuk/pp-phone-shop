import { config } from "dotenv";
import express from "express";
import pool from "./db/db_handle.js";
import session from "express-session";
import cookieParser from "cookie-parser";
import AuthRoute from "./Routs/Auth.js";  // Fixed typo to match naming conventions
import { validateToken } from "./Utils/jwt_validation.js";
import cors from 'cors';
import jwt from'jsonwebtoken';


config();

const app = express();
const port = process.env.PORT || 3000;  // Capitalized PORT and added a default

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:3000',  // Frontend URL
    credentials: true, // Allow sending cookies
}));

// Establish database connection
pool.getConnection((error, connection) => {
    if (error) {
        console.error("Failed to connect to the database:", error);
        return;
    }
    connection.release();
    console.log("Successfully connected to the database.");
});

// Session configuration
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production',  // Use secure cookies in production
        httpOnly: true,  // Ensure the cookie is not accessible by JavaScript
        maxAge: 24 * 60 * 60 * 1000,  // Set cookie expiration
    },
}));


app.use('/auth', AuthRoute);

// Example protected route with token validation

app.get('/',validateToken, (req, res) => {
    // const query = 'SELECT * FROM user';

    // pool.query(query, (error, result) => {
    //     if (error) return res.status(400).json({
    //         message: "Something went wrong"
    //     });
    //     res.status(200).json({
    //         message: "Successfully retrieved data",
    //         data: result
    //     });
    // });
    const time1=jwt.decode(req.session.accessToken);
    const time2=jwt.decode(req.session.refreshToken);
    console.log(req.session.accessToken);
    console.log(time2.exp);
    const currentTime = Math.floor(Date.now() / 1000);
    if (time2 < currentTime) {
        console.log('Token has expired');
      } else {
        console.log('Token is still valid');
      } 
    
    
});

// Route for authentication


// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
