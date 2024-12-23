import pool from "../../db/db_handle.js";

export const dashboardHeader = (req, res) => {
    const { date } = req.query;

    const value = [date, date, date];
    const query = `SELECT 'Total Revenue' AS label,  
                    COALESCE(SUM(total_amount), 0) AS total
                    FROM orders
                    WHERE order_date >= CURDATE() - INTERVAL ? MONTH

                    UNION ALL

                    SELECT 'Total Order' AS label, COUNT(o.order_id) AS total
                    FROM order_items oi
                    JOIN orders o ON oi.order_id = o.order_id
                    WHERE o.order_date >= CURDATE() - INTERVAL ? MONTH
                    

                    UNION ALL

                    SELECT 'Total Customer' AS label, 
                        COUNT(DISTINCT c.customer_id) AS total
                    FROM customers c
                    WHERE EXISTS (
                    SELECT 1
                    FROM orders o
                    WHERE o.customer_id = c.customer_id
                    AND o.order_date >= CURDATE() - INTERVAL ? MONTH
                    );

                    `
    pool.query(query, value, (err, rows) => {
        if (err) {
            return res.status(400).json({ message: "something went wrong" })
        }
        res.status(200).json({
            data: rows,
            message: "successfully"
        })
    })
}
export const dashboardHeaderAll = (req, res) => {
    const query = `SELECT 'Total Revenue' AS label,  COALESCE(SUM(total_amount),0) AS total
                  FROM orders
  
                  UNION ALL
  
                  SELECT 'Total Order' AS label, COUNT(o.order_id) AS total
                  FROM order_items oi
                  JOIN orders o ON oi.order_id = o.order_id
  
                  UNION ALL
  
                  SELECT 'Total Customer' AS label, COUNT(DISTINCT c.customer_id) AS total
                  FROM customers c
                  WHERE EXISTS (
                    SELECT 1
                    FROM orders o
                    WHERE o.customer_id = c.customer_id
                    
                  );
                  `
    pool.query(query, (err, rows) => {
        if (err) {
            return res.status(400).json({ message: "something went wrong" })
        }
        return res.status(200).json({
            data: rows,
            message: "sucessfully"
        })
    })
}

export const displayByDate = (req, res) => {
    const { date } = req.query;


    const query = `SELECT ranked.phone_id,ranked.name, ranked.description, pv.price, pv.color,c.category_name,ranked.release_date,ranked.stock
FROM (
    SELECT phone_id,name, description,category_id,release_date,stock,
           ROW_NUMBER() OVER (PARTITION BY name ORDER BY name) AS row_num
    FROM phones
) AS ranked 
INNER JOIN categories c ON 
c.category_id=ranked.category_id
LEFT JOIN phone_variants pv ON 
pv.phone_id=ranked.phone_id
WHERE row_num = 1 AND ranked.release_date >=CURRENT_DATE()-INTERVAL ? MONTH
ORDER BY ranked.name
              `
    pool.query(query, date, (err, rows) => {
        if (err) return res.status(400).json({ message: "something went wrong" });
        res.status(200).json({
            data: rows,
            message: "sucessfully",
        });
    })
}
