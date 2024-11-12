import pool from "../db/db_handle.js";
import bcrypt from "bcrypt";  // Make sure bcrypt is imported
import { generateAccessToken, generateRefreshToken } from "../Utils/generateToken.js";

export const handlelogin = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(401).json({
            message: "All fields must not be empty"
        });
    }

    try {
        const sql = `SELECT * FROM customers WHERE email=?`;

        // Wrap pool.query in a promise to handle async/await more easily
        pool.query(sql, [email], async (error, rows) => {
            if (error) {
                return res.status(500).json({ message: "Data query error" });
            }

            if (rows.length === 0) {
                return res.status(404).json({ message: "Email not found" });
            }

            const user = rows[0];
            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (!isPasswordValid) {
                return res.status(401).json({ message: "Incorrect password" });
            }

            const userPayLoad = {userName: user.username, role: 2 };
            const accessToken = generateAccessToken(userPayLoad);
            const refreshToken = generateRefreshToken(userPayLoad);

            // Set tokens in session
            req.session.refreshToken = refreshToken;
            
            req.session.accessToken = accessToken; // Corrected this line

            // You can also send both tokens in the response if needed
            res.json({
                accessToken, 
                message: "Logged in successfully"
            });
        });
    } catch (error) {
        console.error("Error:", error.message);
        return res.status(500).json({ message: "Internal server error" });
    }
};




export const register = async (req, res) => {
    const { username,email,password,phone,address } = req.body;

    // Validate that all fields are provided
    if (!username || !email || !password ||!phone||!address ) {
        return res.status(400).json({ message: "All fields must be filled" });
    }

    try {
        // Hash the password for secure storage
        const hashedPassword = await bcrypt.hash(password, 10);
        const values = [username,email,hashedPassword,phone,address];
        const queryInsert = "INSERT INTO customers (username,email,password,phone,address) VALUES (?, ?, ?, ?,?)";

        // Insert user into the database
        pool.query(queryInsert, values, (error, result) => {
            if (error) {
                console.error("Database insert error:", error); // Log for debugging
                return res.status(500).json({ message: "Something went wrong while inserting the user" });
            }

            // Generate tokens using input data (if ID isn't required immediately)
            const payload = {username:username,role:2};
            const accessToken = generateAccessToken(payload);
            const refreshToken = generateRefreshToken(payload);

            // Set tokens in session
            req.session.accessToken = accessToken;
            req.session.refreshToken = refreshToken;

            return res.json({ message: "User registered successfully", accessToken });
        });
    } catch (error) {
        console.error("Error:", error.message); // Log for debugging
        return res.status(500).json({ message: "Internal server error" });
    }
};



export const logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ message: "Failed to log out" });
        }
        res.json({ message: "Logged out successfully" });
    });
};
