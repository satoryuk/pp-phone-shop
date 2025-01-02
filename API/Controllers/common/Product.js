import pool from "../../db/db_handle.js";

export const displayAllProduct = (req, res) => {

    const query = `SELECT *
FROM (
    SELECT 
        p.*, 
        c.category_name, 
        b.brand_name,
        pv.idphone_variants,
        s.price, 
        pv.color,
        pm.image,
        ROW_NUMBER() OVER (PARTITION BY p.phone_id ORDER BY s.price DESC) AS row_num
        
    FROM phones p
    INNER JOIN categories c ON c.category_id = p.category_id
    INNER JOIN brands b ON b.brand_id = p.brand_id
    INNER JOIN phone_variants pv ON pv.phone_id = p.phone_id
    LEFT JOIN productimage pm ON pm.phone_variant_id=pv.idphone_variants
    LEFT JOIN specifications s ON s.phone_variant_id=pv.idphone_variants
) AS ranked
WHERE row_num = 1;

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



    const query = ` SELECT *
FROM (
     SELECT 
        p.*, 
        c.category_name, 
        b.brand_name,
        pv.idphone_variants,
        s.price, 
        pv.color,
        pm.image,
         ROW_NUMBER() OVER (PARTITION BY p.phone_id ORDER BY s.price DESC) AS row_num
    FROM phones p
    INNER JOIN categories c ON c.category_id = p.category_id
    INNER JOIN brands b ON b.brand_id = p.brand_id
    INNER JOIN phone_variants pv ON pv.phone_id = p.phone_id
    LEFT JOIN specifications s ON s.phone_variant_id=pv.idphone_variants
    LEFT JOIN productimage pm ON pm.phone_variant_id=pv.idphone_variants
    ORDER BY phone_id
) AS ranked
WHERE row_num = 1 AND category_name=?;
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
    const { searchData, Category } = req.query;

    console.log(req.query);

    if (!searchData) {
        return res.status(400).json({ message: "Missing search data" });
    }

    const query = `
      SELECT *
FROM (
     SELECT 
        p.*, 
        c.category_name, 
        b.brand_name,
        pv.idphone_variants,
        s.price, 
        pv.color,
        pm.image,
        ROW_NUMBER() OVER (PARTITION BY p.phone_id ORDER BY s.price DESC) AS row_num
    FROM phones p
    INNER JOIN categories c ON c.category_id = p.category_id
    INNER JOIN brands b ON b.brand_id = p.brand_id
    INNER JOIN phone_variants pv ON pv.phone_id = p.phone_id
    LEFT JOIN specifications s ON s.phone_variant_id=pv.idphone_variants
    LEFT JOIN productimage pm ON pm.phone_variant_id=pv.idphone_variants
    ORDER BY phone_id
) AS ranked
WHERE row_num = 1 AND ranked.name=?AND ranked.category_name=?;
    `;

    pool.query(query, [searchData, Category], (err, rows) => {


        if (rows.length === 0 || err) {
            return res.json({ message: "No products found" });
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
    ranked.phone_id,
    ranked.name,
    ranked.category_name,
    ranked.brand_name,
    ranked.release_date,
    ranked.idphone_variants,
    ranked.color,
    ranked.images,
    ranked.processor,
    ranked.storage,
    ranked.ram,
    ranked.battery,
    ranked.camera,
    ranked.screen_size,
    ranked.stock,
    ranked.price
FROM (
    SELECT 
        p.phone_id,
        p.name,
        c.category_name, 
        b.brand_name,
        p.release_date,
        pv.idphone_variants,
        pv.color,
        GROUP_CONCAT(DISTINCT pm.image) AS images,
        s.processor,
        s.storage,
        s.ram,
        s.battery,
        s.camera,
        s.screen_size,
        s.stock,
        s.price,
        ROW_NUMBER() OVER (PARTITION BY p.phone_id ORDER BY s.price ASC) AS row_num
    FROM phones p
    INNER JOIN categories c ON c.category_id = p.category_id
    INNER JOIN brands b ON b.brand_id = p.brand_id
    INNER JOIN phone_variants pv ON pv.phone_id = p.phone_id
    LEFT JOIN specifications s ON s.phone_variant_id = pv.idphone_variants
    LEFT JOIN productimage pm ON pm.phone_variant_id = pv.idphone_variants
    WHERE p.name = ?
    GROUP BY 
        p.phone_id, p.name, c.category_name, b.brand_name, p.release_date, 
        pv.idphone_variants, pv.color, s.processor, s.storage, s.ram, s.battery, 
        s.camera, s.screen_size, s.stock, s.price
) AS ranked
WHERE ranked.row_num = 1;

                                     
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
export const getProduct = async (req, res) => {
    const { phone_name } = req.query;

    if (!phone_name) {
        return res.status(400).json({
            message: "fill phone_name"
        })
    }

    const query = `SELECT 
    p.phone_id,
    p.name,
    p.description,
    pv.idphone_variants,
    p.release_date,
    pv.color,
    pv.stock AS color_stock,
    GROUP_CONCAT(DISTINCT pm.image) AS images,
    s.spec_id,
    s.screen_size,
    s.processor,
    s.ram,
    s.storage,
    s.battery,
    s.camera,
    s.price,
    s.stock AS spec_stock
FROM phones p
INNER JOIN phone_variants pv ON pv.phone_id = p.phone_id
LEFT JOIN productimage pm ON pm.phone_variant_id = pv.idphone_variants
INNER JOIN specifications s ON s.phone_variant_id = pv.idphone_variants
WHERE p.name = ?
GROUP BY 
    p.name,
    p.description,
    p.release_date,
    pv.idphone_variants,
    pv.color,
    pv.stock,
    s.spec_id,
    s.screen_size,
    s.processor,
    s.ram,
    s.storage,
    s.battery,
    s.camera,
    s.price,
    s.stock;
`
    const [rows] = await pool.promise().query(query, phone_name);
    if (rows.length === 0) {
        return res.json({
            message: "something went wrong"
        })
    }
    return res.status(200).json({
        message: "successfully",
        data: rows
    })
}