import { config } from "dotenv";
import express from "express";
import pool from "./db/db_handle.js";
import session from "express-session";
import cookieParser from "cookie-parser";
import { validateToken } from "./Utils/jwt_validation.js";
import cors from 'cors';
import adminRouter from "./Routs/AdminHandle.js";
import AuthRouter from "./Routs/Auth.js";


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


app.use('/auth', AuthRouter);
app.use('/admin',adminRouter)

app.get('/',validateToken,(req,res)=>{
    console.log(req.session.accessToken);
    
})
// Example protected route with token validation

// Route for authentication

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
