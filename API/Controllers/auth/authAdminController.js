import bcrypt from "bcrypt";
import pool from "../../db/db_handle.js";
import { generateAccessToken, generateRefreshToken } from "../../Utils/generateToken.js";
import { cookieConfig } from "../../Utils/handleCookies.js";

export const adminLogin = async (req, res) => {
  const { email, password } = req.body;
  // console.log(email);
  // console.log(password);

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const sql = "SELECT * FROM admin WHERE email = ?";
    const [rows] = await pool.promise().query(sql, [email]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Email not found" });
    }

    const admin = rows[0];

    const isPasswordValid = await bcrypt.compare(password, admin.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Generate tokens
    const adminPayload = { name: admin.adminname, role: 1 };
    const accessToken = generateAccessToken(adminPayload);
    const refreshToken = generateRefreshToken(adminPayload);

    res.cookie('access-token', accessToken, cookieConfig);
    res.cookie('refresh-token', refreshToken, cookieConfig);


    return res.status(200).json({
      token: accessToken,
      message: "Logged in successfully",
    });
  } catch (error) {
    console.error("Error during admin login:", error.message);
    return res.status(500).json({ message: "An internal server error occurred" });
  }
};


export const adminRegister = async (req, res) => {
  const { username, email, password } = req.body;

  console.log(req.body);

  // Validate that all fields are provided
  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields must be filled" });
  }

  try {
    // Hash the password for secure storage
    const hashedPassword = await bcrypt.hash(password, 10);
    const values = [username, email, hashedPassword];
    const queryInsert =
      "INSERT INTO admin (adminname,email,password) VALUES (?, ?, ?)";

    // Insert user into the database
    pool.query(queryInsert, values, (error, result) => {
      if (error) {
        console.error("Database insert error:", error); // Log for debugging
        return res
          .status(500)
          .json({ message: "Something went wrong while inserting the user" });
      }

      // Generate tokens using input data (if ID isn't required immediately)
      const payload = { username: username, role: 1 };
      const accessToken = generateAccessToken(payload);
      const refreshToken = generateRefreshToken(payload);

      // Set tokens in session
      res.cookie('admin-access-token', accessToken, cookieConfig);
      res.cookie('admin-refresh-token', refreshToken, cookieConfig);

      return res.json({ message: "User registered successfully", token: accessToken });
    });
  } catch (error) {
    console.error("Error:", error.message); // Log for debugging
    return res.status(500).json({ message: "Internal server error" });
  }
}