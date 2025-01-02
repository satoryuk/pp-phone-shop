import { query } from "express";
import pool from "../../db/db_handle.js";
import { reject } from "bcrypt/promises.js";
import { deleteOrder } from "./Order.js";


export const addNewProduct = async (req, res) => {

    try {
        // console.log("Files received:", req.files); // Debugging files
        if (!req.files || req.files.length === 0) {
            throw new Error("No files uploaded. Please upload images.");
        }

        const {
            name,
            brand,
            price,
            date,
            colors,
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
            "INSERT INTO phones (name, description, category_id, brand_id, release_date,stock) VALUES(?,?,?,?,?,0)";

        const addSpecificationsQuery =
            "INSERT INTO specifications (phone_variant_id, screen_size, processor, ram, storage, battery, camera) VALUES(?,?,?,?,?,?,?)";
        // const addColorsQuery =
        //   "INSERT INTO phone_colors (phone_id, color) VALUES (?,?)";
        const addColorQuery =
            "INSERT INTO phone_variants (phone_id,color,stock) VALUES (?,?,?)"
        const addImageQuery =
            "INSERT INTO productimage(phone_variant_id, image) VALUES (?,?)";

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
            category_id,
            brand_id,
            date,
        ];

        const [productRows] = await pool.promise().query(addProductQuery, productValues);
        const phone_id = productRows.insertId;


        let variantID = [];
        console.log(colors);

        await pool.promise().query(addColorQuery, [phone_id, colors, stock])
            .then(([rows]) => {
                variantID.push(rows.insertId)
            })
            .catch((err) => {
                console.log(err);
            })
        const specificationValues = [
            variantID,
            screenSize,
            processor,
            ram,
            storage,
            battery,
            camera
        ];
        await pool.promise().query(addSpecificationsQuery, specificationValues);

        console.log(variantID);

        for (let image of images) {
            await pool.promise().query(addImageQuery, [variantID, image]);
        }


        res.status(201).json({ message: "Product added successfully" });
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: err.message });
    }
}

