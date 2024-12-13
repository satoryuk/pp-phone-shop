import pool from "../../db/db_handle.js";

export const displayAllProduct = (req, res) => {

    const query = `SELECT 
                    p.phone_id,
                    p.name,
                    p.description,
                    CASE 
                        WHEN pm.status = "Active" THEN p.price * (100 - pm.discount_percentage) / 100
                        ELSE p.price
                    END AS price,
                    p.stock,
                    p.release_date,
                    p.color,
                    GROUP_CONCAT(DISTINCT pi.image SEPARATOR ', ') AS images, -- Combines distinct images into a single string
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
                    LEFT JOIN promotions pm ON pm.phone_id = p.phone_id
                    LEFT JOIN productimage pi ON pi.phone_id = p.phone_id -- Join for product images
                    GROUP BY p.phone_id, p.name, p.description, p.stock, p.release_date, p.color,
                    s.screen_size, s.processor, s.ram, s.storage, s.battery, s.camera,
                    b.brand_name, b.img, c.category_name, pm.status, pm.discount_percentage;
                    


                    `
    pool.query(query, (err, rows) => {
        if (err) return res.status(400).json({ message: "something went wrong" });
        res.status(200).json({
            data: rows,
            message: "sucessfully",
        });
    });

};
export const CountHeaderData = (req, res) => {
    const query = `
      SELECT 'Phone' AS label, COUNT(phone_id) AS quantity
      FROM phones
      UNION ALL
      SELECT 'Category' AS label, COUNT(category_id) AS quantity
      FROM categories
      UNION ALL
      SELECT 'Inventory' AS label, COUNT(stock) AS quantity
      FROM phones;
    `;

    pool.query(query, (error, rows) => {
        if (error) {
            return res.status(400).json({ message: "Something went wrong" });
        }
        // Since you are selecting counts, the result will have a single row, so access rows[0]
        return res.status(200).json({
            data: rows, // Access the first row
            message: "Successfully retrieved counts"
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



    const query = `SELECT 
                        p.phone_id,
                        p.name,
                        p.description,
                        CASE 
                            WHEN pm.status = "Active" THEN p.price * (100 - pm.discount_percentage) / 100
                            ELSE p.price
                        END AS final_price,
                        p.stock,
                        p.color,
                        p.release_date,
                        s.screen_size,
                        s.processor,
                        s.ram,
                        s.storage,
                        s.battery,
                        s.camera,
                        b.brand_name,
                        c.category_name,
                        GROUP_CONCAT(DISTINCT pi.image SEPARATOR ', ') AS images -- Combines distinct images into a single string
                    FROM phones p 
                    LEFT JOIN specifications s ON p.phone_id = s.phone_id 
                    INNER JOIN brands b ON p.brand_id = b.brand_id 
                    INNER JOIN categories c ON p.category_id = c.category_id
                    LEFT JOIN promotions pm ON pm.phone_id = p.phone_id
                    LEFT JOIN productimage pi ON pi.phone_id = p.phone_id -- Join for product images
                    WHERE c.category_name = "phone"
                    GROUP BY 
                        p.phone_id, p.name, p.description, p.stock, p.color, p.release_date, 
                        s.screen_size, s.processor, s.ram, s.storage, s.battery, s.camera, 
                        b.brand_name, c.category_name, pm.status, pm.discount_percentage
                    ORDER BY p.phone_id;

                    `

    pool.query(query, category, (err, rows) => {
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
       SELECT
            p.phone_id,
            p.name,
            p.description,
            CASE 
                WHEN pm.status = "Active" THEN p.price * (100 - pm.discount_percentage) / 100
                ELSE p.price
            END AS price,
            p.stock,
            p.release_date,
            s.screen_size,
            s.processor,
            s.ram,
            s.storage,
            s.battery,
            s.camera,
            b.brand_name,
            c.category_name,
            GROUP_CONCAT(DISTINCT pi.image SEPARATOR ', ') AS images -- Aggregate images into a single field
        FROM phones p
        LEFT JOIN specifications s ON p.phone_id = s.phone_id
        INNER JOIN brands b ON p.brand_id = b.brand_id
        INNER JOIN categories c ON p.category_id = c.category_id
        LEFT JOIN promotions pm ON pm.phone_id = p.phone_id
        LEFT JOIN productimage pi ON pi.phone_id = p.phone_id -- Join for images
        WHERE p.name = "phone90"
        GROUP BY 
            p.phone_id, p.name, p.description, p.stock, p.release_date, 
            s.screen_size, s.processor, s.ram, s.storage, s.battery, s.camera, 
            b.brand_name, c.category_name, pm.status, pm.discount_percentage;

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

export const searchItemsByID = (req, res) => {
    const { id } = req.params;

    // Validate if 'id' is provided
    if (!id) {
        return res.status(400).json({ message: "ID parameter is missing" });
    }

    console.log(`Searching for item with ID: ${id}`);

    const query = `
            SELECT
        p.phone_id,
        p.name,
        p.description,
        p.price,
        p.stock,
        p.release_date,
        p.color,
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
    INNER JOIN brands b ON p.brand_id = b.brand_id
    INNER JOIN categories c ON p.category_id = c.category_id
    LEFT JOIN productimage pi ON pi.phone_id = p.phone_id
    WHERE p.phone_id = 25
    GROUP BY
        p.phone_id, p.name, p.description, p.price, p.stock, p.release_date,
        s.screen_size, s.processor, s.ram, s.storage, s.battery, s.camera,
        b.brand_name, c.category_name;
        `;

    pool.query(query, [id], (err, rows) => {
        if (err) {
            console.error("Database query error:", err);
            return res.status(500).json({ message: "An error occurred while retrieving data" });
        }

        if (rows.length === 0) {
            return res.status(404).json({ message: "Item not found" });
        }
        res.status(200).json({
            data: rows,
            message: "Data retrieved successfully"
        });
    });
};
