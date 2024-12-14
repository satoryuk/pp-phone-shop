import { query } from "express"
import pool from "../../db/db_handle.js"

export const OrderTable = (req, res) => {
    const query = `SELECT 
    o.*,
    c.username AS customer_name,
    c.email AS customer_email,
    GROUP_CONCAT(DISTINCT pi.image SEPARATOR ', ') AS images,
    p.name AS phone_name,
    c.address AS Address,
    p.price AS phone_price,
    p.color AS phone_color,
    
    oi.quantity AS order_quantity,
    oi.price AS order_price
FROM 
    orders o
INNER JOIN 
    order_items oi ON oi.order_id = o.order_id 
INNER JOIN 
    customers c ON c.customer_id = o.customer_id
INNER JOIN 
    phones p ON p.phone_id = oi.phone_id 
LEFT JOIN 
    productimage pi ON pi.phone_id = p.phone_id
GROUP BY 
    o.order_id, 
    c.customer_id, 
    p.phone_id, 
    oi.quantity, 
    oi.price,
    c.address;

                `
    pool.query(query, (err, rows) => {
        if (err) return res.status(400).json({ message: "Something went wrong" })
        return res.status(200).json({
            data: rows,
            message: "succesfully"
        })
    })
}
export const updateOrder = (req, res) => {
    // The SQL query to update the order
    const query = `
        UPDATE 
            order_items ot
        INNER JOIN 
            orders o ON o.order_id = ot.order_id
        SET 
            ot.phone_id = (SELECT p.phone_id FROM phones p WHERE p.name = ? LIMIT 1),
            ot.quantity = ?,
            ot.price = (SELECT p.price FROM phones p WHERE p.name = ? LIMIT 1) * ?,
        WHERE 
            o.order_id = ?
            AND ot.order_item_id = ?
    `;

    // Accessing parameters from the request
    const { order_id } = req.params;
    const { order_items_id } = req.query; // Query parameter
    const { phone_name, quantity, color } = req.body; // Request body

    // Validate the parameters
    if (!phone_name || !quantity || !color || !order_id || !order_items_id) {
        return res.status(400).json({ message: "All fields are required" });
    }

    // Prepare the values for the SQL query
    const values = [
        phone_name,
        quantity,
        phone_name,
        quantity,
        color,
        order_id,
        order_items_id
    ];

    console.log("Values for query:", values);

    // Execute the query with the prepared values using .then() and .catch()
    pool.promise().query(query, values)
        .then(([newUpdate]) => {
            // If the query is successful, send the response
            res.status(200).json({
                message: "Order updated successfully",
                data: newUpdate
            });
        })
        .catch((error) => {
            // If there is an error, send an error message
            console.error(error);
            res.status(500).json({ message: "Something went wrong", error: error.message });
        });
};

export const deleteOrder = (req, res) => {
    const { DeleteOrderID } = req.params;
    const queryDelete = `
                        DELETE o.*,oi.* FROM orders o 
                        INNER JOIN order_items oi ON
                        oi.order_id=o.order_id
                        WHERE o.order_id=?
    `
    try {
        pool.promise().query(queryDelete, [DeleteOrderID]).then(([rows]) => {
            res.status(200).json({
                message: "successfully",
                data: rows
            })
        }).catch((error) => {
            console.log(error);
            res.status(400).json({
                message: "something went wrong"
            })

        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            message: "something went wrong"
        })

    }
}
export const headerOrder = (req, res) => {
    const query = `
        SELECT status,COUNT(status)AS count FROM orders
        group by status
    `
    try {
        pool.promise().query(query).then((rows) => {
            res.status(200).json({
                message: "successfully",
                data: rows[0]
            })
        }).catch((error) => {
            res.status(400).json({
                message: "something went wrong",
            })
        })
    } catch (error) {
        console.log(error);
        res.status.json({
            message: "something went wrong"
        })
    }
}