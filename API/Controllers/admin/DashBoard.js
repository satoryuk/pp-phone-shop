import pool from "../../db/db_handle.js";

export const dashboardHeader = (req, res) => {
    const { date } = req.query;

    const value = [date, date, date];
    const query = `SELECT 'Total Revenue' AS label,  COALESCE(SUM(total_amount),0) AS total
                    FROM orders
                    WHERE Order_date >= CURDATE() - INTERVAL  ? MONTH
  
                    UNION ALL
  
                    SELECT 'Total Order' AS label, COUNT(DISTINCT oi.order_id) AS total
                    FROM order_items oi
                    JOIN orders o ON oi.order_item_id = o.order_id
                    WHERE o.Order_date >= CURDATE() - INTERVAL ? MONTH
  
                    UNION ALL
  
                    SELECT 'Total Customer' AS label, COUNT(DISTINCT c.customer_id) AS total
                    FROM customers c
                    WHERE EXISTS (
                      SELECT 1
                      FROM orders o
                      WHERE o.customer_id = c.customer_id
                      AND o.Order_date >= CURDATE() - INTERVAL ? MONTH
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
  
                  SELECT 'Total Order' AS label, COUNT(DISTINCT oi.order_id) AS total
                  FROM order_items oi
                  JOIN orders o ON oi.order_item_id = o.order_id
  
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


    const query = `SELECT 
                  p.phone_id,
                  p.name,
                  p.description,
                  p.price,
                  p.stock,
                  p.img,
                  p.release_date,
                  s.screen_size,
                  s.processor,
                  s.ram,
                  s.storage,
                  s.battery,
                  s.camera,
                  b.brand_name,
                  b.img AS brand_img,
                  c.category_name
              FROM phones p 
              LEFT JOIN specifications s ON p.phone_id = s.phone_id 
              INNER JOIN brands b ON p.brand_id = b.brand_id 
              INNER JOIN categories c ON p.category_id = c.category_id
              WHERE p.release_date >= CURDATE() - INTERVAL ? MONTH;
              `
    pool.query(query, date, (err, rows) => {
        if (err) return res.status(400).json({ message: "something went wrong" });
        res.status(200).json({
            data: rows,
            message: "sucessfully",
        });
    })
}
