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
      message: "Logged in successfully",
    });
  } catch (error) {
    console.error("Error during admin login:", error.message);
    return res.status(500).json({ message: "An internal server error occurred" });
  }
};
