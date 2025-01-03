import pool from "../../db/db_handle.js";

export const getUserInformation = async (req, res) => {
    try {
        const { username } = req.query;

        if (!username) {
            return res.status(400).json({
                message: "Missing required parameter: username",
            });
        }

        const query = `SELECT * FROM customers WHERE username = ?`;

        console.log("Username:", username);

        const [rows] = await pool.promise().query(query, [username]);

        return res.status(200).json({
            data: rows,
            message: "Successfully retrieved user information",
        });
    } catch (err) {
        console.error("Error fetching user information:", err);
        return res.status(500).json({
            error: err.message,
            message: "Something went wrong",
        });
    }
};
