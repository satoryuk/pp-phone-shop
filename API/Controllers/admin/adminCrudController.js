import pool from "../../db/db_handle.js";
import bcrypt from "bcrypt";

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



export const addNewProduct = async (req, res) => {

  try {
    console.log("Files received:", req.files); // Debugging files
    if (!req.files || req.files.length === 0) {
      throw new Error("No files uploaded. Please upload images.");
    }

    // Parse `colors` (sent as JSON string)
    let colors = [];
    try {
      colors = JSON.parse(req.body.colors); // Parse into an array
      if (!Array.isArray(colors)) {
        throw new Error("Invalid format for colors. Expected an array.");
      }
    } catch (err) {
      throw new Error("Failed to parse colors. Ensure it is a valid JSON array.");
    }

    // Extract other fields from `req.body`
    const {
      name,
      brand,
      price,
      date,
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
      "INSERT INTO phones (name, description, price, stock, category_id, brand_id, release_date) VALUES(?,?,?,?,?,?,?)";
    const addSpecificationsQuery =
      "INSERT INTO specifications (phone_id, screen_size, processor, ram, storage, battery, camera) VALUES(?,?,?,?,?,?,?)";
    const addColorsQuery =
      "INSERT INTO phone_colors (phone_id, color) VALUES (?,?)";
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
      camera,
    ];
    await pool.promise().query(addSpecificationsQuery, specificationValues);

    // Insert colors
    for (let color of colors) {
      await pool.promise().query(addColorsQuery, [phone_id, color]);
    }

    // Insert images
    for (let image of images) {
      await pool.promise().query(addImageQuery, [phone_id, image]);
    }

    res.status(201).json({ message: "Product added successfully" });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
}
export const updateProduct = (req, res) => {
  const {
    id,
    new_name,
    description,
    price,
    stock,
    name_category,
    name_brand,
    release_date,
    screen_size,
    processor,
    ram,
    storage,
    battery,
    camera,
  } = req.body;

  const categoryQuery = `SELECT category_id FROM categories WHERE category_name = ?`;
  const brandQuery = `SELECT brand_id FROM brands WHERE brand_name = ?`;
  const updateProductQuery = `UPDATE phones SET name=?,description = ?, price = ?, stock = ?, category_id = ?, brand_id = ?, release_date = ? WHERE phone_id = ?`;
  const updateSpecificQuery = `UPDATE specifications SET screen_size = ?, processor = ?, ram = ?, storage = ?, battery = ?, camera = ? WHERE phone_id = ?`;

  // Get category_id
  pool.query(categoryQuery, name_category, (err, rows) => {
    if (err)
      return res.status(400).json({ message: "Something went wrong category" });

    const category_id = rows[0].category_id;

    // Get brand_id
    pool.query(brandQuery, name_brand, (err, rows) => {
      if (err)
        return res
          .status(400)
          .json({ message: "Something went wrong in brand" });

      const brand_id = rows[0].brand_id;

      // Update the phones table
      const valueProduct = [
        new_name,
        description,
        price,
        stock,
        category_id,
        brand_id,
        release_date,
        id,
      ];
      pool.query(updateProductQuery, valueProduct, (err, result) => {
        if (err)
          return res
            .status(400)
            .json({ message: "Something went wrong product" });

        // If the product was found and updated
        if (result.affectedRows === 0) {
          return res.status(404).json({ message: "Product not found" });
        }

        const phoneIdQuery = `SELECT phone_id FROM phones WHERE name = ?`;
        pool.query(phoneIdQuery, new_name, (err, rows) => {
          if (err)
            return res
              .status(400)
              .json({ message: "Something went wrong spec" });

          // Update the specifications table
          const valueSpecific = [
            screen_size,
            processor,
            ram,
            storage,
            battery,
            camera,
            id,
          ];
          pool.query(updateSpecificQuery, valueSpecific, (err, result) => {
            if (err)
              return res.status(400).json({ message: "Something went wrong" });

            res.status(200).json({ message: "Product updated successfully" });
          });
        });
      });
    });
  });
};

export const deleteProduct = async (req, res) => {
  const { deleteid } = req.query;

  if (!deleteid) {
    return res.status(400).json({ message: "Product ID is required" });
  }

  const queries = [
    { query: "DELETE FROM productimage WHERE phone_id=?", errorMsg: "Failed to delete product images" },
    { query: "DELETE FROM phone_colors WHERE phone_id=?", errorMsg: "Failed to delete phone colors" },
    { query: "DELETE FROM specifications WHERE phone_id=?", errorMsg: "Failed to delete specifications" },
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






