import { query } from "express"
import pool from "../../db/db_handle.js"


export const OrderTableItemsByID = (req, res) => {
    const { order_items_id } = req.params;

    const query = `WITH DiscountedOrders AS (
    SELECT 
        o.*,
        oi.order_item_id AS order_items,
        c.username AS customer_name,
        c.email AS customer_email,
        c.address AS Address,
        c.phone AS Phone_Number,
        GROUP_CONCAT(DISTINCT pi.image SEPARATOR ', ') AS images,
        p.name AS phone_name,
        pm.discount_percentage AS Discount_Percentage,
        CASE
            WHEN pm.status = "Active" THEN ROUND(pv.price * (100 - pm.discount_percentage) / 100, 2)
            ELSE pv.price
        END AS discount_price_unit,
        CASE 
            WHEN pm.status = "Active" THEN ROUND((pv.price * (100 - pm.discount_percentage) / 100) * oi.quantity, 2)
            ELSE oi.amount
        END AS discount_amount,
        pv.color AS phone_color,
        oi.quantity AS order_quantity,
        pv.price AS order_price,
        o.total_amount AS totalAmount,
        oi.amount AS amount_order_items
    FROM 
        orders o
    INNER JOIN 
        order_items oi ON oi.order_id = o.order_id 
    INNER JOIN 
        customers c ON c.customer_id = o.customer_id
	LEFT JOIN 
		phone_variants pv ON pv.idphone_variants=oi.phone_variants_id
    INNER JOIN 
        phones p ON p.phone_id = pv.phone_id 
    LEFT JOIN 
        productimage pi ON pi.phone_id = p.phone_id
    LEFT JOIN 
        promotions pm ON pm.phone_variants_id = pv.idphone_variants
	
    WHERE 
        o.order_id = ?
    GROUP BY 
        o.order_id, 
        oi.order_item_id,
        c.username, 
        c.email, 
        c.address, 
        c.phone, 
        p.name, 
        pv.color, 
        oi.quantity, 
        pv.price, 
        oi.amount, 
        pm.discount_percentage, 
        pm.status
)
SELECT 
    order_id,
    order_items,
    customer_name,
    customer_email,
    Address,
    Phone_Number,
    phone_name,
    images,
    Discount_Percentage,
    phone_color,
    order_quantity,
    order_price,
    discount_price_unit,
    amount_order_items,
    discount_amount,
    totalAmount,
    SUM(discount_amount) OVER (PARTITION BY order_id) AS total_discount_amount -- Aggregates within the group
FROM 
    DiscountedOrders;


                `
    pool.query(query, [order_items_id], (err, rows) => {
        if (err) return res.status(400).json({ message: "Something went wrong" })
        return res.status(200).json({
            data: rows,
            message: "succesfully"
        })
    })
}
export const orderByID = (req, res) => {
    const { order_id } = req.params;


    const query = `SELECT * FROM orders o
                    INNER JOIN customers c ON
                    c.customer_id=o.customer_id
                    WHERE order_id=?`
    pool.promise().query(query, [order_id])
        .then(([rows]) => {
            return res.status(200).json({
                message: "successfully",
                data: rows
            })
        })
        .catch((error) => {
            return res.status(400).json({
                message: "something went wrong",
                error: error
            })
        })
}
export const orderTable = async (req, res) => {
    const query = `SELECT * 
                FROM orders o 
                INNER JOIN customers c ON 
                c.customer_id=o.customer_id;`
    try {
        await pool.promise().query(query).then(([data]) => {
            return res.status(200).json({
                message: "successfully",
                data: data
            })
        }).catch((err) => {
            console.log(err);

            return res.status(400).json({
                message: "something went wrong"
            })
        })

    } catch (error) {
        console.log(error);
    }
}
export const updateOrderitems = (req, res) => {
    // The SQL query to update the order
    const query = `
        UPDATE order_items ot
        SET ot.quantity=?,
            ot.phone_variants_id=(SELECT pv.idphone_variants FROM phone_variants pv
                                INNER JOIN phones p ON
                                pv.phone_id=p.phone_id
                                WHERE p.name=? AND pv.color=?
                                LIMIT 1),
            ot.amount=(SELECT price FROM phone_variants WHERE idphone_variants=ot.phone_variants_id)*ot.quantity
        WHERE order_item_id=?;
    `;

    // Accessing parameters from the request

    const { phone_name, quantity, color, order_items_id } = req.body; // Request body

    // Validate the parameters
    if (!phone_name || !quantity || !color || !order_items_id) {
        return res.status(400).json({ message: "All fields are required" });
    }

    // Prepare the values for the SQL query
    const values = [
        quantity,
        phone_name,
        color,
        order_items_id
    ];



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

    const queryDeleteOrderItems = `
        DELETE FROM order_items
        WHERE order_id = ?
    `;
    const queryDeleteOrders = `
        DELETE FROM orders
        WHERE order_id = ?
    `;

    pool.promise()
        .query(queryDeleteOrderItems, [DeleteOrderID]) // Delete from order_items first
        .then(() => {
            // Delete from orders after order_items are deleted
            return pool.promise().query(queryDeleteOrders, [DeleteOrderID]);
        })
        .then(([rows]) => {
            // Send success response
            res.status(200).json({
                message: "Successfully deleted order",
                data: rows,
            });
        })
        .catch((error) => {
            // Handle errors in either query
            console.error("Error while deleting order:", error);
            res.status(400).json({
                message: "Something went wrong",
                error: error.message,
            });
        });
};
export const deleteOrderItems = (req, res) => {
    const { orderItemsID } = req.params;
    const query = `DELETE FROM order_items 
                WHERE order_item_id=?`;
    try {
        pool.promise()
            .query(query, [orderItemsID])
            .then(([rows]) => {
                return res.status(200).json({
                    data: rows,
                    message: "successfully"
                })
            }).catch((error) => {
                return res.status(400).json({
                    message: "something went wrong "
                })
            })
    } catch (error) {
        console.log(error);

    }
}
export const headerOrder = (req, res) => {
    const query = `
        SELECT 
    s.status,
    COUNT(o.status) AS count
FROM 
    (SELECT 'pending' AS status
     UNION ALL
     SELECT 'completed'
     UNION ALL
     SELECT 'canceled') s
LEFT JOIN 
    orders o
ON 
    s.status = o.status
GROUP BY 
    s.status;

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
export const searchOrder = (req, res) => {
    const { username } = req.query;
    const query = `SELECT * FROM orders o
INNER JOIN customers c ON 
c.customer_id=o.customer_id
WHERE username=?`
    if (!username) {
        return res.status.json({ message: "Enter User name" })
    }
    pool.promise().query(query, [username])
        .then(([rows]) => {
            return res.status(200).json({
                data: rows,
                message: "successfully"
            })
        })
        .catch((error) => {
            return res.status(400).json({
                message: "something went wrong",
                error: error
            })
        })
}