import { query } from "express";
import pool from "../../db/db_handle.js";


export const addNewProduct = async (req, res) => {

    try {
        console.log("Files received:", req.files); // Debugging files
        if (!req.files || req.files.length === 0) {
            throw new Error("No files uploaded. Please upload images.");
        }

        const {
            name,
            brand,
            price,
            date,
            color,
            processor,
            storage,
            camera,
            category,
            description,
            stock,
            screenSize,
            ram,
            battery,
        } = req.body;

        // Process image filenames (multer saves files in 'uploads/')
        const images = req.files.map((file) => file.filename);

        // Handle database operations
        const category_query = `SELECT category_id FROM categories WHERE category_name=?`;
        const brand_query = "SELECT brand_id FROM brands WHERE brand_name=?";
        const addProductQuery =
            "INSERT INTO phones (name, description, price,color, stock, category_id, brand_id, release_date) VALUES(?,?,?,?,?,?,?,?)";
        const addSpecificationsQuery =
            "INSERT INTO specifications (phone_id, screen_size, processor, ram, storage, battery, camera) VALUES(?,?,?,?,?,?,?)";
        // const addColorsQuery =
        //   "INSERT INTO phone_colors (phone_id, color) VALUES (?,?)";
        const addImageQuery =
            "INSERT INTO productimage(phone_id, image) VALUES (?,?)";

        // Database operations (same as your previous code)
        const [categoryRows] = await pool.promise().query(category_query, [category]);
        if (!categoryRows.length) throw new Error("Category not found");
        const category_id = categoryRows[0].category_id;

        const [brandRows] = await pool.promise().query(brand_query, [brand]);
        if (!brandRows.length) throw new Error("Brand not found");
        const brand_id = brandRows[0].brand_id;

        const productValues = [
            name,
            description,
            price,
            color,
            stock,
            category_id,
            brand_id,
            date,
        ];

        const [productRows] = await pool.promise().query(addProductQuery, productValues);
        const phone_id = productRows.insertId;

        const specificationValues = [
            phone_id,
            screenSize,
            processor,
            ram,
            storage,
            battery,
            camera
        ];
        await pool.promise().query(addSpecificationsQuery, specificationValues);

        for (let image of images) {
            await pool.promise().query(addImageQuery, [phone_id, image]);
        }

        res.status(201).json({ message: "Product added successfully" });
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: err.message });
    }
}

