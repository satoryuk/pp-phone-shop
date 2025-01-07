import { config } from "dotenv";
import express from "express";
import pool from "./db/db_handle.js";
import session from "express-session";
import cookieParser from "cookie-parser";
import { validateToken_refresh_token } from "./Utils/jwt_validation_refresh_token.js";
import cors from "cors";
import adminRouter from "./Routs/AdminHandle.js";
import AuthRouter from "./Routs/Auth.js";
import commonRouter from "./Routs/Common.js";
import userRouter from "./Routs/User.js";

config();

const app = express();
const port = process.env.PORT || 3000; // Capitalized PORT and added a default

app.use(express.json());
app.use(cookieParser());
app.use(express.static("uploads"));
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
  })
);

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
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production", // Secure in production
      httpOnly: true, // Prevent JavaScript access
      sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax", // Adjust sameSite based on environment
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    },
  })
);

app.use("/auth", AuthRouter);
app.use("/admin", adminRouter);
app.use("/common", commonRouter);
<<<<<<< HEAD
app.use("/user", userRouter)
app.get('/', (req, res) => {


})
=======
app.use("/user", userRouter);
>>>>>>> e41e980b81899edcbb60b237aabe607e221138f8
// app.use("/user",userRouter);
// Example protected route with token validation

// Route for authentication

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
