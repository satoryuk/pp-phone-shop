import pool from "../../db/db_handle.js";

export const displayAllProduct = (req, res) => {

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
WHERE row_num = 1 
ORDER BY ranked.name
                    `
    pool.query(query, (err, rows) => {
        if (err) return res.status(400).json({ message: "something went wrong" });
        res.status(200).json({
            data: rows,
            message: "sucessfully",
        });
    });

};

export const category = (req, res) => {
    const query = `SELECT category_name FROM categories ORDER BY category_id`
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
export const displayByCategory = (req, res) => {
    const { category } = req.query;



    const query = ` SELECT ranked.phone_id,ranked.name, ranked.description, pv.price, pv.color,c.category_name,ranked.release_date,ranked.stock
FROM (
    SELECT phone_id,name, description,category_id,release_date,stock,
           ROW_NUMBER() OVER (PARTITION BY name ORDER BY name) AS row_num
    FROM phones
) AS ranked 
INNER JOIN categories c ON 
c.category_id=ranked.category_id
LEFT JOIN phone_variants pv ON 
pv.phone_id=ranked.phone_id
WHERE row_num = 1 AND c.category_name=?
ORDER BY ranked.name
                    `

    pool.query(query, [category], (err, rows) => {
        if (err) {
            return res.status(400).json({ message: "something went wrong" });
        }
        res.status(200).json({
            data: rows,
            message: "sucessfully"
        })
    })
}

export const searchItems = (req, res) => {
    const { searchData } = req.query;

    if (!searchData) {
        return res.status(400).json({ message: "Missing search data" });
    }

    const query = `
      SELECT ranked.phone_id,ranked.name, ranked.description, pv.price, pv.color,c.category_name,ranked.release_date,ranked.stock
FROM (
    SELECT phone_id,name, description,category_id,release_date,stock,
           ROW_NUMBER() OVER (PARTITION BY name ORDER BY name) AS row_num
    FROM phones
) AS ranked 
INNER JOIN categories c ON 
c.category_id=ranked.category_id
LEFT JOIN phone_variants pv ON 
pv.phone_id=ranked.phone_id
WHERE row_num = 1 AND ranked.name=?
ORDER BY ranked.name
    `;

    pool.query(query, [searchData], (err, rows) => {
        if (err) {
            console.error("Database Error:", err);
            return res.status(500).json({ message: "Internal server error" });
        }

        if (rows.length === 0) {
            return res.status(404).json({ message: "No products found" });
        }

        console.log(rows);

        return res.status(200).json({
            data: rows,
            message: "Successfully retrieved products",
        });
    });
};

export const searchItemsByName = async (req, res) => {
    const { phone_name } = req.query;

    // Validate if 'id' is provided
    if (!phone_name) {
        return res.status(400).json({ message: "ID parameter is missing" });
    }

    // console.log(`Searching for item with ID: ${id}`);

    const query = `
      SELECT 
                        p.phone_id,
                        p.name,
                        p.description,
                        pv.price,
                        CASE 
                            WHEN pm.status = "Active" THEN ROUND(pv.price * (100 - pm.discount_percentage) / 100, 2) 
                            ELSE pv.price
                        END AS Discount_price,
                        pv.stock,
                        pv.color,
                        pv.idphone_variants,
                        p.release_date,
                        s.screen_size,
                        s.processor,
                        s.ram,
                        s.storage,
                        s.battery,
                        s.camera,
                        b.brand_name,
                        c.category_name,
                        GROUP_CONCAT(DISTINCT pi.image SEPARATOR ', ') AS images 
                    FROM phones p 
                    LEFT JOIN specifications s ON p.phone_id = s.phone_id 
                    LEFT JOIN brands b ON p.brand_id = b.brand_id 
                    LEFT JOIN categories c ON p.category_id = c.category_id
                    LEFT JOIN phone_variants pv ON pv.phone_id=p.phone_id
                    LEFT JOIN promotions pm ON pm.phone_variants_id = pv.idphone_variants
                    LEFT JOIN productimage pi ON pi.phone_variant_id = pv.idphone_variants
					 WHERE p.name=?
                    GROUP BY 
                        p.phone_id, p.name, p.description, p.stock, pv.color, p.release_date, 
                        s.screen_size, s.processor, s.ram, s.storage, s.battery, s.camera, 
                        b.brand_name, c.category_name, pm.status, pm.discount_percentage,pv.price,pv.idphone_variants
                    
                    
                    
    `;

    try {
        // Use await instead of promise chaining
        const [rows] = await pool.promise().query(query, [phone_name]);

        if (rows.length === 0) {
            return res.status(404).json({ message: "Item not found" });
        }

        console.log(rows[0]);  // Log the first row to check the result
        res.status(200).json({
            data: rows,
            message: "Data retrieved successfully"
        });

    } catch (error) {
        console.error("Error occurred:", error);
        res.status(500).json({ message: "An error occurred while retrieving data", error: error.message });
    }
};
