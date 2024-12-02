import pool from "../../db/db_handle.js"

export const OrderTable = (req, res) => {
    const query = `SELECT * 
                FROM orders o
                INNER JOIN order_items oi ON oi.order_id = o.order_id 
                INNER JOIN customers c ON c.customer_id = o.customer_id
                INNER JOIN phones p ON p.phone_id = oi.phone_id 
                INNER JOIN phone_colors pc ON pc.id = oi.color
                INNER JOIN productimage pi ON pi.phone_id = p.phone_id;
                `
    pool.query(query, (err, rows) => {
        if (err) return res.status(400).json({ message: "Something went wrong" })
        return res.status(200).json({
            data: rows,
            message: "succesfully"
        })
    })
}