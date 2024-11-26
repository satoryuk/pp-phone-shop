import pool from "../../db/db_handle.js";
import bcrypt from "bcrypt";

export const addNewBrand = (req, res) => {
  // const { brand } = req.body;
  const imagePath = req.file.filename;  // Use req.file for the uploaded image
  console.log(imagePath);

  // if (!imagePath) {
  //   return res.status(400).json({ message: 'Image is required' });
  // }

  // // SQL query to insert brand name and image path into the database
  // const query = `INSERT INTO brands(name, image) VALUES(?, ?)`;

  // pool.query(query, [brand, imagePath], (err, result) => {
  //   if (err) {
  //     console.error(err);
  //     return res.status(400).json({ message: "Something went wrong" });
  //   }
  //   return res.status(200).json({ message: "Insert successfully", data: result });
  // });
};

export const addNewCategory = (req, res) => {
  const { category } = req.body;

  const query = `INSERT INTO categories (name) VALUE(?)`;

  pool.query(query, category, (req, res) => {
    if (err) return res.status.json({ message: "something went wrong" });

    return res.status.json({ message: "Insert Successfully" });
  });
};

export const displayAllProduct = (req, res) => {

  const query = `SELECT 
                      p.phone_id,
                      p.name,
                      p.description,
                      p.price,
                      p.stock,
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
                  INNER JOIN categories c ON p.category_id = c.category_id;
                  `
  pool.query(query, (err, rows) => {
    if (err) return res.status(400).json({ message: "something went wrong" });
    res.status(200).json({
      data: rows,
      message: "sucessfully",
    });
  });

};

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

export const deleteProduct = (req, res) => {
  const { id } = req.body;
  const queryDeleteProdcut = "DELETE FROM phone WHERE phone_id=?";
  const queryDeleteSpec = "DELECT FROM specifications WHERE phone_id=?";

  pool.query(queryDeleteProdcut, id, (err, rows) => {
    if (err) return res.status(400).json({ message: "something went wrong" });
    res.status(200).json({ message: "sucessfully" });
    pool.query(queryDeleteSpec, id, (err, rows) => {
      if (err) return res.status(400).json({ message: "something went wrong" });
      res.status(200).json({ message: "sucessfully" });
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
    SELECT 'Inventory' AS label, COUNT(inventory_id) AS quantity
    FROM inventory;
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
                  WHERE c.category_name=?`

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
  const { items } = req.query;
  console.log(items);
  console.log("items");

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
                  WHERE p.name=?;`

  pool.query(query, items, (err, rows) => {
    if (err) return res.status(400).json({ message: `something went wrong ${items}` })
    console.log(rows);

    return res.status(200).json({
      data: rows,
      message: "sucessfully"
    })
  })
}