export const updateProduct = async (req, res) => {
    try {
        console.log("Files received:", req.files); // Debugging files
        const { productId } = req.params;
        console.log(req.params);

        if (!productId) {
            throw new Error("Product ID is required to update the product.");
        }
        // Parse `colors` (sent as JSON string)
        // let colors = [];
        // try {
        //   colors = JSON.parse(req.body.colors); // Parse into an array
        //   if (!Array.isArray(colors)) {
        //     throw new Error("Invalid format for colors. Expected an array.");
        //   }
        // } catch (err) {
        //   throw new Error("Failed to parse colors. Ensure it is a valid JSON array.");
        // }

        // Extract other fields from `req.body`
        const {
            name,
            brand,
            price,
            date,
            processor,
            color,
            storage,
            camera,
            category,
            description,
            stock,
            screenSize,
            ram,
            battery,
        } = req.body;
        console.log(req.body);

        // Process image filenames (multer saves files in 'uploads/')
        const images = req.files ? req.files.map((file) => file.filename) : [];
        console.log(images);

        // Handle database operations
        const category_query = `SELECT category_id FROM categories WHERE category_name=?`;
        const brand_query = "SELECT brand_id FROM brands WHERE brand_name=?";
        const updateProductQuery =
            "UPDATE phones SET name=?, description=?, price=?,color=?, stock=?, category_id=?, brand_id=?, release_date=? WHERE phone_id=?";
        const updateSpecificationsQuery =
            "UPDATE specifications SET screen_size=?, processor=?, ram=?, storage=?, battery=?, camera=? WHERE phone_id=?";
        // const deleteColorsQuery = "DELETE FROM phone_colors WHERE phone_id=?";
        const deleteImagesQuery = "DELETE FROM productimage WHERE phone_id=?";
        // const addColorsQuery = "INSERT INTO phone_colors (phone_id, color) VALUES (?,?)";
        const addImageQuery = "INSERT INTO productimage(phone_id, image) VALUES (?,?)";

        // Database operations (same as your previous code)
        const [categoryRows] = await pool.promise().query(category_query, [category]);
        if (!categoryRows.length) throw new Error("Category not found");
        const category_id = categoryRows[0].category_id;

        const [brandRows] = await pool.promise().query(brand_query, [brand]);
        if (!brandRows.length) throw new Error("Brand not found");
        const brand_id = brandRows[0].brand_id;

        const productValues = [
            name,
            description,
            price,
            color,
            stock,
            category_id,
            brand_id,
            date,
            productId,
        ];

        await pool.promise().query(updateProductQuery, productValues);

        const specificationValues = [
            screenSize,
            processor,
            ram,
            storage,
            battery,
            camera,
            productId,
        ];
        await pool.promise().query(updateSpecificationsQuery, specificationValues);

        // Update colors: delete existing and add new ones
        // await pool.promise().query(deleteColorsQuery, [productId]);
        // for (let color of colors) {
        //   await pool.promise().query(addColorsQuery, [productId, color]);
        // }

        // Update images: delete existing and add new ones (if provided)
        if (images.length > 0) {
            await pool.promise().query(deleteImagesQuery, [productId]);
            for (let image of images) {
                await pool.promise().query(addImageQuery, [productId, image]);
            }
        }
        res.status(200).json({ message: "Product updated successfully" });
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: err.message });
    }
};

export const deleteProduct = async (req, res) => {
    const { deleteid } = req.query;

    if (!deleteid) {
        return res.status(400).json({ message: "Product ID is required" });
    }

    const queries = [
        { query: "DELETE FROM productimage WHERE phone_id=?", errorMsg: "Failed to delete product images" },
        { query: "DELETE FROM specifications WHERE phone_id=?", errorMsg: "Failed to delete specifications" },
        { query: "DELETE FROM promotions WHERE phone_id=?", errorMsg: "Failed to delete promotions" },
        { query: "DELETE FROM phone_variants WHERE phone_id=?", errorMsg: "Failed to delete promotions" },
        { query: "DELETE FROM phones WHERE phone_id=?", errorMsg: "Failed to delete product" },

    ];

    try {
        for (const { query, errorMsg } of queries) {
            await new Promise((resolve, reject) => {
                pool.query(query, [deleteid], (err, rows) => {
                    if (err) {
                        console.error(errorMsg, err);
                        return reject(new Error(errorMsg));
                    }
                    resolve(rows);
                });
            });
        }

        return res.status(200).json({
            message: "Product deleted successfully",
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


export const addNewBrand = (req, res) => {
    const images = req.file;  // Use req.file for the uploaded image
    console.log(images);
    const { brand } = req.body;
    if (!images) {
        return res.status(400).json({ message: 'Image is required' });
    }

    // SQL query to insert brand name and image path into the database
    const query = `INSERT INTO brands(brand_name, img) VALUES(?, ?)`;

    pool.query(query, [brand, images.filename], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(400).json({ message: "Something went wrong" });
        }
        return res.status(200).json({ message: "Insert successfully", data: result });
    });
};

export const addNewCategory = (req, res) => {
    const { category } = req.body;
    console.log(category);

    if (!category || category.trim() === "") {
        return res.status(400).json({ message: "Category is required" });
    }

    const query = `INSERT INTO categories (category_name) VALUES(?)`;

    pool.query(query, [category], (err, rows) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(400).json({ message: "Something went wrong", error: err });
        }

        return res.status(200).json({ message: "Insert Successfully", data: rows });
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









