import pool from "../../db/db_handle.js";

export const checkout = async (req, res) => {
    try {
        const { customerName, items } = req.body;

        if (!customerName || !items || !Array.isArray(items)) {
            return res.status(400).json({ message: "Invalid input data" });
        }

        console.log("Customer Name:", customerName);

        // Find the customer ID
        const queryFindCustomerID = `SELECT customer_id FROM customers WHERE username = ?`;
        const [customerRows] = await pool.promise().query(queryFindCustomerID, [customerName]);

        if (customerRows.length === 0) {
            return res.status(404).json({ message: "Customer not found" });
        }

        const customer_id = customerRows[0].customer_id;

        console.log("Customer ID:", customer_id);

        // Insert into orders
        const queryInsertOrders = `INSERT INTO orders (customer_id) VALUES (?)`;
        const [ordersRows] = await pool.promise().query(queryInsertOrders, [customer_id]);

        const order_id = ordersRows.insertId;

        console.log("Order ID:", order_id);

        // Prepare bulk insert for order items
        const queryInsertOrderItem = `INSERT INTO order_items (order_id, spec_id, quantity) VALUES ?`;
        const orderItems = items.map(item => [order_id, item.spec_id, item.quantity]);

        if (orderItems.length > 0) {
            await pool.promise().query(queryInsertOrderItem, [orderItems]);
        }

        console.log("Order items inserted successfully.");

        res.status(201).json({ message: "Order placed successfully", orderId: order_id });
    } catch (error) {
        console.error("Error in checkout:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};