export const updateProduct = async (req, res) => {
    try {

        const { product_id } = req.query;

        if (!product_id) {
            throw new Error("Product ID is required to update the product.");
        }
        const {
            name,
            brand,
            date,
            processor,
            color,
            storage,
            camera,
            category,
            description,
            screenSize,
            ram,
            battery,
        } = req.body;

        // Process image filenames (multer saves files in 'uploads/')
        // Handle database operations
        const category_query = `SELECT category_id FROM categories WHERE category_name=?`;
        const brand_query = "SELECT brand_id FROM brands WHERE brand_name=?";
        const updateProductQuery =
            "UPDATE phones SET name=?, description=?, category_id=?, brand_id=?, release_date=? WHERE phone_id=?";
        const updateSpecificationsQuery =
            "UPDATE specifications SET screen_size=?, processor=?, ram=?, storage=?, battery=?, camera=? WHERE phone_id=?";

        const [categoryRows] = await pool.promise().query(category_query, [category]);


        if (!categoryRows.length) throw new Error("Category not found");
        const category_id = categoryRows[0].category_id;


        const [brandRows] = await pool.promise().query(brand_query, [brand]);
        if (!brandRows.length) throw new Error("Brand not found");
        const brand_id = brandRows[0].brand_id;

        const productValues = [
            name,
            description,
            category_id,
            brand_id,
            date,
            product_id,
        ];
        await pool.promise().query(updateProductQuery, productValues);

        const specificationValues = [
            screenSize,
            processor,
            ram,
            storage,
            battery,
            camera,
            product_id,
        ];
        await pool.promise().query(updateSpecificationsQuery, specificationValues);
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

    const variantQuery = `SELECT idphone_variants FROM phone_variants WHERE phone_id=?`;
    const deleteImageQuery = `DELETE FROM productimage WHERE phone_variant_id=?`;
    const deleteOrderItems = `DELETE FROM order_items WHERE phone_variants_id=?`;
    const deletePromotion = `DELETE FROM promotions WHERE phone_variants_id=?`;

    const queries = [
        { query: "DELETE FROM specifications WHERE phone_variant_id=?", errorMsg: "Failed to delete specifications" },
        { query: "DELETE FROM phone_variants WHERE phone_id=?", errorMsg: "Failed to delete phone variants" },
        { query: "DELETE FROM phones WHERE phone_id=?", errorMsg: "Failed to delete product" },
    ];

    try {
        // Fetch all variant IDs for the given phone ID
        const [variantsID] = await pool.promise().query(variantQuery, [deleteid]);

        // Delete associated order items and images for each variant
        for (const variant of variantsID) {
            const variantID = variant.idphone_variants;

            // Delete order items
            await new Promise((resolve, reject) => {
                pool.query(deleteOrderItems, [variantID], (err, row) => {
                    if (err) {
                        console.error("Failed to delete order items:", err);
                        return reject(new Error("Failed to delete order items"));
                    }
                    resolve(row);
                });
            });

            await new Promise((resolve, reject) => {
                pool.query(deletePromotion, [variantID], (err, row) => {
                    if (err) {
                        console.error("Failed to delete order items:", err);
                        return reject(new Error("Failed to delete order items"));
                    }
                    resolve(row);
                });
            });

            // Delete product images
            await new Promise((resolve, reject) => {
                pool.query(deleteImageQuery, [variantID], (err, row) => {
                    if (err) {
                        console.error("Failed to delete product images:", err);
                        return reject(new Error("Failed to delete product images"));
                    }
                    resolve(row);
                });
            });
        }

        // Delete the main product records
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
        console.error("Error deleting product:", error.message);
        return res.status(500).json({ message: error.message });
    }
};

export const deleteVariants = async (req, res) => {
    const { variants_id } = req.query;

    const queries = [
        { query: `DELETE FROM productimage WHERE phone_variant_id = ?`, errorMsg: `Error productImage` },
        { query: `DELETE FROM order_items WHERE phone_variants_id = ?`, errorMsg: `Error productOrders` },
        { query: `DELETE FROM promotions WHERE phone_variants_id = ?`, errorMsg: `Error promotion` },
        { query: `DELETE FROM specifications WHERE phone_variant_id=?`, errorMsg: `Error promotion` },
        { query: `DELETE FROM phone_variants WHERE idphone_variants = ?`, errorMsg: `Error productVariants` },
    ]
    console.log(variants_id);

    try {
        // Delete images associated with the variant
        for (const { query, errorMsg } of queries) {
            await new Promise((resolve, reject) => {
                pool.query(query, [variants_id], (err, rows) => {
                    if (err) {
                        console.error("fail to delete");
                        return reject(new Error("Fail to delete" + errorMsg))

                    }
                    resolve(rows);
                })
            })
        }
        return res.status(200).json({
            message: "Variant and associated images deleted successfully",
        });
    } catch (error) {
        console.error("Error deleting variant:", error);
        return res.status(400).json({
            message: "Something went wrong",
            error: error.message,
        });
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
      SELECT 'Product' AS label, COUNT(phone_id) AS quantity
      FROM phones
      UNION ALL
      SELECT 'Category' AS label, COUNT(category_id) AS quantity
      FROM categories
      UNION ALL
      SELECT 'Inventory' AS label, SUM(stock) AS quantity
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
export const updateProductVariants = async (req, res) => {
    const { price, color } = req.body;
    const File = req.files;
    const productImages = [];
    for (let file of File) {
        productImages.push(file.path)
    }

    const { productVariantID } = req.params;


    const queryUpdateVariants = `UPDATE phone_variants
                                    SET color=?
                                    WHERE idphone_variants=?`
    const queryDeleteImage = `DELETE FROM productimage
                            WHERE phone_variant_id=?`
    const queryInsertImage = `INSERT INTO productimage(phone_variant_id,image)
                            VALUES(?,?)`
    try {
        const [variantsRow] = await pool.promise().query(queryUpdateVariants, [color, productVariantID])
        const [DeleteRow] = await pool.promise().query(queryDeleteImage, [productVariantID])
        for (let image of productImages) {
            const [InsertRow] = await pool.promise().query(queryInsertImage, [productVariantID, image])
            if (!InsertRow.length === 0) {
                return res.status(400).json({
                    message: "something went wrong"
                })
            }
        }
        if (!variantsRow.length === 0, !DeleteRow.length === 0) {
            return res.status(400).json({
                message: "something went wrong"
            })
        }
        return res.status(200).json({
            message: "sucessfully"
        })
    } catch (error) {
        console.log(error);

        return res.status(400).json({
            message: "something went wrong",
            error: error
        })
    }
}

export const addVariants = async (req, res) => {
    const { productName, color, stock } = req.body;
    const productImages = req.files;

    // Input Validation
    if (!productName || !color || !productImages) {
        return res.status(400).json({
            message: "Fill ALL fields"
        });
    }

    try {
        // Extract image filenames
        const images = productImages.map((element) => element.filename);
        console.log("Uploaded Images:", images);

        // Database Queries
        const findPhoneIDQuery = `SELECT phone_id FROM phones WHERE name=?`;
        const insertVariantsQuery = `
            INSERT INTO phone_variants(phone_id, color, stock)
            VALUES(?, ?, ?)
        `;
        const insertImageQuery = `
            INSERT INTO productimage(phone_variant_id, image)
            VALUES(?, ?)
        `;

        // Retrieve phone ID
        const [phone] = await pool.promise().query(findPhoneIDQuery, [productName]);
        if (phone.length === 0) {
            return res.status(404).json({ message: "Product not found" });
        }
        const phone_id = phone[0].phone_id;

        // Insert variant
        const variantValues = [phone_id, color, stock || 0];
        const [variantResult] = await pool.promise().query(insertVariantsQuery, variantValues);
        const variantID = variantResult.insertId;

        // Insert images
        for (let image of images) {
            await pool.promise().query(insertImageQuery, [variantID, image]);
        }

        // Success Response
        return res.status(201).json({
            message: "Variant added successfully",
            variantID,
            images,
        });
    } catch (error) {
        console.error("Error adding variant:", error);
        return res.status(500).json({ message: "Internal server error", error });
    }
};
export const addNewSpecificate = async (req, res) => {
    const { product_name, color, screen_size, processor, ram, storage, battery, camera, price, stock } = req.body.formdata;
    // console.log(req.body.formdata);

    // Input Validation
    // if (!product_name || !color || !screen_size || !processor || !ram || !storage || !battery || !camera || !price || !stock) {
    //     return res.status(400).json({
    //         message: "Fill all fields"
    //     });
    // }
    console.log(req.body);

    try {
        // Find Product ID
        const findProductIDQuery = `SELECT phone_id FROM phones WHERE name=?`;
        const [productResult] = await pool.promise().query(findProductIDQuery, [product_name]);
        if (productResult.length === 0) {
            return res.status(404).json({ message: "Product not found" });
        }
        const productID = productResult[0].phone_id;

        // Find Variant ID
        const findVariantsIDQuery = `SELECT idphone_variants FROM phone_variants WHERE phone_id=? AND color=?`;
        const [variantResult] = await pool.promise().query(findVariantsIDQuery, [productID, color]);
        if (variantResult.length === 0) {
            return res.status(404).json({ message: "Variant not found" });
        }
        const variantID = variantResult[0].idphone_variants;

        // Insert Specifications
        const insertSpecificationsQuery = `
            INSERT INTO specifications (phone_variant_id, screen_size, processor, ram, storage, battery, camera,price,stock)
            VALUES (?, ?, ?, ?, ?, ?, ?,?,?)
        `;
        const values = [variantID, screen_size, processor, ram, storage, battery, camera, price, stock];
        const [insertResult] = await pool.promise().query(insertSpecificationsQuery, values);

        // Success Response
        return res.status(201).json({
            message: "Specifications added successfully",
            data: insertResult,
        });
    } catch (error) {
        console.error("Error adding specifications:", error);
        return res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
};
export const UpdateSpecification = async (req, res) => {
    const { variantID, oldStorage } = req.query;
    const { processor, newStorage, ram, battery, camera, screen_size, stock, price } = req.body;

    // Validate inputs
    if (!variantID || !processor || !newStorage || !ram || !battery || !camera || !screen_size || !stock || !price) {
        return res.status(400).json({
            message: "Please fill all fields"
        });
    }
    // console.log(req.body);
    // console.log(req.query);

    const queryUpdate = `UPDATE specifications
                        SET storage=?, screen_size=?, processor=?, ram=?, battery=?, camera=?, stock=?, price=?
                        WHERE phone_variant_id=? AND storage=?`;

    const value = [
        newStorage,
        screen_size,
        processor,
        ram,
        battery,
        camera,
        stock,
        price,
        variantID,
        oldStorage
    ];

    try {
        const [updateRows] = await pool.promise().query(queryUpdate, value);

        if (updateRows.affectedRows === 0) {
            return res.status(400).json({
                message: "No rows were updated. Check if the variantID and oldStorage are correct."
            });
        }

        return res.status(200).json({
            data: updateRows,
            message: "Successfully updated"
        });
    } catch (error) {
        console.error("Database error:", error);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
};

export const deleteSpecification = async (req, res) => {
    const { variantID, storage } = req.query;
    const queryDelete = `DELETE FROM specifications WHERE phone_variant_id=? AND storage=?`
    try {
        const [deleteRows] = await pool.promise().query(queryDelete, [variantID, storage])
        if (deleteRows.length === 0) {
            return res.status(400).json({
                message: "something went wrong"
            })
        }
        return res.status(200).json({
            message: "successfully",
            data: deleteRows
        })
    } catch (error) {
        console.log(error);

    }
}




